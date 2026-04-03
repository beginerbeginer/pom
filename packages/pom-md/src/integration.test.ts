import { describe, expect, it } from "vitest";
import { parseMd } from "./parseMd.ts";
import { parseXml, TAG_TO_TYPE } from "../../pom/src/parseXml/parseXml.ts";

// ===== 1. pom core との統合テスト =====
describe("pom core 統合テスト", () => {
  /** parseMd の出力を parseXml に通してエラーなくパースできることを検証する */
  function assertParsable(md: string): void {
    const xml = parseMd(md);
    if (!xml.trim()) return; // 空出力は検証不要
    expect(() => parseXml(xml)).not.toThrow();
  }

  it("見出し・段落", () => {
    assertParsable(`# タイトル

これは段落です。

## サブタイトル

別の段落。`);
  });

  it("リスト (Ul)", () => {
    assertParsable(`- 項目1
- 項目2
- 項目3`);
  });

  it("リスト (Ol)", () => {
    assertParsable(`1. 最初
2. 次
3. 最後`);
  });

  it("テーブル", () => {
    assertParsable(`| 名前 | 値 |
| --- | --- |
| A | 100 |
| B | 200 |`);
  });

  it("pomxml コードフェンス", () => {
    assertParsable(`# タイトル

\`\`\`pomxml
<Text>pomxml テスト</Text>
\`\`\``);
  });

  it("複合ドキュメント（複数スライド、混在要素）", () => {
    assertParsable(`---
size: 16:9
---

# 売上報告

- Q1は好調
- Q2に課題あり

| 指標 | 値 |
| --- | --- |
| 売上 | 100 |
| 利益 | 50 |

---

## 詳細データ

\`\`\`pomxml
<Text>詳細チャート</Text>
\`\`\`

---

## プロセス

1. 企画
2. 開発
3. リリース`);
  });

  it("画像", () => {
    assertParsable("![alt text](image.png)");
  });

  it("h4-h6 の見出し", () => {
    assertParsable(`#### h4 見出し

##### h5 見出し

###### h6 見出し`);
  });
});

// ===== 2. エッジケーステスト =====
describe("エッジケーステスト", () => {
  describe("テーブル", () => {
    it("空テーブル（ヘッダーのみ、データ行なし）", () => {
      const md = `| Header1 | Header2 |
| --- | --- |`;
      const result = parseMd(md);
      expect(result).toContain(`<Table cellBorder='{"color":"CBD5E1"}'>`);
      expect(result).toContain("<TableRow>");
      expect(result).toContain(
        '<TableCell bold="true" backgroundColor="F1F5F9">Header1</TableCell>',
      );
      expect(result).toContain(
        '<TableCell bold="true" backgroundColor="F1F5F9">Header2</TableCell>',
      );
      expect(result).toContain("</Table>");
      // parseXml でもパースできること
      expect(() => parseXml(result)).not.toThrow();
    });

    it("1セルだけのテーブル", () => {
      const md = `| A |
| --- |
| B |`;
      const result = parseMd(md);
      expect(result).toContain(`<Table cellBorder='{"color":"CBD5E1"}'>`);
      expect(result).toContain(
        '<TableCell bold="true" backgroundColor="F1F5F9">A</TableCell>',
      );
      expect(result).toContain("<TableCell>B</TableCell>");
      expect(() => parseXml(result)).not.toThrow();
    });

    it('テーブルセル内の特殊文字（<, &, "）', () => {
      const md = `| Key | Value |
| --- | --- |
| a<b | c&d |
| e"f | g>h |`;
      const result = parseMd(md);
      expect(result).toContain("&lt;");
      expect(result).toContain("&amp;");
      expect(result).toContain("&quot;");
      expect(result).toContain("&gt;");
      expect(() => parseXml(result)).not.toThrow();
    });
  });

  describe("リスト", () => {
    it("ネストリスト", () => {
      const md = `- 親項目1
  - 子項目1
  - 子項目2
- 親項目2`;
      const result = parseMd(md);
      expect(result).toContain("<Ul>");
      // ネストリストが何らかの形で出力されること（エラーにならないこと）
      expect(() => parseXml(result)).not.toThrow();
    });
  });

  describe("画像", () => {
    it("画像の alt テキストに特殊文字", () => {
      const result = parseMd("![a<b](img.png)");
      expect(result).toContain("img.png");
      expect(() => parseXml(result)).not.toThrow();
    });
  });

  describe("pomxml コードフェンス", () => {
    it("連続する pomxml コードフェンス", () => {
      const md = `# タイトル

\`\`\`pomxml
<Text>ブロックA</Text>
\`\`\`

\`\`\`pomxml
<Text>ブロックB</Text>
\`\`\``;
      const result = parseMd(md);
      expect(result).toContain("ブロックA");
      expect(result).toContain("ブロックB");
      expect(() => parseXml(result)).not.toThrow();
    });
  });

  describe("frontmatter", () => {
    it("未知の size 値（A4 など）はデフォルト 16:9 にフォールバック", () => {
      const md = `---
size: A4
---

# タイトル`;
      const result = parseMd(md);
      expect(result).toContain('w="1280"');
      expect(result).toContain('h="720"');
    });
  });

  describe("スライド", () => {
    it("全スライドが空になるケース（---\\n---\\n---）", () => {
      const md = `---

---

---`;
      const result = parseMd(md);
      // 空スライドはフィルタリングされて空文字列になる
      expect(result).toBe("");
    });
  });

  describe("見出し", () => {
    it("h4 を fontSize=18 bold の Text に変換する", () => {
      const result = parseMd("#### h4見出し");
      expect(result).toContain('fontSize="18"');
      expect(result).toContain('bold="true"');
      expect(result).toContain("h4見出し");
    });

    it("h5 を fontSize=16 bold の Text に変換する", () => {
      const result = parseMd("##### h5見出し");
      expect(result).toContain('fontSize="16"');
      expect(result).toContain("h5見出し");
    });

    it("h6 を fontSize=14 bold の Text に変換する", () => {
      const result = parseMd("###### h6見出し");
      expect(result).toContain('fontSize="14"');
      expect(result).toContain("h6見出し");
    });
  });
});

