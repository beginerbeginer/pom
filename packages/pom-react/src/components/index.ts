/**
 * JSXコンポーネントの型定義エクスポート。
 *
 * 使用例（tsconfig.jsonでjsxImportSourceを設定済みの場合）:
 * ```tsx
 * // @jsxImportSource @miyabi/pom-react
 * import type { VStackProps, TextProps } from "@miyabi/pom-react/components";
 *
 * function Slide(props: VStackProps) {
 *   return <VStack {...props} />;
 * }
 * ```
 *
 * JSXタグ自体の型はjsx-runtimeが自動解決するため、
 * ここではカスタムコンポーネントを作る際のProps型のみをエクスポートする。
 */
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
} from "../types.ts";
