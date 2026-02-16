import type { Underline } from "../../types.ts";
import type { RenderContext } from "../types.ts";
import { pxToIn, pxToPt } from "../units.ts";
import { convertUnderline, convertStrike } from "../textOptions.ts";

export type SimpleTextOptions = {
  x: number; // px
  y: number; // px
  w: number; // px
  h: number; // px
  text: string;
  fontSize?: number; // px
  fontFace?: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: Underline;
  strike?: boolean;
  highlight?: string;
  align?: "left" | "center" | "right";
  valign?: "top" | "middle" | "bottom";
};

/**
 * シンプルなテキストを描画する
 * timeline, matrix, tree, flow などの複雑ノードで使用
 */
export function drawSimpleText(
  ctx: RenderContext,
  options: SimpleTextOptions,
): void {
  const {
    x,
    y,
    w,
    h,
    text,
    fontSize = 12,
    fontFace = "Noto Sans JP",
    color = "000000",
    bold,
    italic,
    underline,
    strike,
    highlight,
    align = "left",
    valign = "top",
  } = options;

  ctx.slide.addText(text, {
    x: pxToIn(x),
    y: pxToIn(y),
    w: pxToIn(w),
    h: pxToIn(h),
    fontSize: pxToPt(fontSize),
    fontFace,
    color,
    bold,
    italic,
    underline: convertUnderline(underline),
    strike: convertStrike(strike),
    highlight,
    align,
    valign,
  });
}
