/**
 * React JSX → SerializableNode[] レンダラー。
 *
 * react-test-renderer を使って React 要素ツリーを JSON に変換し、
 * そのまま SerializableNode[] に写像する。
 *
 * react-test-renderer を選んだ理由:
 * - react-reconciler を自前実装するより遥かにシンプル
 * - hooks / context (useContext, ThemeProvider 等) を完全サポート
 * - 静的な PPTX 生成には re-render が不要なため、一度の初期レンダリングで十分
 */
import React, { createContext, useContext } from "react";
import { create as createTestRenderer, act } from "react-test-renderer";
import { buildPptx } from "@hirokisakabe/pom";
import type { BuildPptxResult, SlideMasterOptions, TextMeasurementMode } from "@hirokisakabe/pom";
import type { SerializableNode } from "./renderer.ts";
import { serializeToXml } from "./serializer.ts";

// ─── Theme ──────────────────────────────────────────────────────────────────

type AnyTheme = Record<string, unknown>;
const ThemeCtx = createContext<AnyTheme>({});

export function ThemeProvider({
  theme,
  children,
}: {
  theme: AnyTheme;
  children?: React.ReactNode;
}) {
  return React.createElement(ThemeCtx.Provider, { value: theme }, children);
}

export function useTheme(): AnyTheme {
  return useContext(ThemeCtx);
}

// ─── POM host components ─────────────────────────────────────────────────────
//
// react-test-renderer は文字列タグをそのまま type フィールドに記録する。
// VStack({ gap: 16 }) → { type: "VStack", props: { gap: 16 }, children: [...] }
// これを SerializableNode に1対1で写像できる。

// Text / Shape は <Text>文字列</Text> 構文の string children を text prop に昇格する。
// カスタム jsx-runtime と同じ挙動を React JSX パスでも再現するため。
const TEXT_CONTENT_TAGS = new Set(["Text", "Shape"]);

function extractStringChildren(children: unknown): string | null {
  if (typeof children === "string") return children;
  if (Array.isArray(children) && children.length > 0 && children.every((c) => typeof c === "string")) {
    return children.join("");
  }
  return null;
}

function makePomComponent(tag: string) {
  return function PomElement(props: Record<string, unknown>) {
    const { children, ...rest } = props;

    if (TEXT_CONTENT_TAGS.has(tag)) {
      const textContent = extractStringChildren(children);
      if (textContent !== null) {
        return React.createElement(tag, { ...rest, text: textContent } as React.HTMLAttributes<HTMLElement>);
      }
    }

    return React.createElement(tag, rest as React.HTMLAttributes<HTMLElement>, children as React.ReactNode);
  };
}

export const VStack = makePomComponent("VStack");
export const HStack = makePomComponent("HStack");
export const Text = makePomComponent("Text");
export const Image = makePomComponent("Image");
export const Table = makePomComponent("Table");
export const Shape = makePomComponent("Shape");
export const Chart = makePomComponent("Chart");
export const Timeline = makePomComponent("Timeline");
export const Matrix = makePomComponent("Matrix");
export const Tree = makePomComponent("Tree");
export const Flow = makePomComponent("Flow");
export const ProcessArrow = makePomComponent("ProcessArrow");
export const Pyramid = makePomComponent("Pyramid");
export const Ul = makePomComponent("Ul");
export const Ol = makePomComponent("Ol");
export const Line = makePomComponent("Line");
export const Layer = makePomComponent("Layer");
export const Icon = makePomComponent("Icon");
export const Svg = makePomComponent("Svg");

// ─── Renderer ────────────────────────────────────────────────────────────────

type TestRendererJSON = {
  type: string;
  props: Record<string, unknown>;
  children: Array<TestRendererJSON | string> | null;
};

function jsonToSerializable(node: TestRendererJSON): SerializableNode {
  const children = (node.children ?? [])
    .filter((c): c is TestRendererJSON => typeof c === "object" && c !== null)
    .map(jsonToSerializable);
  return { tag: node.type, props: node.props ?? {}, children };
}

// ─── Public API ──────────────────────────────────────────────────────────────

export interface BuildPptxFromJsxOptions {
  master?: SlideMasterOptions;
  masterPptx?: ArrayBuffer | Uint8Array;
  textMeasurement?: TextMeasurementMode;
  autoFit?: boolean;
  strict?: boolean;
}

/**
 * React JSX（hooks / context 対応）で書いたスライドを PPTX に変換する。
 * ThemeProvider / useTheme など React のエコシステムをフル活用できる。
 */
export async function buildPptxFromJsx(
  element: React.ReactElement,
  slideSize: { w: number; h: number },
  options?: BuildPptxFromJsxOptions,
): Promise<BuildPptxResult> {
  const nodes = renderToSerializableNodes(element);
  const xml = serializeToXml(nodes);
  return buildPptx(xml, slideSize, options);
}

export function renderToSerializableNodes(
  element: React.ReactElement,
): SerializableNode[] {
  // React 19 では act() でラップしないと初回レンダリングが確定しない。
  // IS_REACT_ACT_ENVIRONMENT を true にすることで act() の警告を抑制する。
  (globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true;

  let renderer: ReturnType<typeof createTestRenderer> | undefined;
  act(() => {
    renderer = createTestRenderer(element);
  });

  const json = renderer!.toJSON() as TestRendererJSON | TestRendererJSON[] | null;
  if (!json) return [];
  if (Array.isArray(json)) return json.map(jsonToSerializable);
  return [jsonToSerializable(json)];
}
