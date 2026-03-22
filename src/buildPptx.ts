import { autoFitSlide } from "./autoFit/autoFit.ts";
import { calcYogaLayout } from "./calcYogaLayout/calcYogaLayout.ts";
import {
  setTextMeasurementMode,
  TextMeasurementMode,
} from "./calcYogaLayout/measureText.ts";
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
  // テキスト計測モードを設定（デフォルトは auto）
  if (options?.textMeasurement) {
    setTextMeasurementMode(options.textMeasurement);
  } else {
    setTextMeasurementMode("auto");
  }

  const nodes = parseXml(xml);
  const positionedPages: PositionedNode[] = [];

  for (const node of nodes) {
    try {
      if (options?.autoFit !== false) {
        await autoFitSlide(node, slideSize);
      } else {
        await calcYogaLayout(node, slideSize);
      }
      const positioned = toPositioned(node);
      positionedPages.push(positioned);
    } finally {
      freeYogaTree(node);
    }
  }

  const pptx = renderPptx(positionedPages, slideSize, options?.master);

  return pptx;
}
