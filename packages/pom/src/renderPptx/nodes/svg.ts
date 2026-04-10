import type { PositionedNode } from "../../types.ts";
import type { RenderContext } from "../types.ts";
import { pxToIn } from "../units.ts";

type SvgPositionedNode = Extract<PositionedNode, { type: "svg" }>;

export function renderSvgNode(
  node: SvgPositionedNode,
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
