import type { PositionedNode, Underline, UnderlineStyle } from "../types.ts";
import { pxToIn, pxToPt } from "./units.ts";

type TextNode = Extract<PositionedNode, { type: "text" }>;

/**
 * underline プロパティを pptxgenjs 形式に変換する
 */
export function convertUnderline(
  underline: Underline | undefined,
): { style?: UnderlineStyle; color?: string } | undefined {
  if (underline === undefined) return undefined;
  if (underline === false) return undefined;
  if (underline === true) return { style: "sng" };
  return {
    style: underline.style,
    color: underline.color,
  };
}

/**
 * strike プロパティを pptxgenjs 形式に変換する
 */
export function convertStrike(
  strike: boolean | undefined,
): "sngStrike" | undefined {
  if (strike) return "sngStrike";
  return undefined;
}

export function createTextOptions(node: TextNode) {
  const fontSizePx = node.fontPx ?? 24;
  const fontFamily = node.fontFamily ?? "Noto Sans JP";
  const lineSpacingMultiple = node.lineSpacingMultiple ?? 1.3;

  return {
    x: pxToIn(node.x),
    y: pxToIn(node.y),
    w: pxToIn(node.w),
    h: pxToIn(node.h),
    fontSize: pxToPt(fontSizePx),
    fontFace: fontFamily,
    align: node.alignText ?? "left",
    valign: "top" as const,
    margin: 0,
    lineSpacingMultiple,
    color: node.color,
    bold: node.bold,
    italic: node.italic,
    underline: convertUnderline(node.underline),
    strike: convertStrike(node.strike),
    highlight: node.highlight,
  };
}
