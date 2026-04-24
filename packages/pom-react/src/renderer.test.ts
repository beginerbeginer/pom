import { describe, it, expect } from "vitest";
import { renderToPOMNodes } from "./renderer.ts";
import { Fragment } from "./jsx-runtime.ts";
import type { POMElement } from "./types.ts";

// ============================================================
// キャラクタリゼーションテスト：renderToPOMNodes の現在の振る舞いを固定する
// ============================================================

const el = (
  tag: string,
  props: Record<string, unknown> = {},
  ...children: POMElement[]
): POMElement => ({ tag, props, children });

describe("renderToPOMNodes", () => {
  describe("単一ノード", () => {
    it("単一の Text ノードを変換できる", () => {
      const result = renderToPOMNodes(el("Text", { text: "Hello" }));
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        tag: "Text",
        props: { text: "Hello" },
        children: [],
      });
    });

    it("VStack の children を再帰的に変換する", () => {
      const input = el(
        "VStack",
        { gap: 16 },
        el("Text", { text: "A" }),
        el("Text", { text: "B" }),
      );
      const result = renderToPOMNodes(input);
      expect(result[0].children).toHaveLength(2);
      expect(result[0].children[0]).toEqual({
        tag: "Text",
        props: { text: "A" },
        children: [],
      });
    });
  });

  describe("Fragment の展開", () => {
    it("Fragment を展開して複数ルートノードを返す", () => {
      const input: POMElement = {
        tag: Fragment,
        props: {},
        children: [
          el("Text", { text: "Slide 1" }),
          el("Text", { text: "Slide 2" }),
        ],
      };
      const result = renderToPOMNodes(input);
      expect(result).toHaveLength(2);
      expect(result[0].tag).toBe("Text");
      expect(result[1].tag).toBe("Text");
    });

    it("Fragment は入れ子にもできる", () => {
      const inner: POMElement = {
        tag: Fragment,
        props: {},
        children: [el("Text", { text: "C" })],
      };
      const outer: POMElement = {
        tag: Fragment,
        props: {},
        children: [el("Text", { text: "A" }), el("Text", { text: "B" }), inner],
      };
      const result = renderToPOMNodes(outer);
      expect(result).toHaveLength(3);
    });
  });

  describe("タグ名バリデーション", () => {
    it("未知のタグ名は Error をスローする", () => {
      expect(() => renderToPOMNodes(el("UnknownTag", {}))).toThrow(
        /Unknown POM component/,
      );
    });

    it("エラーメッセージに有効なタグ一覧が含まれる", () => {
      expect(() => renderToPOMNodes(el("UnknownTag", {}))).toThrow(/VStack/);
    });

    it("すべての有効タグ名を受け入れる", () => {
      const validTags = [
        "Text", "Image", "Table", "Shape", "Chart",
        "Timeline", "Matrix", "Tree", "Flow", "ProcessArrow",
        "Pyramid", "Ul", "Ol", "Line", "VStack", "HStack",
        "Layer", "Icon", "Svg",
      ];
      for (const tag of validTags) {
        expect(() => renderToPOMNodes(el(tag, {}))).not.toThrow();
      }
    });
  });
});
