import type { POMNode, PositionedNode } from "../../types.ts";
import type { NodeDefinition } from "../types.ts";
import { rasterizeIcon } from "../../icons/index.ts";
import { renderIconNode } from "../../renderPptx/nodes/icon.ts";
import { getContentArea } from "../../renderPptx/utils/contentArea.ts";

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
      ...n,
      x: absoluteX,
      y: absoluteY,
      w: layout.width,
      h: layout.height,
      iconImageData,
    };

    // padding を考慮したコンテンツ領域で bg/icon の座標を計算
    const content = getContentArea({
      x: absoluteX,
      y: absoluteY,
      w: layout.width,
      h: layout.height,
      padding: n.padding,
    });

    if (n.variant) {
      const totalSize = Math.ceil(iconSize * 1.75);
      // 背景図形は totalSize の正方形として、コンテンツ領域の中央に配置
      positioned.bgX = content.x + (content.w - totalSize) / 2;
      positioned.bgY = content.y + (content.h - totalSize) / 2;
      positioned.bgW = totalSize;
      positioned.bgH = totalSize;
      // アイコンはコンテンツ領域の中央に配置
      positioned.iconX = content.x + (content.w - iconSize) / 2;
      positioned.iconY = content.y + (content.h - iconSize) / 2;
      positioned.iconW = iconSize;
      positioned.iconH = iconSize;
    } else {
      // variant なしの場合はコンテンツ領域に合わせてアイコンを配置
      positioned.iconX = content.x;
      positioned.iconY = content.y;
      positioned.iconW = content.w;
      positioned.iconH = content.h;
    }
    return positioned as PositionedNode;
  },
  render(node, ctx) {
    renderIconNode(node as Extract<typeof node, { type: "icon" }>, ctx);
  },
};
