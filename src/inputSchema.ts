/**
 * Input schemas for LLM/external input validation (internal module)
 *
 * These schemas do not include internal properties like `yogaNode`.
 * Used by `parseXml` to validate parsed XML input.
 */

import { z } from "zod";
import {
  lengthSchema,
  paddingSchema,
  borderStyleSchema,
  borderDashSchema,
  fillStyleSchema,
  shadowStyleSchema,
  alignItemsSchema,
  justifyContentSchema,
  shapeTypeSchema,
  tableColumnSchema,
  tableRowSchema,
  chartTypeSchema,
  chartDataSchema,
  bulletOptionsSchema,
  radarStyleSchema,
  timelineDirectionSchema,
  timelineItemSchema,
  matrixAxisSchema,
  matrixQuadrantsSchema,
  matrixItemSchema,
  treeLayoutSchema,
  treeNodeShapeSchema,
  treeConnectorStyleSchema,
  flowDirectionSchema,
  flowNodeItemSchema,
  flowConnectionSchema,
  flowConnectorStyleSchema,
  processArrowDirectionSchema,
  processArrowStepSchema,
  lineArrowSchema,
  underlineSchema,
  backgroundImageSchema,
  type AlignItems,
  type JustifyContent,
  type TreeDataItem,
  type ShadowStyle,
} from "./types.ts";

// ===== Base Node Schema =====
export const inputBaseNodeSchema = z.object({
  w: lengthSchema.optional(),
  h: lengthSchema.optional(),
  minW: z.number().optional(),
  maxW: z.number().optional(),
  minH: z.number().optional(),
  maxH: z.number().optional(),
  padding: paddingSchema.optional(),
  backgroundColor: z.string().optional(),
  backgroundImage: backgroundImageSchema.optional(),
  border: borderStyleSchema.optional(),
  borderRadius: z.number().optional(),
  opacity: z.number().min(0).max(1).optional(),
});

type InputBaseNode = z.infer<typeof inputBaseNodeSchema>;

