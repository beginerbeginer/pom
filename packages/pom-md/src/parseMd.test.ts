import { describe, expect, it } from "vitest";
import { parseMd } from "./parseMd.ts";

describe("parseMd", () => {
  describe("見出し", () => {
    it("h1 を fontSize=28 bold の Text に変換する", () => {
      const result = parseMd("# タイトル");
      expect(result).toContain('fontSize="28"');
      expect(result).toContain('bold="true"');
      expect(result).toContain("タイトル");
    });

    it("h2 を fontSize=24 bold の Text に変換する", () => {
      const result = parseMd("## サブタイトル");
      expect(result).toContain('fontSize="24"');
      expect(result).toContain("サブタイトル");
    });

    it("h3 を fontSize=20 bold の Text に変換する", () => {
      const result = parseMd("### 小見出し");
      expect(result).toContain('fontSize="20"');
      expect(result).toContain("小見出し");
    });
  });

  describe("段落", () => {
    it("段落テキストを Text ノードに変換する", () => {
      const result = parseMd("これは段落です。");
      expect(result).toContain("<Text>これは段落です。</Text>");
    });

    it("空入力は空文字列を返す", () => {
      const result = parseMd("");
      expect(result).toBe("");
    });
  });

  describe("リスト", () => {
    it("箇条書きリストを Ul/Li に変換する", () => {
      const result = parseMd("- 項目1\n- 項目2\n- 項目3");
      expect(result).toContain("<Ul>");
      expect(result).toContain("<Li>項目1</Li>");
      expect(result).toContain("<Li>項目2</Li>");
      expect(result).toContain("<Li>項目3</Li>");
      expect(result).toContain("</Ul>");
    });

    it("番号付きリストを Ol/Li に変換する", () => {
      const result = parseMd("1. 最初\n2. 次\n3. 最後");
      expect(result).toContain("<Ol>");
      expect(result).toContain("<Li>最初</Li>");
      expect(result).toContain("<Li>次</Li>");
      expect(result).toContain("<Li>最後</Li>");
      expect(result).toContain("</Ol>");
    });
  });

  describe("画像", () => {
    it("画像を Image ノードに変換する", () => {
      const result = parseMd("![alt text](image.png)");
      expect(result).toContain('<Image src="image.png" />');
    });

    it("画像 src の特殊文字をエスケープする", () => {
      const result = parseMd("![](path/to/image.png?v=1&w=100)");
      expect(result).toContain("src=");
      expect(result).toContain("&amp;");
    });
  });

  describe("テーブル", () => {
    it("Markdown テーブルを Table ノードに変換する", () => {
      const md = `| 名前 | 値 |
| --- | --- |
| A | 100 |
| B | 200 |`;
      const result = parseMd(md);
      expect(result).toContain("<Table>");
      expect(result).toContain("<Th>名前</Th>");
      expect(result).toContain("<Th>値</Th>");
      expect(result).toContain("<Td>A</Td>");
      expect(result).toContain("<Td>100</Td>");
      expect(result).toContain("<Td>B</Td>");
      expect(result).toContain("<Td>200</Td>");
      expect(result).toContain("</Table>");
    });
  });

  describe("pomxml コードフェンス", () => {
    it("pomxml コードフェンスをそのまま XML として出力する", () => {
      const md = `# タイトル

\`\`\`pomxml
<Chart type="bar" labels="Q1,Q2" values="100,200" />
\`\`\``;
      const result = parseMd(md);
      expect(result).toContain(
        '<Chart type="bar" labels="Q1,Q2" values="100,200" />',
      );
    });

    it("pomxml 以外のコードフェンスは無視する", () => {
      const md = "```javascript\nconsole.log('hello');\n```";
      const result = parseMd(md);
      expect(result).not.toContain("console.log");
    });
  });

  describe("スライド分割", () => {
    it("--- でスライドを分割する", () => {
      const md = `# スライド1

---

# スライド2`;
      const result = parseMd(md);
      const vstackCount = (result.match(/<VStack/g) ?? []).length;
      expect(vstackCount).toBe(2);
      expect(result).toContain("スライド1");
      expect(result).toContain("スライド2");
    });

    it("空のスライドは無視する", () => {
      const md = `# スライド1

---

---

# スライド2`;
      const result = parseMd(md);
      const vstackCount = (result.match(/<VStack/g) ?? []).length;
      expect(vstackCount).toBe(2);
    });
  });

  describe("frontmatter", () => {
    it("size: 16:9 でデフォルトサイズを使用する", () => {
      const md = `---
size: 16:9
---

# タイトル`;
      const result = parseMd(md);
      expect(result).toContain('w="1280"');
      expect(result).toContain('h="720"');
    });

    it("size: 4:3 でサイズを変更する", () => {
      const md = `---
size: 4:3
---

# タイトル`;
      const result = parseMd(md);
      expect(result).toContain('w="1024"');
      expect(result).toContain('h="768"');
    });

    it("frontmatter なしの場合はデフォルト 16:9 を使う", () => {
      const result = parseMd("# タイトル");
      expect(result).toContain('w="1280"');
      expect(result).toContain('h="720"');
    });
  });

  describe("スライドラッパー", () => {
    it("各スライドを VStack で囲む", () => {
      const result = parseMd("# タイトル");
      expect(result).toContain("<VStack");
      expect(result).toContain('padding="48"');
      expect(result).toContain('gap="16"');
      expect(result).toContain("</VStack>");
    });
  });

  describe("CRLF 対応", () => {
    it("CRLF 改行の frontmatter を正しくパースする", () => {
      const md = "---\r\nsize: 4:3\r\n---\r\n\r\n# タイトル";
      const result = parseMd(md);
      expect(result).toContain('w="1024"');
      expect(result).toContain('h="768"');
      expect(result).toContain("タイトル");
    });

    it("CRLF 改行のスライド分割が正しく動作する", () => {
      const md = "# スライド1\r\n\r\n---\r\n\r\n# スライド2";
      const result = parseMd(md);
      const vstackCount = (result.match(/<VStack/g) ?? []).length;
      expect(vstackCount).toBe(2);
    });
  });

  describe("コードフェンス内の ---", () => {
    it("コードフェンス内の --- でスライドを分割しない", () => {
      const md = `# タイトル

\`\`\`text
---
some content
---
\`\`\`

次の段落`;
      const result = parseMd(md);
      const vstackCount = (result.match(/<VStack/g) ?? []).length;
      expect(vstackCount).toBe(1);
      expect(result).toContain("タイトル");
      expect(result).toContain("次の段落");
    });
  });

  describe("XML エスケープ", () => {
    it("特殊文字をエスケープする", () => {
      const result = parseMd("A < B & C > D");
      expect(result).toContain("A &lt; B &amp; C &gt; D");
    });
  });

  describe("複合テスト", () => {
    it("issue #435 のサンプルを変換できる", () => {
      const md = `---
size: 16:9
---

# 売上報告

- Q1は好調
- Q2に課題あり

---

## 詳細データ

\`\`\`pomxml
<Chart type="bar" labels="Q1,Q2,Q3,Q4" values="100,80,120,150" />
\`\`\`

---

## プロセス

\`\`\`pomxml
<Flow>
  <Step>企画</Step>
  <Step>開発</Step>
  <Step>リリース</Step>
</Flow>
\`\`\``;
      const result = parseMd(md);

      // 3 スライド
      const vstackCount = (result.match(/<VStack/g) ?? []).length;
      expect(vstackCount).toBe(3);

      // スライド 1
      expect(result).toContain("売上報告");
      expect(result).toContain("<Ul>");
      expect(result).toContain("<Li>Q1は好調</Li>");

      // スライド 2
      expect(result).toContain("詳細データ");
      expect(result).toContain('<Chart type="bar"');

      // スライド 3
      expect(result).toContain("プロセス");
      expect(result).toContain("<Flow>");
    });
  });
});
