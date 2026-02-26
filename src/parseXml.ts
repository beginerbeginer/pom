import { XMLParser } from "fast-xml-parser";
import { z } from "zod";
import type { POMNode } from "./types.ts";
import {
  inputTextNodeSchema,
  inputImageNodeSchema,
  inputTableNodeSchema,
  inputShapeNodeSchema,
  inputChartNodeSchema,
  inputTimelineNodeSchema,
  inputMatrixNodeSchema,
  inputTreeNodeSchema,
  inputFlowNodeSchema,
  inputProcessArrowNodeSchema,
  inputLineNodeSchema,
  inputBaseNodeSchema,
} from "./inputSchema.ts";
import {
  alignItemsSchema,
  justifyContentSchema,
  shadowStyleSchema,
  processArrowStepSchema,
  timelineItemSchema,
  matrixAxisSchema,
  matrixQuadrantsSchema,
  matrixItemSchema,
  flowNodeItemSchema,
  flowConnectionSchema,
  chartDataSchema,
  tableColumnSchema,
  tableCellSchema,
} from "./types.ts";

// ===== Tag name → POM node type mapping =====
const TAG_TO_TYPE: Record<string, string> = {
  Text: "text",
  Image: "image",
  Table: "table",
  Shape: "shape",
  Chart: "chart",
  Timeline: "timeline",
  Matrix: "matrix",
  Tree: "tree",
  Flow: "flow",
  ProcessArrow: "processArrow",
  Line: "line",
  Box: "box",
  VStack: "vstack",
  HStack: "hstack",
  Layer: "layer",
};

// ===== Node schemas for property type coercion =====
// Extract shape from ZodObject schemas for property type lookup.
// Use Record<string, z.ZodTypeAny> directly to avoid Zod v4 type issues.
type ShapeRecord = Record<string, z.ZodTypeAny>;

function extractShape(schema: z.ZodTypeAny): ShapeRecord {
  return (schema as unknown as { shape: ShapeRecord }).shape;
}

const leafNodeShapes: Record<string, ShapeRecord> = {
  text: extractShape(inputTextNodeSchema),
  image: extractShape(inputImageNodeSchema),
  table: extractShape(inputTableNodeSchema),
  shape: extractShape(inputShapeNodeSchema),
  chart: extractShape(inputChartNodeSchema),
  timeline: extractShape(inputTimelineNodeSchema),
  matrix: extractShape(inputMatrixNodeSchema),
  tree: extractShape(inputTreeNodeSchema),
  flow: extractShape(inputFlowNodeSchema),
  processArrow: extractShape(inputProcessArrowNodeSchema),
  line: extractShape(inputLineNodeSchema),
};

const containerShapes: Record<string, ShapeRecord> = {
  box: extractShape(
    inputBaseNodeSchema.extend({ shadow: shadowStyleSchema.optional() }),
  ),
  vstack: extractShape(
    inputBaseNodeSchema.extend({
      gap: z.number().optional(),
      alignItems: alignItemsSchema.optional(),
      justifyContent: justifyContentSchema.optional(),
    }),
  ),
  hstack: extractShape(
    inputBaseNodeSchema.extend({
      gap: z.number().optional(),
      alignItems: alignItemsSchema.optional(),
      justifyContent: justifyContentSchema.optional(),
    }),
  ),
  layer: extractShape(inputBaseNodeSchema),
};

const CONTAINER_TYPES = new Set(["box", "vstack", "hstack", "layer"]);
const TEXT_CONTENT_NODES = new Set(["text", "shape"]);

// ===== Types for XML parser output (preserveOrder mode) =====
type XmlNode = XmlElement | XmlTextNode;
type XmlTextNode = { "#text": string };
interface XmlElement {
  [tagName: string]: XmlNode[] | Record<string, string>;
  ":@"?: Record<string, string>;
}

// ===== Zod schema introspection (Zod v4 compatible) =====
// Zod internal _def structure varies by version. Access via unknown to avoid type errors.
type ZodDef = Record<string, unknown>;

function getDef(schema: z.ZodTypeAny): ZodDef {
  return schema._def as unknown as ZodDef;
}

