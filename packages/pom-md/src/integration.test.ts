import { describe, expect, it } from "vitest";
import { parseMd } from "./parseMd.ts";
import { parseXml, TAG_TO_TYPE } from "../../../src/parseXml/parseXml.ts";

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
      expect(result).toContain("<Table>");
      expect(result).toContain("<TableRow>");
      expect(result).toContain("<TableCell>Header1</TableCell>");
      expect(result).toContain("<TableCell>Header2</TableCell>");
      expect(result).toContain("</Table>");
      // parseXml でもパースできること
      expect(() => parseXml(result)).not.toThrow();
    });

    it("1セルだけのテーブル", () => {
      const md = `| A |
| --- |
| B |`;
      const result = parseMd(md);
      expect(result).toContain("<Table>");
      expect(result).toContain("<TableCell>A</TableCell>");
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

// ===== 3. タグ名整合性チェック =====
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
