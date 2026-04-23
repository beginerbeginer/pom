/**
 * カスタムJSXランタイム。
 * TypeScriptのjsxImportSourceを "@miyabi/pom-react" に設定すると
 * コンパイラがこのファイルを自動的に使用する。
 *
 * React.createElementの代わりにPOMElementを返すことで、
 * react-reconcilerなしにJSX→POMNode変換を実現する。
 */
import type { POMElement, POMFC } from "./types.ts";

export type { POMElement };

/**
 * テキスト系ノード（<Text>, <Shape>）は文字列の子要素を text prop に昇格する。
 *   <Text fontSize={28}>Hello</Text>  →  text="Hello"
 * これにより XML の内側テキスト記法と同じ感覚で書ける。
 */
const TEXT_CONTENT_TAGS = new Set(["Text", "Shape"]);

export function jsx(
  type: string | POMFC,
  props: Record<string, unknown>,
  _key?: string,
): POMElement {
  const { children: rawChildren, ...rest } = props;

  if (typeof type === "function") {
    // 文字列 children を text prop に昇格してから関数コンポーネントに渡す
    const stringText = extractStringChildren(rawChildren);
    const tag = (type as { pomTag?: string }).pomTag ?? "";
    if (stringText !== null && TEXT_CONTENT_TAGS.has(tag)) {
      return type({ ...rest, text: stringText, children: [] }) ?? createEmptyFragment();
    }
    const children = normalizeChildren(rawChildren);
    return type({ ...rest, children }) ?? createEmptyFragment();
  }

  // 文字列 children を text prop に昇格（Text, Shape のみ）
  const stringText = extractStringChildren(rawChildren);
  if (stringText !== null && TEXT_CONTENT_TAGS.has(type)) {
    return { tag: type, props: { ...rest, text: stringText }, children: [] };
  }

  const children = normalizeChildren(rawChildren);
  return { tag: type, props: rest, children };
}

export function jsxs(
  type: string | POMFC,
  props: Record<string, unknown>,
  key?: string,
): POMElement {
  return jsx(type, props, key);
}

export function jsxDEV(
  type: string | POMFC,
  props: Record<string, unknown>,
  key?: string,
): POMElement {
  return jsx(type, props, key);
}

/** Fragmentは子要素をそのまま返す仮想ノード */
export const Fragment = "Fragment";

/**
 * children が純粋な文字列（または文字列のみの配列）なら結合して返す。
 * POMElement が混在する場合は null を返し、通常の children 処理に委譲する。
 */
function extractStringChildren(raw: unknown): string | null {
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw)) {
    if (raw.every((c) => typeof c === "string")) {
      return (raw as string[]).join("");
    }
  }
  return null;
}

function normalizeChildren(raw: unknown): POMElement[] {
  if (raw === null || raw === undefined || raw === false) return [];
  if (typeof raw === "string") return []; // 文字列はtext propで処理済み
  if (Array.isArray(raw)) {
    return raw.flatMap((c) => normalizeChildren(c));
  }
  if (isPOMElement(raw)) return [raw];
  return [];
}

function isPOMElement(value: unknown): value is POMElement {
  return (
    typeof value === "object" &&
    value !== null &&
    "tag" in value &&
    "props" in value &&
    "children" in value
  );
}

function createEmptyFragment(): POMElement {
  return { tag: Fragment, props: {}, children: [] };
}
