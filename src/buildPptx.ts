import { autoFitSlide } from "./autoFit/autoFit.ts";
import { createBuildContext } from "./buildContext.ts";
import { calcYogaLayout } from "./calcYogaLayout/calcYogaLayout.ts";
import type { TextMeasurementMode } from "./calcYogaLayout/measureText.ts";
import { parseXml } from "./parseXml/parseXml.ts";
import { renderPptx } from "./renderPptx/renderPptx.ts";
import { freeYogaTree } from "./shared/freeYogaTree.ts";
import { toPositioned } from "./toPositioned/toPositioned.ts";
import { PositionedNode, SlideMasterOptions } from "./types.ts";

export type { TextMeasurementMode };

export async function buildPptx(
  xml: string,
  slideSize: { w: number; h: number },
  options?: {
    master?: SlideMasterOptions;
    textMeasurement?: TextMeasurementMode;
    autoFit?: boolean;
  },
) {
  const ctx = createBuildContext(options?.textMeasurement ?? "auto");

  const nodes = parseXml(xml);
  const positionedPages: PositionedNode[] = [];

  for (const node of nodes) {
    try {
      if (options?.autoFit !== false) {
        await autoFitSlide(node, slideSize, ctx);
      } else {
        await calcYogaLayout(node, slideSize, ctx);
      }
      const positioned = toPositioned(node, ctx);
      positionedPages.push(positioned);
    } finally {
      freeYogaTree(node);
    }
  }

  const pptx = renderPptx(positionedPages, slideSize, ctx, options?.master);

  return pptx;
}
