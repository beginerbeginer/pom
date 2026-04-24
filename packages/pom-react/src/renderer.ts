import { Fragment } from "./jsx-runtime.ts";
import type { POMElement } from "./types.ts";

export type SerializableNode = {
  tag: string;
  props: Record<string, unknown>;
  children: SerializableNode[];
};

export function renderToPOMNodes(element: POMElement): SerializableNode[] {
  if (element.tag === Fragment) {
    return element.children.flatMap((child) => renderToPOMNodes(child));
  }
  return [elementToSerializable(element)];
}

function elementToSerializable(element: POMElement): SerializableNode {
  const { tag, props, children } = element;

  validateTag(tag);

  const resolvedChildren = children.flatMap((c) => renderToPOMNodes(c));

  return { tag, props, children: resolvedChildren };
}

// @hirokisakabe/pom の parseXml.ts:TAG_TO_TYPE と対応させる。
// upstream の型定義がエクスポートされていないため手元で維持する。
// upstream に TAG_TO_TYPE の変更があった場合はここも更新が必要。
const VALID_TAGS = new Set([
  "Text",
  "Image",
  "Table",
  "Shape",
  "Chart",
  "Timeline",
  "Matrix",
  "Tree",
  "Flow",
  "ProcessArrow",
  "Pyramid",
  "Ul",
  "Ol",
  "Line",
  "VStack",
  "HStack",
  "Layer",
  "Icon",
  "Svg",
]);

function validateTag(tag: string): void {
  if (!VALID_TAGS.has(tag)) {
    throw new Error(
      `Unknown POM component: <${tag}>. ` +
        `Valid components: ${[...VALID_TAGS].join(", ")}`,
    );
  }
}