function getPropertySchema(
  nodeType: string,
  propertyName: string,
): z.ZodTypeAny | undefined {
  const shape = leafNodeShapes[nodeType] ?? containerShapes[nodeType];
  if (!shape) return undefined;
  return shape[propertyName];
}

function getZodType(schema: z.ZodTypeAny): string {
  const def = getDef(schema);
  return (def.type ?? def.typeName ?? "") as string;
}

function unwrapSchema(schema: z.ZodTypeAny): z.ZodTypeAny {
  const typeName = getZodType(schema);
  const def = getDef(schema);
  switch (typeName) {
    case "optional":
    case "default":
    case "nullable":
      return unwrapSchema(def.innerType as z.ZodTypeAny);
    case "lazy":
      return unwrapSchema((def.getter as () => z.ZodTypeAny)());
    case "pipe":
      return unwrapSchema(def.in as z.ZodTypeAny);
    default:
      return schema;
  }
}

function resolveZodTypeName(schema: z.ZodTypeAny): string {
  return getZodType(unwrapSchema(schema));
}

// ===== Value coercion =====
function coerceValue(value: string, schema: z.ZodTypeAny): unknown {
  const unwrapped = unwrapSchema(schema);
  const typeName = getZodType(unwrapped);
  const def = getDef(unwrapped);

  switch (typeName) {
    case "number": {
      const num = Number(value);
      if (isNaN(num)) {
        throw new Error(`Cannot convert "${value}" to number`);
      }
      return num;
    }
    case "boolean":
      if (value !== "true" && value !== "false") {
        throw new Error(
          `Cannot convert "${value}" to boolean (expected "true" or "false")`,
        );
      }
      return value === "true";
    case "string":
    case "enum":
      return value;
    case "literal": {
      const values = def.values as unknown[] | undefined;
      const singleValue = def.value;
      return values?.[0] ?? singleValue;
    }
    case "array":
    case "object":
    case "record":
    case "tuple":
      return JSON.parse(value);
    case "union": {
      const options = def.options as z.ZodTypeAny[];
      return coerceUnionValue(value, options);
    }
    default:
      return coerceFallback(value);
  }
}

function coerceUnionValue(value: string, options: z.ZodTypeAny[]): unknown {
  const typeNames = options.map((opt) => resolveZodTypeName(opt));

  // Try boolean
  if (
    (value === "true" || value === "false") &&
    typeNames.includes("boolean")
  ) {
    return value === "true";
  }

  // Try number
  if (typeNames.includes("number")) {
    const num = Number(value);
    if (!isNaN(num) && value !== "") {
      return num;
    }
  }

  // Try literal
  for (let i = 0; i < options.length; i++) {
    if (typeNames[i] === "literal") {
      const unwrapped = unwrapSchema(options[i]);
      const def = getDef(unwrapped);
      const values = def.values as unknown[] | undefined;
      const singleValue = def.value;
      const litVal = values?.[0] ?? singleValue;
      if (litVal != null && `${litVal as string | number}` === value)
        return litVal;
    }
  }

  // Try JSON parse for objects/arrays
  if (
    typeNames.some((t) => ["array", "object", "record", "tuple"].includes(t))
  ) {
    if (value.startsWith("{") || value.startsWith("[")) {
      try {
        return JSON.parse(value);
      } catch {
        /* ignore */
      }
    }
  }

  // Fallback to string
  return value;
}

function coerceFallback(value: string): unknown {
  if (value === "true") return true;
  if (value === "false") return false;
  const num = Number(value);
  if (value !== "" && !isNaN(num)) return num;
  if (value.startsWith("{") || value.startsWith("[")) {
    try {
      return JSON.parse(value);
    } catch {
      /* ignore */
    }
  }
  return value;
}

// ===== XML node helpers =====
function isTextNode(node: XmlNode): node is XmlTextNode {
  return "#text" in node;
}

function getTagName(node: XmlElement): string {
  for (const key of Object.keys(node)) {
    if (key !== ":@") return key;
  }
  throw new Error("No tag name found in XML element");
}

function getAttributes(node: XmlElement): Record<string, string> {
  const attrs: Record<string, string> = {};
  const rawAttrs = node[":@"];
  if (rawAttrs) {
    for (const [key, value] of Object.entries(rawAttrs)) {
      const attrName = key.startsWith("@_") ? key.slice(2) : key;
      attrs[attrName] = value;
    }
  }
  return attrs;
}

