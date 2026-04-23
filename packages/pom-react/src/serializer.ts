/**
 * SerializableNode[] → XML文字列シリアライザ。
 *
 * buildPptx() は XML文字列を受け取るため、ノードツリーを一度XMLに変換してから渡す。
 * これにより @hirokisakabe/pom の内部型に依存せず、公開APIだけを使える。
 *
 * 変換ルール:
 * - プリミティブ値 (string / number / boolean) → XML属性として直接出力
 * - オブジェクト / 配列 → JSON.stringify してXML属性値に格納
 * - children → 再帰的にネストした子要素として出力
 */
import type { SerializableNode } from "./renderer.ts";

export function serializeToXml(nodes: SerializableNode[]): string {
  return nodes.map(serializeNode).join("\n");
}

function serializeNode(node: SerializableNode): string {
  const { tag, props, children } = node;

  const attrStr = Object.entries(props)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${k}="${serializeAttrValue(v)}"`)
    .join(" ");

  if (children.length > 0) {
    const childStr = children.map(serializeNode).join("\n");
    const open = attrStr ? `<${tag} ${attrStr}>` : `<${tag}>`;
    return `${open}\n${childStr}\n</${tag}>`;
  }

  return attrStr ? `<${tag} ${attrStr} />` : `<${tag} />`;
}

function serializeAttrValue(value: unknown): string {
  if (typeof value === "string") {
    return escapeXml(value);
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  // オブジェクト・配列はJSON文字列としてエンコード
  return escapeXml(JSON.stringify(value));
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
