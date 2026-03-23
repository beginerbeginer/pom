import { autoFitSlide } from "./autoFit/autoFit.ts";
import { createBuildContext } from "./buildContext.ts";
import { calcYogaLayout } from "./calcYogaLayout/calcYogaLayout.ts";
import type { TextMeasurementMode } from "./calcYogaLayout/measureText.ts";
import type { YogaNodeMap } from "./calcYogaLayout/types.ts";
import { extractLayoutResults } from "./calcYogaLayout/types.ts";
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
    let map: YogaNodeMap | undefined;
    try {
      if (options?.autoFit !== false) {
        map = await autoFitSlide(node, slideSize, ctx);
      } else {
        map = await calcYogaLayout(node, slideSize, ctx);
      }
      const layoutMap = extractLayoutResults(map);
      const positioned = toPositioned(node, ctx, layoutMap);
      positionedPages.push(positioned);
    } finally {
      if (map) freeYogaTree(map);
    }
  }

  const pptx = renderPptx(positionedPages, slideSize, ctx, options?.master);

  return pptx;
}
