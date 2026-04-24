import { describe, it, expect } from "vitest";
import { jsx, jsxs, Fragment } from "./jsx-runtime.ts";
import { Text, Shape, VStack } from "./components/elements.ts";

// ============================================================
// キャラクタリゼーションテスト：jsx-runtime の現在の振る舞いを固定する
// ============================================================

describe("jsx-runtime", () => {
  describe("文字列タグ（intrinsic elements）", () => {
    it("タグ名・props・children を持つ POMElement を返す", () => {
      const result = jsx("VStack", { gap: 16 });
      expect(result).toEqual({ tag: "VStack", props: { gap: 16 }, children: [] });
    });

    it("children を正規化して配列として格納する", () => {
      const child = jsx("Text", { text: "Hi" });
      const result = jsxs("VStack", { gap: 16, children: [child] });
      expect(result.children).toHaveLength(1);
      expect(result.children[0].tag).toBe("Text");
    });

    it("null / undefined / false の children を無視する", () => {
      const result = jsxs("VStack", {
        children: [null, undefined, false, jsx("Text", { text: "Hi" })],
      });
      expect(result.children).toHaveLength(1);
    });
  });

  describe("Text / Shape の文字列 children 昇格", () => {
    it("Text コンポーネントへの文字列 children を text prop に昇格する", () => {
      const result = jsx(Text, { fontSize: 28, children: "Hello World" });
      expect(result.props.text).toBe("Hello World");
      expect(result.children).toHaveLength(0);
    });

    it("Shape コンポーネントへの文字列 children を text prop に昇格する", () => {
      const result = jsx(Shape, { shapeType: "ellipse", children: "01" });
      expect(result.props.text).toBe("01");
    });

    it("文字列配列も結合して text prop に昇格する", () => {
      const result = jsxs(Text, { children: ["Hello", " ", "World"] });
      expect(result.props.text).toBe("Hello World");
    });

    it("VStack は文字列 children を無視して昇格しない", () => {
      // VStack は TEXT_CONTENT_TAGS に含まれないので text prop に昇格しない
      const result = jsx(VStack, { gap: 16, children: [] });
      expect(result.props).not.toHaveProperty("text");
    });
  });

  describe("関数コンポーネント", () => {
    it("関数コンポーネントを呼び出してその結果を返す", () => {
      function MyComp({ label }: { label: string }) {
        return jsx("Text", { text: label });
      }
      const result = jsx(MyComp, { label: "テスト" });
      expect(result.tag).toBe("Text");
      expect(result.props.text).toBe("テスト");
    });

    it("関数コンポーネントに children が渡される", () => {
      function Wrapper({ children }: { children: unknown }) {
        return jsx("VStack", { children });
      }
      const child = jsx("Text", { text: "child" });
      const result = jsx(Wrapper, { children: child });
      expect(result.tag).toBe("VStack");
      expect(result.children).toHaveLength(1);
    });
  });

  describe("Fragment", () => {
    it("Fragment タグが 'Fragment' という文字列定数であること", () => {
      expect(Fragment).toBe("Fragment");
    });

    it("Fragment で複数要素をラップできる", () => {
      const result = jsxs(Fragment as unknown as string, {
        children: [jsx("Text", { text: "A" }), jsx("Text", { text: "B" })],
      });
      expect(result.tag).toBe("Fragment");
      expect(result.children).toHaveLength(2);
    });
  });
});
