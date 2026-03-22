import type { POMNode, PositionedNode } from "../../types.ts";
import type { NodeDefinition } from "../types.ts";
import { rasterizeIcon } from "../../icons/index.ts";
import { omitYogaNode } from "../../toPositioned/toPositioned.ts";
import { renderIconNode } from "../../renderPptx/nodes/icon.ts";

export const iconNodeDef: NodeDefinition = {
  type: "icon",
  category: "leaf",
  applyYogaStyle(node, yn) {
    const n = node as Extract<POMNode, { type: "icon" }>;
    const size = n.size ?? 24;
    yn.setMeasureFunc(() => ({ width: size, height: size }));
  },
  toPositioned(pom, absoluteX, absoluteY, layout, ctx) {
    const n = pom as Extract<POMNode, { type: "icon" }>;
    const rasterSize = Math.max(
      Math.ceil(layout.width),
      Math.ceil(layout.height),
      n.size ?? 24,
    );
    const iconImageData = rasterizeIcon(
      n.name,
      rasterSize,
      n.color ?? "#000000",
      ctx.iconRasterCache,
    );
    return {
      ...omitYogaNode(n),
      x: absoluteX,
      y: absoluteY,
      w: layout.width,
      h: layout.height,
      iconImageData,
    } as PositionedNode;
  },
  render(node, ctx) {
    renderIconNode(node as Extract<typeof node, { type: "icon" }>, ctx);
  },
};
