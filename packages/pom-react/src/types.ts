/**
 * @miyabi/pom-react 独自のProps型定義。
 *
 * @hirokisakabe/pom は内部ノード型を公開していないため、
 * ここで独自に定義する。upstream の types.ts を参照しながら
 * React Props として使いやすい形に整形している。
 *
 * upstream との互換性はXMLシリアライズ層（serializer.ts）で担保するため、
 * ここの型はReactユーザーのDXを最優先に設計する。
 */

// ===== 共通基盤型 =====

type Length = number | "max" | `${number}%`;

type Padding =
  | number
  | {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };

type BorderStyle = {
  color?: string;
  width?: number;
  dashType?: BorderDash;
};

type BorderDash =
  | "solid"
  | "dash"
  | "dashDot"
  | "lgDash"
  | "lgDashDot"
  | "lgDashDotDot"
  | "sysDash"
  | "sysDot";

type FillStyle = {
  color?: string;
  transparency?: number;
};

type ShadowStyle = {
  type?: "outer" | "inner";
  opacity?: number;
  blur?: number;
  angle?: number;
  offset?: number;
  color?: string;
};

type BackgroundImage = {
  src: string;
  sizing?: "cover" | "contain";
};

type UnderlineStyle =
  | "dash"
  | "dashHeavy"
  | "dashLong"
  | "dashLongHeavy"
  | "dbl"
  | "dotDash"
  | "dotDotDash"
  | "dotted"
  | "dottedHeavy"
  | "heavy"
  | "none"
  | "sng"
  | "wavy"
  | "wavyDbl"
  | "wavyHeavy";

type Underline =
  | boolean
  | { style?: UnderlineStyle; color?: string };

type AlignItems = "start" | "center" | "end" | "stretch";
type AlignSelf = "auto" | "start" | "center" | "end" | "stretch";
type JustifyContent =
  | "start"
  | "center"
  | "end"
  | "spaceBetween"
  | "spaceAround"
  | "spaceEvenly";
type FlexWrap = "nowrap" | "wrap" | "wrapReverse";

// ===== ベースProps（全ノード共通） =====

type BaseProps = {
  w?: Length;
  h?: Length;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  padding?: Padding;
  margin?: Padding;
  backgroundColor?: string;
  backgroundImage?: BackgroundImage;
  border?: BorderStyle;
  borderRadius?: number;
  opacity?: number;
  zIndex?: number;
  position?: "relative" | "absolute";
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  alignSelf?: AlignSelf;
  shadow?: ShadowStyle;
};

// ===== テキスト系共通Props =====

type TextStyleProps = {
  fontSize?: number;
  color?: string;
  textAlign?: "left" | "center" | "right";
  bold?: boolean;
  italic?: boolean;
  underline?: Underline;
  strike?: boolean;
  highlight?: string;
  fontFamily?: string;
  lineHeight?: number;
};

// ===== TextRun（インライン装飾） =====

type TextRun = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  highlight?: string;
  color?: string;
  href?: string;
};

// ===== リーフノードProps =====

export type TextProps = BaseProps &
  TextStyleProps & {
    text: string;
    runs?: TextRun[];
  };

type LiItem = {
  text: string;
  runs?: TextRun[];
  bold?: boolean;
  italic?: boolean;
  underline?: Underline;
  strike?: boolean;
  highlight?: string;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
};

export type LiProps = LiItem;

export type UlProps = BaseProps &
  TextStyleProps & {
    items: LiItem[];
  };

type BulletNumberType =
  | "alphaLcParenBoth"
  | "alphaLcParenR"
  | "alphaLcPeriod"
  | "alphaUcParenBoth"
  | "alphaUcParenR"
  | "alphaUcPeriod"
  | "arabicParenBoth"
  | "arabicParenR"
  | "arabicPeriod"
  | "arabicPlain"
  | "romanLcParenBoth"
  | "romanLcParenR"
  | "romanLcPeriod"
  | "romanUcParenBoth"
  | "romanUcParenR"
  | "romanUcPeriod";

export type OlProps = BaseProps &
  TextStyleProps & {
    items: LiItem[];
    numberType?: BulletNumberType;
    numberStartAt?: number;
  };

export type ImageProps = BaseProps & {
  src: string;
  sizing?: {
    type: "contain" | "cover" | "crop";
    w?: number;
    h?: number;
    x?: number;
    y?: number;
  };
};

export type IconProps = BaseProps & {
  name: string;
  size?: number;
  color?: string;
  variant?: "circle-filled" | "circle-outlined" | "square-filled" | "square-outlined";
  bgColor?: string;
};

export type SvgProps = BaseProps & {
  svgContent: string;
  w?: number;
  h?: number;
  color?: string;
};

