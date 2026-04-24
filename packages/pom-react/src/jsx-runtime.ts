// カスタム JSX ファクトリではなく react-reconciler を使わない理由:
// jsxImportSource を "@miyabi/pom-react" にすることで、react 依存なしに
// JSX → POMElement 変換が完結する。react をバンドルしたくないユーザー向けの
// ライトウェイト API として維持している。
import type { POMElement, POMFC } from "./types.ts";
import { POM_TAG } from "./pom-tag.ts";

export type { POMElement };

// @hirokisakabe/pom の XML スキーマで text 属性が必須の要素。
// intrinsic element の文字列 children をそのまま渡すと XML バリデーションエラーになるため
// jsx ファクトリの段階で text prop に昇格する。
const TEXT_CONTENT_TAGS = new Set(["Text", "Shape"]);

export function jsx(
  type: string | POMFC,
  props: Record<string, unknown>,
  _key?: string,
): POMElement {
  const { children: rawChildren, ...rest } = props;

  if (typeof type === "function") {
    const stringText = extractStringChildren(rawChildren);
    const tag = (type as Record<symbol, string | undefined>)[POM_TAG] ?? "";
    if (stringText !== null && TEXT_CONTENT_TAGS.has(tag)) {
      return type({ ...rest, text: stringText, children: [] }) ?? createEmptyFragment();
    }
    const children = normalizeChildren(rawChildren);
    return type({ ...rest, children }) ?? createEmptyFragment();
  }

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

// "Fragment" 文字列定数にする理由:
// React の Symbol(react.fragment) を使わないことで react への依存を排除できる。
// renderer.ts でタグ文字列比較で Fragment を識別しており、一貫性がある。
export const Fragment = "Fragment";

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
  // 文字列は呼び出し元で text prop に昇格済みのため children としては無視する
  if (typeof raw === "string") return [];
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
