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
    const iconSize = n.size ?? 24;
    // variant 指定時はアイコンサイズ + パディング分を全体サイズとする
    const totalSize = n.variant ? Math.ceil(iconSize * 1.75) : iconSize;
    yn.setMeasureFunc(() => ({ width: totalSize, height: totalSize }));
  },
  toPositioned(pom, absoluteX, absoluteY, layout, ctx) {
    const n = pom as Extract<POMNode, { type: "icon" }>;
    const iconSize = n.size ?? 24;
    const rasterSize = Math.max(
      Math.ceil(n.variant ? iconSize : layout.width),
      Math.ceil(n.variant ? iconSize : layout.height),
      iconSize,
    );
    const iconImageData = rasterizeIcon(
      n.name,
      rasterSize,
      n.color ?? "#000000",
      ctx.iconRasterCache,
    );

    // variant 指定時はアイコンを中央に配置
    const positioned: Record<string, unknown> = {
      ...omitYogaNode(n),
      x: absoluteX,
      y: absoluteY,
      w: layout.width,
      h: layout.height,
      iconImageData,
    };
    if (n.variant) {
      const paddingX = (layout.width - iconSize) / 2;
      const paddingY = (layout.height - iconSize) / 2;
      positioned.iconX = absoluteX + paddingX;
      positioned.iconY = absoluteY + paddingY;
      positioned.iconW = iconSize;
      positioned.iconH = iconSize;
    }
    return positioned as PositionedNode;
  },
  render(node, ctx) {
    renderIconNode(node as Extract<typeof node, { type: "icon" }>, ctx);
  },
};
