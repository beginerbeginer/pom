import type { POMNode, PositionedNode } from "../types.ts";
import type { Node as YogaNode } from "yoga-layout";
import type { RenderContext } from "../renderPptx/types.ts";
import type { loadYoga } from "yoga-layout/load";
import type { BuildContext } from "../buildContext.ts";

export type Yoga = Awaited<ReturnType<typeof loadYoga>>;

/** ノードのカテゴリ。子要素の扱い方を決定する */
export type NodeCategory =
  | "leaf" // 子要素なし
  | "single-child" // 子要素1つ（box）
  | "multi-child" // 子要素複数（vstack, hstack）
  | "absolute-child"; // 子要素複数・絶対配置（layer）

export interface NodeDefinition {
  /** ノードタイプ名 */
  type: POMNode["type"];

  /** ノードカテゴリ */
  category: NodeCategory;

  /** YogaNode にノード固有のスタイル/measureFunc を適用する */
  applyYogaStyle?: (
    node: POMNode,
    yn: YogaNode,
    yoga: Yoga,
    ctx: BuildContext,
  ) => void | Promise<void>;

  /** POMNode → PositionedNode へのカスタム変換（未定義なら category ベースのデフォルト） */
  toPositioned?: (
    pom: POMNode,
    absoluteX: number,
    absoluteY: number,
    layout: { width: number; height: number },
    ctx: BuildContext,
  ) => PositionedNode;

  /** PositionedNode をスライドにレンダリングする（リーフノード用） */
  render?: (node: PositionedNode, ctx: RenderContext) => void;

  /** 画像ソース収集（prefetch 用） */
  collectImageSources?: (node: POMNode) => string[];
}
