import type { PositionedNode } from "../../types.ts";
import type { RenderContext } from "../types.ts";
import { pxToIn } from "../units.ts";

type IconPositionedNode = Extract<PositionedNode, { type: "icon" }>;

export function renderIconNode(
  node: IconPositionedNode,
  ctx: RenderContext,
): void {
  ctx.slide.addImage({
    data: node.iconImageData,
    x: pxToIn(node.x),
    y: pxToIn(node.y),
    w: pxToIn(node.w),
    h: pxToIn(node.h),
  });
}
