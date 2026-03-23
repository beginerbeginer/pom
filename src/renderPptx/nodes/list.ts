import type { PositionedNode, LiNode } from "../../types.ts";
import type { RenderContext } from "../types.ts";
import { pxToIn, pxToPt } from "../units.ts";
import { convertUnderline, convertStrike } from "../textOptions.ts";
import { getContentArea } from "../utils/contentArea.ts";

type UlPositionedNode = Extract<PositionedNode, { type: "ul" }>;
type OlPositionedNode = Extract<PositionedNode, { type: "ol" }>;

function resolveStyle(li: LiNode, parent: UlPositionedNode | OlPositionedNode) {
  return {
    fontSize: li.fontSize ?? parent.fontSize ?? 24,
    color: li.color ?? parent.color,
    bold: li.bold ?? parent.bold,
    italic: li.italic ?? parent.italic,
    underline: li.underline ?? parent.underline,
    strike: li.strike ?? parent.strike,
    highlight: li.highlight ?? parent.highlight,
    fontFamily: li.fontFamily ?? parent.fontFamily ?? "Noto Sans JP",
  };
}

function hasItemStyleOverride(items: LiNode[]): boolean {
  return items.some(
    (li) =>
      li.fontSize !== undefined ||
      li.color !== undefined ||
      li.bold !== undefined ||
      li.italic !== undefined ||
      li.underline !== undefined ||
      li.strike !== undefined ||
      li.highlight !== undefined ||
      li.fontFamily !== undefined,
  );
}

export function renderUlNode(node: UlPositionedNode, ctx: RenderContext): void {
  const fontSizePx = node.fontSize ?? 24;
  const fontFamily = node.fontFamily ?? "Noto Sans JP";
  const lineHeight = node.lineHeight ?? 1.3;
  const content = getContentArea(node);

  if (hasItemStyleOverride(node.items)) {
    // Li に個別スタイルがある場合は配列形式を使用
    const textItems = node.items.map((li, i) => {
      const style = resolveStyle(li, node);
      return {
        text: i < node.items.length - 1 ? li.text + "\n" : li.text,
        options: {
          fontSize: pxToPt(style.fontSize),
          fontFace: style.fontFamily,
          color: style.color,
          bold: style.bold,
          italic: style.italic,
          underline: convertUnderline(style.underline),
          strike: convertStrike(style.strike),
          highlight: style.highlight,
          bullet: true as const,
        },
      };
    });

    ctx.slide.addText(textItems, {
      x: pxToIn(content.x),
      y: pxToIn(content.y),
      w: pxToIn(content.w),
      h: pxToIn(content.h),
      align: node.textAlign ?? "left",
      valign: "top" as const,
      margin: 0,
      lineSpacingMultiple: lineHeight,
    });
  } else {
    // Li にスタイルオーバーライドがない場合は単一文字列形式を使用
    const text = node.items.map((li) => li.text).join("\n");

    ctx.slide.addText(text, {
      x: pxToIn(content.x),
      y: pxToIn(content.y),
      w: pxToIn(content.w),
      h: pxToIn(content.h),
      fontSize: pxToPt(fontSizePx),
      fontFace: fontFamily,
      align: node.textAlign ?? "left",
      valign: "top" as const,
      margin: 0,
      lineSpacingMultiple: lineHeight,
      color: node.color,
      bold: node.bold,
      italic: node.italic,
      underline: convertUnderline(node.underline),
      strike: convertStrike(node.strike),
      highlight: node.highlight,
      bullet: true,
    });
  }
}

export function renderOlNode(node: OlPositionedNode, ctx: RenderContext): void {
  const fontSizePx = node.fontSize ?? 24;
  const fontFamily = node.fontFamily ?? "Noto Sans JP";
  const lineHeight = node.lineHeight ?? 1.3;
  const content = getContentArea(node);

  const bulletOptions: Record<string, unknown> = { type: "number" };
  if (node.numberType !== undefined) {
    bulletOptions.numberType = node.numberType;
  }
  if (node.numberStartAt !== undefined) {
    bulletOptions.numberStartAt = node.numberStartAt;
  }

  if (hasItemStyleOverride(node.items)) {
    const textItems = node.items.map((li, i) => {
      const style = resolveStyle(li, node);
      return {
        text: i < node.items.length - 1 ? li.text + "\n" : li.text,
        options: {
          fontSize: pxToPt(style.fontSize),
          fontFace: style.fontFamily,
          color: style.color,
          bold: style.bold,
          italic: style.italic,
          underline: convertUnderline(style.underline),
          strike: convertStrike(style.strike),
          highlight: style.highlight,
          bullet: bulletOptions,
        },
      };
    });

    ctx.slide.addText(textItems, {
      x: pxToIn(content.x),
      y: pxToIn(content.y),
      w: pxToIn(content.w),
      h: pxToIn(content.h),
      align: node.textAlign ?? "left",
      valign: "top" as const,
      margin: 0,
      lineSpacingMultiple: lineHeight,
    });
  } else {
    const text = node.items.map((li) => li.text).join("\n");

    ctx.slide.addText(text, {
      x: pxToIn(content.x),
      y: pxToIn(content.y),
      w: pxToIn(content.w),
      h: pxToIn(content.h),
      fontSize: pxToPt(fontSizePx),
      fontFace: fontFamily,
      align: node.textAlign ?? "left",
      valign: "top" as const,
      margin: 0,
      lineSpacingMultiple: lineHeight,
      color: node.color,
      bold: node.bold,
      italic: node.italic,
      underline: convertUnderline(node.underline),
      strike: convertStrike(node.strike),
      highlight: node.highlight,
      bullet: bulletOptions,
    });
  }
}
