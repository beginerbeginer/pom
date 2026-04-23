/**
 * POMElement[] → シリアライズ可能なノードオブジェクトへの変換。
 *
 * JSXファクトリが作ったPOMElementツリーを、
 * serializeToXml() が処理できる形式に変換する。
 * タグ名はXMLと同じPascalCaseを使用（VStack, HStack, Text...）。
 */
import { Fragment } from "./jsx-runtime.ts";
import type { POMElement } from "./types.ts";

export type SerializableNode = {
  tag: string;
  props: Record<string, unknown>;
  children: SerializableNode[];
};

/** JSXルート要素（単一スライドまたはFragment）をSerializableNodeの配列に変換 */
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

/**
 * JSXタグ名の検証。
 * @hirokisakabe/pom の parseXml/parseXml.ts:TAG_TO_TYPE と対応させる。
 */
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
