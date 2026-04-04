// @vitest-environment node
import { ParseXmlError } from "@hirokisakabe/pom";
import { describe, expect, it } from "vitest";

import { classifyError } from "./classifyError";

describe("classifyError", () => {
  const sampleXml = `<VStack>
  <Text fontSize="12">hello</Text>
  <BadTag />
</VStack>`;

  describe("ParseXmlError の分類", () => {
    it("数値変換エラーを schema に分類する", () => {
      const error = new ParseXmlError([
        '<Text>: Cannot convert "abc" to number for attribute "fontSize"',
      ]);
      const result = classifyError(error, sampleXml);
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe("schema");
      expect(result[0].tagName).toBe("Text");
      expect(result[0].line).toBe(2);
    });

    it("boolean 変換エラーを schema に分類する", () => {
      const error = new ParseXmlError([
        '<Text>: Cannot convert "yes" to boolean',
      ]);
      const result = classifyError(error, sampleXml);
      expect(result[0].type).toBe("schema");
    });

    it("不正な JSON 属性を schema に分類する", () => {
      const error = new ParseXmlError([
        '<Text>: Value "{invalid}" is not valid JSON',
      ]);
      const result = classifyError(error, sampleXml);
      expect(result[0].type).toBe("schema");
    });

    it("Unknown attribute を schema に分類する", () => {
      const error = new ParseXmlError(["<Text>: Unknown attribute: foo"]);
      const result = classifyError(error, sampleXml);
      expect(result[0].type).toBe("schema");
    });

    it("Missing required attribute を schema に分類する", () => {
      const error = new ParseXmlError([
        "<Image>: Missing required attribute: src",
      ]);
      const result = classifyError(error, "<Image />");
      expect(result[0].type).toBe("schema");
    });

    it("must have exactly を structure に分類する", () => {
      const error = new ParseXmlError(["<Table> must have exactly one <Tr>"]);
      const result = classifyError(error, "<Table />");
      expect(result[0].type).toBe("structure");
    });

    it("Unexpected child elements を structure に分類する", () => {
      const error = new ParseXmlError(["<Text>: Unexpected child elements"]);
      const result = classifyError(error, sampleXml);
      expect(result[0].type).toBe("structure");
    });

    it("Unknown child element を structure に分類する", () => {
      const error = new ParseXmlError([
        "Unknown child element <Foo> inside <VStack>",
      ]);
      const result = classifyError(error, sampleXml);
      expect(result[0].type).toBe("structure");
      expect(result[0].tagName).toBe("Foo");
    });

    it("Unknown tag を structure に分類する", () => {
      const error = new ParseXmlError(["Unknown tag: <BadTag>"]);
      const result = classifyError(error, sampleXml);
      expect(result[0].type).toBe("structure");
      expect(result[0].tagName).toBe("BadTag");
      expect(result[0].line).toBe(3);
    });

    it("どのパターンにも一致しないエラーを unknown に分類する", () => {
      const error = new ParseXmlError(["Something unexpected happened"]);
      const result = classifyError(error, sampleXml);
      expect(result[0].type).toBe("unknown");
    });

    it("複数エラーを含む ParseXmlError を個別に分類する", () => {
      const error = new ParseXmlError([
        '<Text>: Cannot convert "abc" to number',
        "Unknown tag: <BadTag>",
        "Something unexpected",
      ]);
      const result = classifyError(error, sampleXml);
      expect(result).toHaveLength(3);
      expect(result[0].type).toBe("schema");
      expect(result[1].type).toBe("structure");
      expect(result[2].type).toBe("unknown");
    });
  });

  describe("一般的な Error の分類", () => {
    it("'is not closed' を xml_syntax に分類する", () => {
      const xml = "<VStack><Text>hello</VStack>";
      const error = new Error("Tag 'Text' is not closed");
      const result = classifyError(error, xml);
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe("xml_syntax");
    });

    it("'invalid xml' を xml_syntax に分類する", () => {
      const error = new Error("Invalid XML document");
      const result = classifyError(error, "<>");
      expect(result[0].type).toBe("xml_syntax");
    });

    it("'unexpected closing' を xml_syntax に分類する", () => {
      const error = new Error("Unexpected closing tag");
      const result = classifyError(error, "</VStack>");
      expect(result[0].type).toBe("xml_syntax");
    });

    it("xml_syntax の場合、XMLValidator で行・列番号を取得する", () => {
      const xml = "<VStack>\n  <Text>unclosed\n</VStack>";
      const error = new Error("Tag 'Text' is not closed");
      const result = classifyError(error, xml);
      expect(result[0].type).toBe("xml_syntax");
      expect(result[0].line).toBeDefined();
    });

    it("パターンに一致しないエラーを unknown に分類する", () => {
      const error = new Error("Network error");
      const result = classifyError(error, sampleXml);
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe("unknown");
      expect(result[0].message).toBe("Network error");
    });
  });

  describe("非 Error オブジェクト", () => {
    it("string を渡すと unknown メッセージを返す", () => {
      const result = classifyError("some string", sampleXml);
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe("unknown");
      expect(result[0].message).toBe("An unknown error occurred");
    });

    it("null を渡すと unknown メッセージを返す", () => {
      const result = classifyError(null, sampleXml);
      expect(result[0].type).toBe("unknown");
    });
  });

  describe("タグ名抽出と行番号特定", () => {
    it("<TagName>: ... パターンからタグ名を抽出する", () => {
      const error = new ParseXmlError([
        '<Text>: Cannot convert "abc" to number',
      ]);
      const result = classifyError(error, sampleXml);
      expect(result[0].tagName).toBe("Text");
    });

    it("Unknown tag: <TagName> パターンからタグ名を抽出する", () => {
      const error = new ParseXmlError(["Unknown tag: <BadTag>"]);
      const result = classifyError(error, sampleXml);
      expect(result[0].tagName).toBe("BadTag");
    });

    it("Unknown child element <TagName> パターンからタグ名を抽出する", () => {
      const error = new ParseXmlError([
        "Unknown child element <Foo> inside <VStack>",
      ]);
      const result = classifyError(error, "<VStack><Foo /></VStack>");
      expect(result[0].tagName).toBe("Foo");
    });

    it("XML 内のタグの行番号を正しく特定する", () => {
      const xml = `<VStack>
  <HStack>
    <Text>hello</Text>
  </HStack>
</VStack>`;
      const error = new ParseXmlError(["<HStack>: some error"]);
      const result = classifyError(error, xml);
      expect(result[0].line).toBe(2);
    });

    it("タグが見つからない場合 line は undefined になる", () => {
      const error = new ParseXmlError(["<NonExistent>: some error"]);
      const result = classifyError(error, sampleXml);
      expect(result[0].tagName).toBe("NonExistent");
      expect(result[0].line).toBeUndefined();
    });
  });
});
