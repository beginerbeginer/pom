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
      const totalSize = Math.ceil(iconSize * 1.75);
      // 背景図形は totalSize の正方形として、layout 領域の中央に配置
      const bgOffsetX = (layout.width - totalSize) / 2;
      const bgOffsetY = (layout.height - totalSize) / 2;
      positioned.bgX = absoluteX + bgOffsetX;
      positioned.bgY = absoluteY + bgOffsetY;
      positioned.bgW = totalSize;
      positioned.bgH = totalSize;
      // アイコンは背景図形の中央に配置
      const iconOffsetX = (layout.width - iconSize) / 2;
      const iconOffsetY = (layout.height - iconSize) / 2;
      positioned.iconX = absoluteX + iconOffsetX;
      positioned.iconY = absoluteY + iconOffsetY;
      positioned.iconW = iconSize;
      positioned.iconH = iconSize;
    }
    return positioned as PositionedNode;
  },
  render(node, ctx) {
    renderIconNode(node as Extract<typeof node, { type: "icon" }>, ctx);
  },
};