function getChildElements(node: XmlElement): XmlElement[] {
  const tagName = getTagName(node);
  const children = node[tagName] as XmlNode[] | undefined;
  if (!children) return [];
  return children.filter((child): child is XmlElement => !isTextNode(child));
}

function getTextContent(node: XmlElement): string | undefined {
  const tagName = getTagName(node);
  const children = node[tagName] as XmlNode[] | undefined;
  if (!children) return undefined;
  const textParts: string[] = [];
  for (const child of children) {
    if (isTextNode(child)) {
      textParts.push(child["#text"]);
    }
  }
  return textParts.length > 0 ? textParts.join("") : undefined;
}

// ===== Child element schemas for type coercion =====
const childElementShapes: Record<string, ShapeRecord> = {
  Step: extractShape(processArrowStepSchema),
  TimelineItem: extractShape(timelineItemSchema),
  Axes: extractShape(matrixAxisSchema),
  Quadrants: extractShape(matrixQuadrantsSchema),
  MatrixItem: extractShape(matrixItemSchema),
  FlowNode: extractShape(flowNodeItemSchema),
  Connection: extractShape(flowConnectionSchema),
  Column: extractShape(tableColumnSchema),
  Cell: extractShape(tableCellSchema),
};

function coerceChildAttrs(
  tagName: string,
  attrs: Record<string, string>,
): Record<string, unknown> {
  const shape = childElementShapes[tagName];
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(attrs)) {
    if (shape && shape[key]) {
      result[key] = coerceValue(value, shape[key]);
    } else {
      result[key] = coerceFallback(value);
    }
  }
  return result;
}

// ===== Child element converters =====
type ChildElementConverter = (
  childElements: XmlElement[],
  result: Record<string, unknown>,
) => void;

function convertProcessArrowChildren(
  childElements: XmlElement[],
  result: Record<string, unknown>,
): void {
  const steps: Record<string, unknown>[] = [];
  for (const child of childElements) {
    const tag = getTagName(child);
    if (tag !== "Step") {
      throw new Error(
        `Unknown child element <${tag}> inside <ProcessArrow>. Expected: <Step>`,
      );
    }
    steps.push(coerceChildAttrs(tag, getAttributes(child)));
  }
  result.steps = steps;
}

function convertTimelineChildren(
  childElements: XmlElement[],
  result: Record<string, unknown>,
): void {
  const items: Record<string, unknown>[] = [];
  for (const child of childElements) {
    const tag = getTagName(child);
    if (tag !== "TimelineItem") {
      throw new Error(
        `Unknown child element <${tag}> inside <Timeline>. Expected: <TimelineItem>`,
      );
    }
    items.push(coerceChildAttrs(tag, getAttributes(child)));
  }
  result.items = items;
}

function convertMatrixChildren(
  childElements: XmlElement[],
  result: Record<string, unknown>,
): void {
  const items: Record<string, unknown>[] = [];
  for (const child of childElements) {
    const tag = getTagName(child);
    switch (tag) {
      case "Axes":
        result.axes = coerceChildAttrs(tag, getAttributes(child));
        break;
      case "Quadrants":
        result.quadrants = coerceChildAttrs(tag, getAttributes(child));
        break;
      case "MatrixItem":
        items.push(coerceChildAttrs(tag, getAttributes(child)));
        break;
      default:
        throw new Error(
          `Unknown child element <${tag}> inside <Matrix>. Expected: <Axes>, <Quadrants>, or <MatrixItem>`,
        );
    }
  }
  if (items.length > 0) {
    result.items = items;
  }
}

function convertFlowChildren(
  childElements: XmlElement[],
  result: Record<string, unknown>,
): void {
  const nodes: Record<string, unknown>[] = [];
  const connections: Record<string, unknown>[] = [];
  for (const child of childElements) {
    const tag = getTagName(child);
    switch (tag) {
      case "FlowNode":
        nodes.push(coerceChildAttrs(tag, getAttributes(child)));
        break;
      case "Connection":
        connections.push(coerceChildAttrs(tag, getAttributes(child)));
        break;
      default:
        throw new Error(
          `Unknown child element <${tag}> inside <Flow>. Expected: <FlowNode> or <Connection>`,
        );
    }
  }
  if (nodes.length > 0) {
    result.nodes = nodes;
  }
  if (connections.length > 0) {
    result.connections = connections;
  }
}

