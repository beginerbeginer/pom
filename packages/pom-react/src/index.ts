/**
 * @miyabi/pom-react — React JSX で宣言的に PPTX を生成するライブラリ。
 *
 * ## 基本的な使い方
 *
 * tsconfig.json に以下を追加:
 * ```json
 * {
 *   "compilerOptions": {
 *     "jsx": "react-jsx",
 *     "jsxImportSource": "@miyabi/pom-react"
 *   }
 * }
 * ```
 *
 * またはファイル先頭に以下を追加:
 * ```tsx
 * // @jsxImportSource @miyabi/pom-react
 * ```
 *
 * ## 使用例
 *
 * ```tsx
 * // @jsxImportSource @miyabi/pom-react
 * import { buildPptxFromReact } from "@miyabi/pom-react";
 *
 * function TitleSlide() {
 *   return (
 *     <VStack w={1280} h={720} padding={48} backgroundColor="1E293B">
 *       <Text fontSize={40} bold color="FFFFFF">Q4 Results</Text>
 *       <Text fontSize={20} color="94A3B8">FY2025</Text>
 *     </VStack>
 *   );
 * }
 *
 * const { pptx } = await buildPptxFromReact(<TitleSlide />, { w: 1280, h: 720 });
 * await pptx.writeFile({ fileName: "deck.pptx" });
 * ```
 */
export { buildPptxFromReact } from "./buildPptxFromReact.ts";

export {
  VStack, HStack, Layer,
  Text, Ul, Ol,
  Image, Table, Shape, Chart,
  Timeline, Matrix, Tree, Flow,
  ProcessArrow, Pyramid, Line,
  Icon, Svg,
} from "./components/elements.ts";
export type { BuildPptxFromReactOptions, BuildPptxResult } from "./buildPptxFromReact.ts";

export type {
  VStackProps,
  HStackProps,
  LayerProps,
  TextProps,
  UlProps,
  OlProps,
  LiProps,
  ImageProps,
  TableProps,
  ShapeProps,
  ChartProps,
  TimelineProps,
  MatrixProps,
  TreeProps,
  FlowProps,
  ProcessArrowProps,
  PyramidProps,
  LineProps,
  IconProps,
  SvgProps,
  POMChild,
  POMElement,
  POMFC,
} from "./types.ts";
