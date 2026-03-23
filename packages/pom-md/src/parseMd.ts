import MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";

// ===== スライドサイズプリセット =====
const SIZE_PRESETS: Record<string, { w: number; h: number }> = {
  "16:9": { w: 1280, h: 720 },
  "4:3": { w: 1024, h: 768 },
};

const DEFAULT_SIZE = SIZE_PRESETS["16:9"];

// ===== 見出しフォントサイズ =====
const HEADING_FONT_SIZE: Record<number, number> = {
  1: 28,
  2: 24,
  3: 20,
  4: 18,
  5: 16,
  6: 14,
};

interface Frontmatter {
  size?: { w: number; h: number };
}

/**
 * frontmatter を抽出する。
 * `---` で囲まれた YAML-like ブロックから `size` を読み取る。
 */
function parseFrontmatter(markdown: string): {
  frontmatter: Frontmatter;
  body: string;
} {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: markdown };
  }

  const yamlBlock = match[1];
  const body = match[2];
  const frontmatter: Frontmatter = {};

  for (const line of yamlBlock.split("\n")) {
    const kv = line.match(/^\s*(\w+)\s*:\s*(.+)\s*$/);
    if (!kv) continue;
    const [, key, value] = kv;

    if (key === "size") {
      const trimmed = value.trim();
      if (trimmed in SIZE_PRESETS) {
        frontmatter.size = SIZE_PRESETS[trimmed];
      }
    }
  }

  return { frontmatter, body };
}

/** XML 特殊文字をエスケープする */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * markdown-it の inline トークン列からテキストコンテンツを抽出する。
 * bold / italic のインラインマークアップは現時点では無視し、プレーンテキストとして結合する。
 */
function extractInlineText(tokens: Token[]): string {
  let text = "";
  for (const t of tokens) {
    if (t.type === "text" || t.type === "code_inline") {
      text += t.content;
    } else if (t.type === "softbreak" || t.type === "hardbreak") {
      text += " ";
    }
  }
  return text;
}

/** markdown-it トークン列から1つのスライド分の pom XML フラグメントを生成する */
function tokensToXml(tokens: Token[]): string {
  const parts: string[] = [];
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];

    // --- 見出し ---
    if (token.type === "heading_open") {
      const level = parseInt(token.tag.slice(1), 10);
      const fontSize = HEADING_FONT_SIZE[level] ?? 14;
      const inlineToken = tokens[i + 1]; // inline
      const text = inlineToken?.children
        ? extractInlineText(inlineToken.children)
        : (inlineToken?.content ?? "");
      parts.push(
        `<Text fontSize="${fontSize}" bold="true">${escapeXml(text)}</Text>`,
      );
      i += 3; // heading_open, inline, heading_close
      continue;
    }

    // --- 段落 ---
    if (token.type === "paragraph_open") {
      const inlineToken = tokens[i + 1];

      // 段落内に画像のみの場合は Image ノードとして出力
      if (
        inlineToken?.children &&
        inlineToken.children.length === 1 &&
        inlineToken.children[0].type === "image"
      ) {
        const imgToken = inlineToken.children[0];
        const src = imgToken.attrGet("src") ?? "";
        parts.push(`<Image src="${escapeXml(src)}" />`);
        i += 3; // paragraph_open, inline, paragraph_close
        continue;
      }

      const text = inlineToken?.children
        ? extractInlineText(inlineToken.children)
        : (inlineToken?.content ?? "");
      if (text.trim()) {
        parts.push(`<Text>${escapeXml(text)}</Text>`);
      }
      i += 3; // paragraph_open, inline, paragraph_close
      continue;
    }

    // --- 箇条書きリスト ---
    if (
      token.type === "bullet_list_open" ||
      token.type === "ordered_list_open"
    ) {
      const tag = token.type === "bullet_list_open" ? "Ul" : "Ol";
      const items = collectListItems(tokens, i + 1);
      const liXml = items.texts.map((t) => `<Li>${escapeXml(t)}</Li>`).join("");
      parts.push(`<${tag}>${liXml}</${tag}>`);
      i = items.endIndex + 1;
      continue;
    }

    // --- テーブル ---
    if (token.type === "table_open") {
      const tableResult = collectTable(tokens, i + 1);
      parts.push(tableResult.xml);
      i = tableResult.endIndex + 1;
      continue;
    }

    // --- pomxml コードフェンス ---
    if (token.type === "fence" && token.info.trim() === "pomxml") {
      parts.push(token.content.trim());
      i++;
      continue;
    }

    // --- その他のコードフェンス（無視） ---
    if (token.type === "fence") {
      i++;
      continue;
    }

    // --- hr（スライド区切り以外の用途では無視） ---
    if (token.type === "hr") {
      i++;
      continue;
    }

    i++;
  }

  return parts.join("\n");
}

