import type { POMNode, PositionedNode } from "../../types.ts";
import type { NodeDefinition, Yoga } from "../types.ts";
import type { Node as YogaNode } from "yoga-layout";
import { measureImage, getImageData } from "../../shared/measureImage.ts";
import { renderImageNode } from "../../renderPptx/nodes/image.ts";
import { omitYogaNode } from "../../toPositioned/toPositioned.ts";

export const imageNodeDef: NodeDefinition = {
  type: "image",
  category: "leaf",
  applyYogaStyle(node: POMNode, yn: YogaNode, _yoga: Yoga) {
    const n = node as Extract<POMNode, { type: "image" }>;
    const src = n.src;

    yn.setMeasureFunc(() => {
      const { widthPx, heightPx } = measureImage(src);
      return { width: widthPx, height: heightPx };
    });
  },
  toPositioned(pom, absoluteX, absoluteY, layout) {
    const n = pom as Extract<POMNode, { type: "image" }>;
    const imageData = getImageData(n.src);
    return {
      ...omitYogaNode(n),
      x: absoluteX,
      y: absoluteY,
      w: layout.width,
      h: layout.height,
      imageData,
    } as PositionedNode;
  },
  render(node, ctx) {
    renderImageNode(node as Extract<typeof node, { type: "image" }>, ctx);
  },
  collectImageSources(node) {
    const n = node as Extract<POMNode, { type: "image" }>;
    return [n.src];
  },
};
