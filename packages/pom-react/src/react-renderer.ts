/**
 * React JSX → SerializableNode[] レンダラー。
 *
 * static-reconciler.ts が提供する renderReactElement() を使い、
 * React 要素ツリーを SerializableNode[] に変換する。
 * hooks / context (useContext, ThemeProvider 等) が使える。
 */
import React, { createContext, useContext } from "react";
import { buildPptx } from "@hirokisakabe/pom";
import type { BuildPptxResult, SlideMasterOptions, TextMeasurementMode } from "@hirokisakabe/pom";
import type { SerializableNode } from "./renderer.ts";
import { serializeToXml } from "./serializer.ts";
import { renderReactElement } from "./static-reconciler.ts";

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
// 各コンポーネントは React.createElement で文字列タグに委譲する。
// Text/Shape の文字列 children → text prop 昇格は static-reconciler.ts が担う。

function makePomComponent(tag: string) {
  return function PomElement(props: Record<string, unknown>) {
    const { children, ...rest } = props;
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
  return renderReactElement(element);
}
