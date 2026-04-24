import { describe, it, expect } from "vitest";
import { serializeToXml } from "./serializer.ts";
import type { SerializableNode } from "./renderer.ts";

// ============================================================
// キャラクタリゼーションテスト：serializeToXml の現在の振る舞いを固定する
// ============================================================

describe("serializeToXml", () => {
  describe("属性のシリアライズ", () => {
    it("数値属性をそのまま文字列に変換する", () => {
      const nodes: SerializableNode[] = [
        { tag: "Text", props: { fontSize: 28, text: "Hello" }, children: [] },
      ];
      expect(serializeToXml(nodes)).toBe(`<Text fontSize="28" text="Hello" />`);
    });

    it("真偽値属性を true/false 文字列に変換する", () => {
      const nodes: SerializableNode[] = [
        { tag: "Text", props: { bold: true, text: "Hi" }, children: [] },
      ];
      expect(serializeToXml(nodes)).toBe(`<Text bold="true" text="Hi" />`);
    });

    it("オブジェクト属性を JSON エスケープして出力する", () => {
      const nodes: SerializableNode[] = [
        {
          tag: "VStack",
          props: { border: { color: "0E0D6A", width: 2 } },
          children: [],
        },
      ];
      const xml = serializeToXml(nodes);
      // JSON が属性値に埋め込まれていること
      expect(xml).toContain(`border=`);
      expect(xml).toContain(`0E0D6A`);
    });

    it("配列属性を JSON エスケープして出力する", () => {
      const nodes: SerializableNode[] = [
        {
          tag: "Chart",
          props: { chartColors: ["0E0D6A", "5C6BC0"] },
          children: [],
        },
      ];
      const xml = serializeToXml(nodes);
      expect(xml).toContain("chartColors=");
      expect(xml).toContain("0E0D6A");
    });

    it("undefined と null の属性は出力しない", () => {
      const nodes: SerializableNode[] = [
        {
          tag: "Text",
          props: { text: "Hi", color: undefined, fontSize: null as unknown as number },
          children: [],
        },
      ];
      const xml = serializeToXml(nodes);
      expect(xml).not.toContain("color=");
      expect(xml).not.toContain("fontSize=");
    });
  });

  describe("XML エスケープ", () => {
    it("文字列属性内の & を &amp; にエスケープする", () => {
      const nodes: SerializableNode[] = [
        { tag: "Text", props: { text: "A & B" }, children: [] },
      ];
      expect(serializeToXml(nodes)).toContain("A &amp; B");
    });

    it('文字列属性内の " を &quot; にエスケープする', () => {
      const nodes: SerializableNode[] = [
        { tag: "Text", props: { text: 'say "hello"' }, children: [] },
      ];
      expect(serializeToXml(nodes)).toContain("say &quot;hello&quot;");
    });

    it("文字列属性内の < を &lt; にエスケープする", () => {
      const nodes: SerializableNode[] = [
        { tag: "Text", props: { text: "x < y" }, children: [] },
      ];
      expect(serializeToXml(nodes)).toContain("x &lt; y");
    });
  });

  describe("子要素のシリアライズ", () => {
    it("子要素がある場合は開閉タグで囲む", () => {
      const nodes: SerializableNode[] = [
        {
          tag: "VStack",
          props: { gap: 16 },
          children: [{ tag: "Text", props: { text: "Hello" }, children: [] }],
        },
      ];
      const xml = serializeToXml(nodes);
      expect(xml).toContain("<VStack gap=\"16\">");
      expect(xml).toContain("<Text text=\"Hello\" />");
      expect(xml).toContain("</VStack>");
    });

    it("子要素がない場合は自己終了タグを出力する", () => {
      const nodes: SerializableNode[] = [
        { tag: "Text", props: { text: "Hi" }, children: [] },
      ];
      expect(serializeToXml(nodes)).toBe(`<Text text="Hi" />`);
    });

    it("複数のルートノードを改行で連結する", () => {
      const nodes: SerializableNode[] = [
        { tag: "Text", props: { text: "A" }, children: [] },
        { tag: "Text", props: { text: "B" }, children: [] },
      ];
      expect(serializeToXml(nodes)).toBe(
        `<Text text="A" />\n<Text text="B" />`,
      );
    });

    it("深くネストした子要素を再帰的にシリアライズする", () => {
      const nodes: SerializableNode[] = [
        {
          tag: "VStack",
          props: {},
          children: [
            {
              tag: "HStack",
              props: {},
              children: [
                { tag: "Text", props: { text: "Deep" }, children: [] },
              ],
            },
          ],
        },
      ];
      const xml = serializeToXml(nodes);
      expect(xml).toContain("<VStack>");
      expect(xml).toContain("<HStack>");
      expect(xml).toContain('<Text text="Deep" />');
      expect(xml).toContain("</HStack>");
      expect(xml).toContain("</VStack>");
    });
  });
});