// ===== 3. インラインフォーマット統合テスト =====
describe("インラインフォーマット統合テスト", () => {
  function assertParsable(md: string): void {
    const xml = parseMd(md);
    if (!xml.trim()) return;
    expect(() => parseXml(xml)).not.toThrow();
  }

  it("太字を含む段落が parseXml でパースできる", () => {
    assertParsable("通常テキスト **太字** テキスト");
  });

  it("斜体を含む段落が parseXml でパースできる", () => {
    assertParsable("通常テキスト *斜体* テキスト");
  });

  it("太字斜体（ネスト）が parseXml でパースできる", () => {
    assertParsable("***太字斜体***");
  });

  it("太字を含むリストが parseXml でパースできる", () => {
    assertParsable("- 通常 **太字** 項目\n- *斜体* 項目");
  });

  it("太字を含むテーブルが parseXml でパースできる", () => {
    assertParsable(`| 名前 | 値 |
| --- | --- |
| **重要** | *注記* |`);
  });

  it("太字を含む見出しが parseXml でパースできる", () => {
    assertParsable("# 見出し **強調**");
  });

  it("太字を含む段落が runs を持つ", () => {
    const xml = parseMd("通常 **太字** テキスト");
    const nodes = parseXml(xml);
    // VStack → children → Text
    const vstack = nodes[0] as Record<string, unknown>;
    const children = vstack.children as Record<string, unknown>[];
    const textNode = children[0];
    expect(textNode.type).toBe("text");
    expect(textNode.runs).toBeDefined();
    const runs = textNode.runs as {
      text: string;
      bold?: boolean;
      italic?: boolean;
    }[];
    expect(runs).toHaveLength(3);
    expect(runs[0]).toEqual({ text: "通常 " });
    expect(runs[1]).toEqual({ text: "太字", bold: true });
    expect(runs[2]).toEqual({ text: " テキスト" });
  });

  it("斜体を含む段落が runs を持つ", () => {
    const xml = parseMd("通常 *斜体* テキスト");
    const nodes = parseXml(xml);
    const vstack = nodes[0] as Record<string, unknown>;
    const children = vstack.children as Record<string, unknown>[];
    const textNode = children[0];
    const runs = textNode.runs as {
      text: string;
      bold?: boolean;
      italic?: boolean;
    }[];
    expect(runs).toHaveLength(3);
    expect(runs[0]).toEqual({ text: "通常 " });
    expect(runs[1]).toEqual({ text: "斜体", italic: true });
    expect(runs[2]).toEqual({ text: " テキスト" });
  });

  it("書式なしテキストは runs を持たない", () => {
    const xml = parseMd("プレーンテキスト");
    const nodes = parseXml(xml);
    const vstack = nodes[0] as Record<string, unknown>;
    const children = vstack.children as Record<string, unknown>[];
    const textNode = children[0];
    expect(textNode.runs).toBeUndefined();
    expect(textNode.text).toBe("プレーンテキスト");
  });
});

// ===== 4. タグ名整合性チェック =====
describe("タグ名整合性チェック", () => {
  /**
   * pom-md が生成しうるタグ名一覧。
   * parseMd が出力する XML で使われるタグ名を列挙する。
   */
  const POM_MD_TAGS = [
    "VStack", // スライドラッパー
    "Text", // 見出し・段落
    "Ul", // 箇条書きリスト
    "Ol", // 番号付きリスト
    "Image", // 画像
    "Table", // テーブル
  ];

  it("pom-md が生成するタグ名はすべて pom core の TAG_TO_TYPE に存在する", () => {
    const coreTagNames = Object.keys(TAG_TO_TYPE);
    for (const tag of POM_MD_TAGS) {
      expect(
        coreTagNames,
        `pom-md が生成するタグ "${tag}" が pom core の TAG_TO_TYPE に存在しません`,
      ).toContain(tag);
    }
  });

  it("pom-md のテーブル子要素タグ名が pom core で認識される", () => {
    // テーブル子要素は TAG_TO_TYPE ではなく parseXml 内部で処理されるが、
    // 実際に parseXml に通してエラーにならないことで検証する
    const md = `| A | B |
| --- | --- |
| 1 | 2 |`;
    const xml = parseMd(md);
    expect(() => parseXml(xml)).not.toThrow();
  });
});
