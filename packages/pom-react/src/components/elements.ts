/**
 * JSXで使用できるPOMコンポーネント関数群。
 *
 * <VStack> のような大文字のJSXタグは変数参照として解決されるため、
 * 各コンポーネントをnamed exportとして提供する必要がある。
 *
 * 使用例:
 *   import { VStack, HStack, Text } from "@miyabi/pom-react";
 *   // または
 *   import * as POM from "@miyabi/pom-react";
 *
 * 各関数はJSXファクトリから { tag, props, children } を受け取り、
 * そのままPOMElementとして返す薄いラッパー。
 * 実際のロジックはjsx-runtime.tsとrenderer.tsが担当する。
 */
import type { POMElement } from "../types.ts";
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
} from "../types.ts";

type WithChildren<P> = P & { children?: POMElement[] };

/** jsx-runtimeがタグ名を識別できるよう pomTag を付与する */
function makeElement(tag: string) {
  function component(props: WithChildren<Record<string, unknown>>): POMElement {
    const { children = [], ...rest } = props;
    return { tag, props: rest, children };
  }
  (component as unknown as { pomTag: string }).pomTag = tag;
  return component;
}

export const VStack       = makeElement("VStack") as (props: WithChildren<VStackProps>)       => POMElement;
export const HStack       = makeElement("HStack") as (props: WithChildren<HStackProps>)       => POMElement;
export const Layer        = makeElement("Layer")  as (props: WithChildren<LayerProps>)        => POMElement;
export const Text         = makeElement("Text")   as (props: WithChildren<TextProps>)         => POMElement;
export const Ul           = makeElement("Ul")     as (props: WithChildren<UlProps>)           => POMElement;
export const Ol           = makeElement("Ol")     as (props: WithChildren<OlProps>)           => POMElement;
export const Image        = makeElement("Image")  as (props: WithChildren<ImageProps>)        => POMElement;
export const Table        = makeElement("Table")  as (props: WithChildren<TableProps>)        => POMElement;
export const Shape        = makeElement("Shape")  as (props: WithChildren<ShapeProps>)        => POMElement;
export const Chart        = makeElement("Chart")  as (props: WithChildren<ChartProps>)        => POMElement;
export const Timeline     = makeElement("Timeline") as (props: WithChildren<TimelineProps>)   => POMElement;
export const Matrix       = makeElement("Matrix") as (props: WithChildren<MatrixProps>)       => POMElement;
export const Tree         = makeElement("Tree")   as (props: WithChildren<TreeProps>)         => POMElement;
export const Flow         = makeElement("Flow")   as (props: WithChildren<FlowProps>)         => POMElement;
export const ProcessArrow = makeElement("ProcessArrow") as (props: WithChildren<ProcessArrowProps>) => POMElement;
export const Pyramid      = makeElement("Pyramid") as (props: WithChildren<PyramidProps>)     => POMElement;
export const Line         = makeElement("Line")   as (props: WithChildren<LineProps>)         => POMElement;
export const Icon         = makeElement("Icon")   as (props: WithChildren<IconProps>)         => POMElement;
export const Svg          = makeElement("Svg")    as (props: WithChildren<SvgProps>)          => POMElement;
