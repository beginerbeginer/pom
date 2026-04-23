/**
 * JSX IntrinsicElements の型定義。
 * TypeScriptがJSXタグ（<VStack>, <Text> など）のpropsを型チェックするために使用。
 *
 * jsxImportSource を "@miyabi/pom-react" に設定すると、
 * TypeScriptはこのファイル内のJSX名前空間を自動的に参照する。
 */
import type {
  VStackProps,
  HStackProps,
  LayerProps,
  TextProps,
  UlProps,
  OlProps,
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
} from "./types.ts";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      VStack: VStackProps;
      HStack: HStackProps;
      Layer: LayerProps;
      Text: TextProps;
      Ul: UlProps;
      Ol: OlProps;
      Image: ImageProps;
      Table: TableProps;
      Shape: ShapeProps;
      Chart: ChartProps;
      Timeline: TimelineProps;
      Matrix: MatrixProps;
      Tree: TreeProps;
      Flow: FlowProps;
      ProcessArrow: ProcessArrowProps;
      Pyramid: PyramidProps;
      Line: LineProps;
      Icon: IconProps;
      Svg: SvgProps;
    }
  }
}