type TableCell = {
  text: string;
  runs?: TextRun[];
  fontSize?: number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: Underline;
  strike?: boolean;
  highlight?: string;
  textAlign?: "left" | "center" | "right";
  backgroundColor?: string;
  colspan?: number;
  rowspan?: number;
};

type TableRow = {
  cells: TableCell[];
  height?: number;
};

type TableColumn = {
  width?: number;
};

export type TableProps = BaseProps & {
  columns: TableColumn[];
  rows: TableRow[];
  defaultRowHeight?: number;
  cellBorder?: BorderStyle;
};

export type ShapeProps = BaseProps &
  TextStyleProps & {
    shapeType: string;
    text?: string;
    fill?: FillStyle;
    line?: BorderStyle;
  };

type ChartData = {
  name?: string;
  labels: string[];
  values: number[];
};

export type ChartProps = BaseProps & {
  chartType: "bar" | "line" | "pie" | "area" | "doughnut" | "radar";
  data: ChartData[];
  showLegend?: boolean;
  showTitle?: boolean;
  title?: string;
  chartColors?: string[];
  radarStyle?: "standard" | "marker" | "filled";
};

type TimelineItem = {
  date: string;
  title: string;
  description?: string;
  color?: string;
};

export type TimelineProps = BaseProps & {
  direction?: "horizontal" | "vertical";
  items: TimelineItem[];
};

type MatrixItem = {
  label: string;
  x: number;
  y: number;
  color?: string;
};

export type MatrixProps = BaseProps & {
  axes: { x: string; y: string };
  quadrants?: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
  items: MatrixItem[];
};

export type TreeDataItem = {
  label: string;
  color?: string;
  children?: TreeDataItem[];
};

export type TreeProps = BaseProps & {
  layout?: "vertical" | "horizontal";
  nodeShape?: "rect" | "roundRect" | "ellipse";
  data: TreeDataItem;
  connectorStyle?: { color?: string; width?: number };
  nodeWidth?: number;
  nodeHeight?: number;
  levelGap?: number;
  siblingGap?: number;
};

type FlowNodeItem = {
  id: string;
  shape: string;
  text: string;
  color?: string;
  textColor?: string;
  width?: number;
  height?: number;
};

type FlowConnection = {
  from: string;
  to: string;
  label?: string;
  color?: string;
};

export type FlowProps = BaseProps & {
  direction?: "horizontal" | "vertical";
  nodes: FlowNodeItem[];
  connections: FlowConnection[];
  connectorStyle?: {
    color?: string;
    width?: number;
    arrowType?: "none" | "arrow" | "diamond" | "oval" | "stealth" | "triangle";
  };
  nodeWidth?: number;
  nodeHeight?: number;
  nodeGap?: number;
};

type ProcessArrowStep = {
  label: string;
  color?: string;
  textColor?: string;
};

export type ProcessArrowProps = BaseProps & {
  direction?: "horizontal" | "vertical";
  steps: ProcessArrowStep[];
  itemWidth?: number;
  itemHeight?: number;
  gap?: number;
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: Underline;
  strike?: boolean;
  highlight?: string;
};

type PyramidLevel = {
  label: string;
  color?: string;
  textColor?: string;
};

export type PyramidProps = BaseProps & {
  direction?: "up" | "down";
  levels: PyramidLevel[];
  fontSize?: number;
  bold?: boolean;
};

type LineArrow =
  | boolean
  | { type?: "none" | "arrow" | "triangle" | "diamond" | "oval" | "stealth" };

export type LineProps = BaseProps & {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  lineWidth?: number;
  dashType?: BorderDash;
  beginArrow?: LineArrow;
  endArrow?: LineArrow;
};

// ===== コンテナノードProps =====

export type VStackProps = BaseProps & {
  gap?: number;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  flexWrap?: FlexWrap;
  children?: POMChild | POMChild[];
};

export type HStackProps = BaseProps & {
  gap?: number;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  flexWrap?: FlexWrap;
  children?: POMChild | POMChild[];
};

export type LayerProps = BaseProps & {
  children?: POMChild | POMChild[];
};

// ===== JSX中間表現 =====

/** JSXで扱えるノードの型 */
export type POMChild = POMElement | null | undefined | false;

/**
 * カスタムJSXファクトリが返す中間表現。
 * React.ReactElement に相当するが、react不要の軽量版。
 */
export interface POMElement {
  tag: string;
  props: Record<string, unknown>;
  children: POMElement[];
}

/** 関数コンポーネントの型 */
export type POMFC<P = Record<string, unknown>> = (
  props: P,
) => POMElement | null;