// ===== Node Schemas =====
export const inputTextNodeSchema = inputBaseNodeSchema.extend({
  type: z.literal("text"),
  text: z.string(),
  fontPx: z.number().optional(),
  color: z.string().optional(),
  alignText: z.enum(["left", "center", "right"]).optional(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: underlineSchema.optional(),
  strike: z.boolean().optional(),
  highlight: z.string().optional(),
  fontFamily: z.string().optional(),
  lineSpacingMultiple: z.number().optional(),
  bullet: z.union([z.boolean(), bulletOptionsSchema]).optional(),
});

const inputImageSizingSchema = z.object({
  type: z.enum(["contain", "cover", "crop"]),
  w: z.number().optional(),
  h: z.number().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
});

export const inputImageNodeSchema = inputBaseNodeSchema.extend({
  type: z.literal("image"),
  src: z.string(),
  sizing: inputImageSizingSchema.optional(),
  shadow: shadowStyleSchema.optional(),
});

export const inputTableNodeSchema = inputBaseNodeSchema.extend({
  type: z.literal("table"),
  columns: z.array(tableColumnSchema),
  rows: z.array(tableRowSchema),
  defaultRowHeight: z.number().optional(),
});

export const inputShapeNodeSchema = inputBaseNodeSchema.extend({
  type: z.literal("shape"),
  shapeType: shapeTypeSchema,
  text: z.string().optional(),
  fill: fillStyleSchema.optional(),
  line: borderStyleSchema.optional(),
  shadow: shadowStyleSchema.optional(),
  fontPx: z.number().optional(),
  color: z.string().optional(),
  alignText: z.enum(["left", "center", "right"]).optional(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: underlineSchema.optional(),
  strike: z.boolean().optional(),
  highlight: z.string().optional(),
});

export const inputChartNodeSchema = inputBaseNodeSchema.extend({
  type: z.literal("chart"),
  chartType: chartTypeSchema,
  data: z.array(chartDataSchema),
  showLegend: z.boolean().optional(),
  showTitle: z.boolean().optional(),
  title: z.string().optional(),
  chartColors: z.array(z.string()).optional(),
  // radar専用オプション
  radarStyle: radarStyleSchema.optional(),
});

export const inputTimelineNodeSchema = inputBaseNodeSchema.extend({
  type: z.literal("timeline"),
  direction: timelineDirectionSchema.optional(),
  items: z.array(timelineItemSchema),
});

export const inputMatrixNodeSchema = inputBaseNodeSchema.extend({
  type: z.literal("matrix"),
  axes: matrixAxisSchema,
  quadrants: matrixQuadrantsSchema.optional(),
  items: z.array(matrixItemSchema),
});

const inputTreeDataItemSchema: z.ZodType<TreeDataItem> = z.lazy(() =>
  z.object({
    label: z.string(),
    color: z.string().optional(),
    children: z.array(inputTreeDataItemSchema).optional(),
  }),
);

export const inputTreeNodeSchema = inputBaseNodeSchema.extend({
  type: z.literal("tree"),
  layout: treeLayoutSchema.optional(),
  nodeShape: treeNodeShapeSchema.optional(),
  data: inputTreeDataItemSchema,
  connectorStyle: treeConnectorStyleSchema.optional(),
  nodeWidth: z.number().optional(),
  nodeHeight: z.number().optional(),
  levelGap: z.number().optional(),
  siblingGap: z.number().optional(),
});

export const inputFlowNodeSchema = inputBaseNodeSchema.extend({
  type: z.literal("flow"),
  direction: flowDirectionSchema.optional(),
  nodes: z.array(flowNodeItemSchema),
  connections: z.array(flowConnectionSchema),
  connectorStyle: flowConnectorStyleSchema.optional(),
  nodeWidth: z.number().optional(),
  nodeHeight: z.number().optional(),
  nodeGap: z.number().optional(),
});

export const inputProcessArrowNodeSchema = inputBaseNodeSchema.extend({
  type: z.literal("processArrow"),
  direction: processArrowDirectionSchema.optional(),
  steps: z.array(processArrowStepSchema),
  itemWidth: z.number().optional(),
  itemHeight: z.number().optional(),
  gap: z.number().optional(),
  fontPx: z.number().optional(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: underlineSchema.optional(),
  strike: z.boolean().optional(),
  highlight: z.string().optional(),
});

export const inputLineNodeSchema = inputBaseNodeSchema.extend({
  type: z.literal("line"),
  x1: z.number(),
  y1: z.number(),
  x2: z.number(),
  y2: z.number(),
  color: z.string().optional(),
  lineWidth: z.number().optional(),
  dashType: borderDashSchema.optional(),
  beginArrow: lineArrowSchema.optional(),
  endArrow: lineArrowSchema.optional(),
});

type InputTextNode = z.infer<typeof inputTextNodeSchema>;
type InputImageNode = z.infer<typeof inputImageNodeSchema>;
type InputTableNode = z.infer<typeof inputTableNodeSchema>;
type InputShapeNode = z.infer<typeof inputShapeNodeSchema>;
type InputChartNode = z.infer<typeof inputChartNodeSchema>;
type InputTimelineNode = z.infer<typeof inputTimelineNodeSchema>;
type InputMatrixNode = z.infer<typeof inputMatrixNodeSchema>;
type InputTreeNode = z.infer<typeof inputTreeNodeSchema>;
type InputFlowNode = z.infer<typeof inputFlowNodeSchema>;
type InputProcessArrowNode = z.infer<typeof inputProcessArrowNodeSchema>;
type InputLineNode = z.infer<typeof inputLineNodeSchema>;

// ===== Recursive Types =====
type InputBoxNode = InputBaseNode & {
  type: "box";
  children: InputPOMNode;
  shadow?: ShadowStyle;
};

type InputVStackNode = InputBaseNode & {
  type: "vstack";
  children: InputPOMNode[];
  gap?: number;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
};

type InputHStackNode = InputBaseNode & {
  type: "hstack";
  children: InputPOMNode[];
  gap?: number;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
};

// Layer の子要素は x, y を必須とする
type InputLayerChild = InputPOMNode & {
  x: number;
  y: number;
};

type InputLayerNode = InputBaseNode & {
  type: "layer";
  children: InputLayerChild[];
};

type InputPOMNode =
  | InputTextNode
  | InputImageNode
  | InputTableNode
  | InputBoxNode
  | InputVStackNode
  | InputHStackNode
  | InputShapeNode
  | InputChartNode
  | InputTimelineNode
  | InputMatrixNode
  | InputTreeNode
  | InputFlowNode
  | InputProcessArrowNode
  | InputLineNode
  | InputLayerNode;

// ===== Recursive Node Schemas =====
const inputBoxNodeSchemaBase = inputBaseNodeSchema.extend({
  type: z.literal("box"),
  children: z.lazy(() => inputPomNodeSchema),
  shadow: shadowStyleSchema.optional(),
});

const inputVStackNodeSchemaBase = inputBaseNodeSchema.extend({
  type: z.literal("vstack"),
  children: z.array(z.lazy(() => inputPomNodeSchema)),
  gap: z.number().optional(),
  alignItems: alignItemsSchema.optional(),
  justifyContent: justifyContentSchema.optional(),
});

const inputHStackNodeSchemaBase = inputBaseNodeSchema.extend({
  type: z.literal("hstack"),
  children: z.array(z.lazy(() => inputPomNodeSchema)),
  gap: z.number().optional(),
  alignItems: alignItemsSchema.optional(),
  justifyContent: justifyContentSchema.optional(),
});

const inputLayerChildSchemaBase = z.lazy(() =>
  inputPomNodeSchema.and(
    z.object({
      x: z.number(),
      y: z.number(),
    }),
  ),
);

const inputLayerNodeSchemaBase = inputBaseNodeSchema.extend({
  type: z.literal("layer"),
  children: z.array(inputLayerChildSchemaBase),
});

/** Input schema for POM nodes (used internally by parseXml) */
const inputPomNodeSchema: z.ZodType<InputPOMNode> = z.lazy(() =>
  z.discriminatedUnion("type", [
    inputTextNodeSchema,
    inputImageNodeSchema,
    inputTableNodeSchema,
    inputBoxNodeSchemaBase,
    inputVStackNodeSchemaBase,
    inputHStackNodeSchemaBase,
    inputShapeNodeSchema,
    inputChartNodeSchema,
    inputTimelineNodeSchema,
    inputMatrixNodeSchema,
    inputTreeNodeSchema,
    inputFlowNodeSchema,
    inputProcessArrowNodeSchema,
    inputLineNodeSchema,
    inputLayerNodeSchemaBase,
  ]),
) as z.ZodType<InputPOMNode>;