function convertChartChildren(
  childElements: XmlElement[],
  result: Record<string, unknown>,
): void {
  const dataShape = extractShape(chartDataSchema);
  const data: Record<string, unknown>[] = [];
  for (const child of childElements) {
    const tag = getTagName(child);
    if (tag !== "Series") {
      throw new Error(
        `Unknown child element <${tag}> inside <Chart>. Expected: <Series>`,
      );
    }
    const attrs = getAttributes(child);
    const series: Record<string, unknown> = {
      labels: [],
      values: [],
    };
    if (attrs.name !== undefined) {
      const nameSchema = dataShape.name;
      series.name = nameSchema
        ? coerceValue(attrs.name, nameSchema)
        : attrs.name;
    }

    for (const dp of getChildElements(child)) {
      const dpTag = getTagName(dp);
      if (dpTag !== "DataPoint") {
        throw new Error(
          `Unknown child element <${dpTag}> inside <Series>. Expected: <DataPoint>`,
        );
      }
      const dpAttrs = getAttributes(dp);
      if (dpAttrs.label === undefined) {
        throw new Error('<DataPoint> requires a "label" attribute');
      }
      if (dpAttrs.value === undefined) {
        throw new Error('<DataPoint> requires a "value" attribute');
      }
      const numValue = Number(dpAttrs.value);
      if (isNaN(numValue)) {
        throw new Error(
          `Cannot convert "${dpAttrs.value}" to number in <DataPoint> "value" attribute`,
        );
      }
      (series.labels as string[]).push(dpAttrs.label);
      (series.values as number[]).push(numValue);
    }
    data.push(series);
  }
  result.data = data;
}

function convertTableChildren(
  childElements: XmlElement[],
  result: Record<string, unknown>,
): void {
  const columns: Record<string, unknown>[] = [];
  const rows: Record<string, unknown>[] = [];
  for (const child of childElements) {
    const tag = getTagName(child);
    switch (tag) {
      case "Column":
        columns.push(coerceChildAttrs(tag, getAttributes(child)));
        break;
      case "Row": {
        const rowAttrs = getAttributes(child);
        const cells: Record<string, unknown>[] = [];
        for (const cellEl of getChildElements(child)) {
          const cellTag = getTagName(cellEl);
          if (cellTag !== "Cell") {
            throw new Error(
              `Unknown child element <${cellTag}> inside <Row>. Expected: <Cell>`,
            );
          }
          const cellAttrs = coerceChildAttrs(cellTag, getAttributes(cellEl));
          const cellText = getTextContent(cellEl);
          if (cellText !== undefined && !("text" in cellAttrs)) {
            cellAttrs.text = cellText;
          }
          cells.push(cellAttrs);
        }
        const row: Record<string, unknown> = { cells };
        if (rowAttrs.height !== undefined) {
          const h = Number(rowAttrs.height);
          if (isNaN(h)) {
            throw new Error(
              `Cannot convert "${rowAttrs.height}" to number in <Row> "height" attribute`,
            );
          }
          row.height = h;
        }
        rows.push(row);
        break;
      }
      default:
        throw new Error(
          `Unknown child element <${tag}> inside <Table>. Expected: <Column> or <Row>`,
        );
    }
  }
  if (columns.length > 0) {
    result.columns = columns;
  }
  if (rows.length > 0) {
    result.rows = rows;
  }
}

function convertTreeItem(element: XmlElement): Record<string, unknown> {
  const attrs = getAttributes(element);
  if (attrs.label === undefined) {
    throw new Error('<TreeItem> requires a "label" attribute');
  }
  const item: Record<string, unknown> = { label: attrs.label };
  if (attrs.color !== undefined) {
    item.color = attrs.color;
  }
  const children = getChildElements(element);
  if (children.length > 0) {
    item.children = children.map((child) => {
      const tag = getTagName(child);
      if (tag !== "TreeItem") {
        throw new Error(
          `Unknown child element <${tag}> inside <TreeItem>. Expected: <TreeItem>`,
        );
      }
      return convertTreeItem(child);
    });
  }
  return item;
}