/** リストアイテムのテキストを収集する */
function collectListItems(
  tokens: Token[],
  startIndex: number,
): { texts: string[]; endIndex: number } {
  const texts: string[] = [];
  let i = startIndex;

  while (i < tokens.length) {
    const token = tokens[i];
    if (
      token.type === "bullet_list_close" ||
      token.type === "ordered_list_close"
    ) {
      return { texts, endIndex: i };
    }

    if (token.type === "list_item_open") {
      // list_item_open → paragraph_open → inline → paragraph_close → list_item_close
      const inlineToken = tokens[i + 2]; // inline
      const text = inlineToken?.children
        ? extractInlineText(inlineToken.children)
        : (inlineToken?.content ?? "");
      texts.push(text);
    }

    i++;
  }

  return { texts, endIndex: i - 1 };
}

/** テーブルトークンから pom Table XML を構築する */
function collectTable(
  tokens: Token[],
  startIndex: number,
): { xml: string; endIndex: number } {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let i = startIndex;

  while (i < tokens.length) {
    const token = tokens[i];

    if (token.type === "table_close") {
      const headerRow = rows[0] ?? [];
      const dataRows = rows.slice(1);

      let xml = "<Table>";

      // ヘッダー行
      if (headerRow.length > 0) {
        xml += "<Tr>";
        for (const cell of headerRow) {
          xml += `<Th>${escapeXml(cell)}</Th>`;
        }
        xml += "</Tr>";
      }

      // データ行
      for (const row of dataRows) {
        xml += "<Tr>";
        for (const cell of row) {
          xml += `<Td>${escapeXml(cell)}</Td>`;
        }
        xml += "</Tr>";
      }

      xml += "</Table>";

      return { xml, endIndex: i };
    }

    if (token.type === "tr_open") {
      currentRow = [];
    } else if (token.type === "tr_close") {
      rows.push(currentRow);
    } else if (token.type === "th_open" || token.type === "td_open") {
      const inlineToken = tokens[i + 1];
      const text = inlineToken?.children
        ? extractInlineText(inlineToken.children)
        : (inlineToken?.content ?? "");
      currentRow.push(text);
    }

    i++;
  }

  return { xml: "<Table></Table>", endIndex: i - 1 };
}

/**
 * Markdown 文字列を pom XML 文字列に変換する。
 *
 * - frontmatter (`---` ブロック) でスライドサイズを指定可能
 * - `---` (水平線) でスライドを区切る
 * - `` ```pomxml `` コードフェンスは XML としてそのまま出力
 *
 * @example
 * ```ts
 * import { parseMd } from "@hirokisakabe/pom-md";
 * import { buildPptx } from "@hirokisakabe/pom";
 *
 * const xml = parseMd(`
 * ---
 * size: 16:9
 * ---
 *
 * # タイトル
 *
 * - 項目1
 * - 項目2
 *
 * ---
 *
 * ## 詳細
 *
 * \`\`\`pomxml
 * <Chart type="bar" labels="Q1,Q2" values="100,200" />
 * \`\`\`
 * `);
 *
 * const { pptx } = await buildPptx(xml, { w: 1280, h: 720 });
 * ```
 */
export function parseMd(markdown: string): string {
  // CRLF を LF に正規化
  const normalized = markdown.replace(/\r\n?/g, "\n").trim();

  const { frontmatter, body } = parseFrontmatter(normalized);
  const size = frontmatter.size ?? DEFAULT_SIZE;

  const md = new MarkdownIt({ html: false });
  const allTokens = md.parse(body, {});

  // トークンベースでスライド分割（hr トークンで区切る）
  // コードフェンス内の `---` は markdown-it が hr として扱わないため安全
  const slideTokenGroups = splitTokensByHr(allTokens);

  const xmlSlides: string[] = [];

  for (const tokens of slideTokenGroups) {
    const content = tokensToXml(tokens);
    if (!content.trim()) continue;

    xmlSlides.push(
      `<VStack w="${size.w}" h="${size.h}" padding="48" gap="16">\n${content}\n</VStack>`,
    );
  }

  return xmlSlides.join("\n");
}

/** トークン列を hr トークンで分割する */
function splitTokensByHr(tokens: Token[]): Token[][] {
  const groups: Token[][] = [];
  let current: Token[] = [];

  for (const token of tokens) {
    if (token.type === "hr") {
      groups.push(current);
      current = [];
    } else {
      current.push(token);
    }
  }

  groups.push(current);
  return groups;
}
