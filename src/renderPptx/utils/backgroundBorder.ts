import type { PositionedNode } from "../../types.ts";
import { getImageData } from "../../calcYogaLayout/measureImage.ts";
import type { RenderContext } from "../types.ts";
import { pxToIn, pxToPt } from "../units.ts";

/**
 * ノードの背景色・背景画像・ボーダーを描画する
 * 全ノードタイプで最初に呼び出される共通処理
 *
 * 描画順序: 背景色 → 背景画像 → ボーダー
 */
export function renderBackgroundAndBorder(
  node: PositionedNode,
  ctx: RenderContext,
): void {
  const { backgroundColor, backgroundImage, border, borderRadius } = node;
  const hasBackground = Boolean(backgroundColor);
  const hasBackgroundImage = Boolean(backgroundImage);
  const hasBorder = Boolean(
    border &&
      (border.color !== undefined ||
        border.width !== undefined ||
        border.dashType !== undefined),
  );

  if (!hasBackground && !hasBackgroundImage && !hasBorder) {
    return;
  }

  // borderRadius がある場合は roundRect を使用し、rectRadius を計算
  const shapeType = borderRadius
    ? ctx.pptx.ShapeType.roundRect
    : ctx.pptx.ShapeType.rect;

  // px を 0-1 の正規化値に変換
  const rectRadius = borderRadius
    ? Math.min((borderRadius / Math.min(node.w, node.h)) * 2, 1)
    : undefined;

  // backgroundImage がない場合は従来通り1回の addShape で処理
  if (!hasBackgroundImage) {
    const fill = hasBackground
      ? { color: backgroundColor }
      : { type: "none" as const };

    const line = hasBorder
      ? {
          color: border?.color ?? "000000",
          width: border?.width !== undefined ? pxToPt(border.width) : undefined,
          dashType: border?.dashType,
        }
      : { type: "none" as const };

    ctx.slide.addShape(shapeType, {
      x: pxToIn(node.x),
      y: pxToIn(node.y),
      w: pxToIn(node.w),
      h: pxToIn(node.h),
      fill,
      line,
      rectRadius,
    });
    return;
  }

  // backgroundImage がある場合は分割描画: 背景色 → 背景画像 → ボーダー

  // 1. 背景色
  if (hasBackground) {
    ctx.slide.addShape(shapeType, {
      x: pxToIn(node.x),
      y: pxToIn(node.y),
      w: pxToIn(node.w),
      h: pxToIn(node.h),
      fill: { color: backgroundColor },
      line: { type: "none" as const },
      rectRadius,
    });
  }

  // 2. 背景画像
  if (backgroundImage) {
    const sizing = backgroundImage.sizing ?? "cover";
    const imageOptions: Record<string, unknown> = {
      x: pxToIn(node.x),
      y: pxToIn(node.y),
      w: pxToIn(node.w),
      h: pxToIn(node.h),
      sizing: {
        type: sizing,
        w: pxToIn(node.w),
        h: pxToIn(node.h),
      },
    };

    const cachedData = getImageData(backgroundImage.src);
    if (cachedData) {
      ctx.slide.addImage({ ...imageOptions, data: cachedData });
    } else {
      ctx.slide.addImage({ ...imageOptions, path: backgroundImage.src });
    }
  }

  // 3. ボーダー
  if (hasBorder) {
    ctx.slide.addShape(shapeType, {
      x: pxToIn(node.x),
      y: pxToIn(node.y),
      w: pxToIn(node.w),
      h: pxToIn(node.h),
      fill: { type: "none" as const },
      line: {
        color: border?.color ?? "000000",
        width: border?.width !== undefined ? pxToPt(border.width) : undefined,
        dashType: border?.dashType,
      },
      rectRadius,
    });
  }
}