function convertTreeChildren(
  childElements: XmlElement[],
  result: Record<string, unknown>,
): void {
  if (childElements.length !== 1) {
    throw new Error(
      `<Tree> must have exactly 1 <TreeItem> child element, but got ${childElements.length}`,
    );
  }
  const child = childElements[0];
  const tag = getTagName(child);
  if (tag !== "TreeItem") {
    throw new Error(
      `Unknown child element <${tag}> inside <Tree>. Expected: <TreeItem>`,
    );
  }
  result.data = convertTreeItem(child);
}

const CHILD_ELEMENT_CONVERTERS: Record<string, ChildElementConverter> = {
  processArrow: convertProcessArrowChildren,
  timeline: convertTimelineChildren,
  matrix: convertMatrixChildren,
  flow: convertFlowChildren,
  chart: convertChartChildren,
  table: convertTableChildren,
  tree: convertTreeChildren,
};

// ===== Node conversion =====
function convertElement(node: XmlElement): Record<string, unknown> {
  const tagName = getTagName(node);
  const nodeType = TAG_TO_TYPE[tagName];
  const attrs = getAttributes(node);
  const childElements = getChildElements(node);
  const textContent = getTextContent(node);

  if (nodeType) {
    return convertPomNode(nodeType, attrs, childElements, textContent);
  } else {
    throw new Error(`Unknown tag: <${tagName}>`);
  }
}

function convertPomNode(
  nodeType: string,
  attrs: Record<string, string>,
  childElements: XmlElement[],
  textContent: string | undefined,
): Record<string, unknown> {
  const result: Record<string, unknown> = { type: nodeType };

  for (const [key, value] of Object.entries(attrs)) {
    if (key === "type") continue;
    const propSchema = getPropertySchema(nodeType, key);
    if (propSchema) {
      result[key] = coerceValue(value, propSchema);
    } else {
      result[key] = coerceFallback(value);
    }
  }

  // Text content → text property for nodes that support it
  if (textContent !== undefined && TEXT_CONTENT_NODES.has(nodeType)) {
    if (!("text" in result)) {
      result.text = textContent;
    }
  }

  // Child element notation for complex properties
  const childConverter = CHILD_ELEMENT_CONVERTERS[nodeType];
  if (childConverter && childElements.length > 0) {
    childConverter(childElements, result);
  }
  // Children for container nodes
  else if (CONTAINER_TYPES.has(nodeType) && childElements.length > 0) {
    const convertedChildren = childElements.map(convertElement);
    if (nodeType === "box") {
      if (childElements.length !== 1) {
        throw new Error(
          `<Box> must have exactly 1 child element, but got ${childElements.length}`,
        );
      }
      result.children = convertedChildren[0];
    } else {
      result.children = convertedChildren;
    }
  }

  return result;
}

/**
 * XML 文字列を POMNode 配列に変換する。
 *
 * XML タグは POM ノードタイプにマッピングされ、属性値は Zod スキーマを参照して
 * 適切な型（number, boolean, array, object）に変換される。
 * 未知のタグ名が指定された場合はエラーがスローされる。
 *
 * @example
 * ```typescript
 * import { parseXml, buildPptx } from "@hirokisakabe/pom";
 *
 * const xml = `
 *   <VStack gap="16" padding="32">
 *     <Text fontPx="32" bold="true">売上レポート</Text>
 *   </VStack>
 * `;
 *
 * const nodes = parseXml(xml);
 * const pptx = await buildPptx(nodes, { w: 1280, h: 720 });
 * ```
 */
export function parseXml(xmlString: string): POMNode[] {
  if (!xmlString.trim()) return [];

  const parser = new XMLParser({
    preserveOrder: true,
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    parseAttributeValue: false,
    parseTagValue: false,
    trimValues: true,
  });

  const wrappedXml = `<__root__>${xmlString}</__root__>`;
  const parsed: XmlElement[] = parser.parse(wrappedXml) as XmlElement[];

  if (!parsed || parsed.length === 0) return [];

  const rootElement = parsed[0];
  const rootChildren = (rootElement["__root__"] ?? []) as XmlNode[];

  return rootChildren
    .filter((child): child is XmlElement => !isTextNode(child))
    .map((child) => convertElement(child) as POMNode);
}
