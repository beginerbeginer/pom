/**
 * メインAPI。
 * React JSXで書いたスライドをPPTXファイルに変換する。
 *
 * @example
 * ```tsx
 * // @jsxImportSource @miyabi/pom-react
 * import { buildPptxFromReact } from "@miyabi/pom-react";
 *
 * function MySlide() {
 *   return (
 *     <VStack w={1280} h={720} padding={48} backgroundColor="F8FAFC">
 *       <Text fontSize={28} bold text="Title" />
 *     </VStack>
 *   );
 * }
 *
 * const { pptx } = await buildPptxFromReact(<MySlide />, { w: 1280, h: 720 });
 * await pptx.writeFile({ fileName: "output.pptx" });
 * ```
 */
import { buildPptx } from "@hirokisakabe/pom";
import type { BuildPptxResult, SlideMasterOptions, TextMeasurementMode } from "@hirokisakabe/pom";
import type { POMElement } from "./types.ts";
import { renderToPOMNodes } from "./renderer.ts";
import { serializeToXml } from "./serializer.ts";

export type { BuildPptxResult };

export interface BuildPptxFromReactOptions {
  master?: SlideMasterOptions;
  masterPptx?: ArrayBuffer | Uint8Array;
  textMeasurement?: TextMeasurementMode;
  autoFit?: boolean;
  strict?: boolean;
}

/**
 * JSXで記述したスライドをPPTXに変換する。
 *
 * @param element - JSXルート要素。単一スライドまたはFragmentで複数スライド。
 * @param slideSize - スライドサイズ（ピクセル）
 * @param options - buildPptx互換オプション
 */
export async function buildPptxFromReact(
  element: POMElement,
  slideSize: { w: number; h: number },
  options?: BuildPptxFromReactOptions,
): Promise<BuildPptxResult> {
  const nodes = renderToPOMNodes(element);
  const xml = serializeToXml(nodes);
  return buildPptx(xml, slideSize, options);
}
