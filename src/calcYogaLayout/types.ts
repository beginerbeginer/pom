import type { Node as YogaNode } from "yoga-layout";
import type { POMNode } from "../types.ts";

/** POMNode と対応する YogaNode のマッピング。レイアウト計算フェーズでのみ存在する */
export type YogaNodeMap = Map<POMNode, YogaNode>;

/** Yoga 計算結果の軽量表現。Yoga ランタイムへの依存なし */
export interface LayoutResult {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** POMNode と計算済みレイアウト結果のマッピング */
export type LayoutResultMap = Map<POMNode, LayoutResult>;

/** YogaNodeMap から計算済みレイアウト結果を抽出する */
export function extractLayoutResults(yogaMap: YogaNodeMap): LayoutResultMap {
  const layoutMap: LayoutResultMap = new Map();
  for (const [pomNode, yogaNode] of yogaMap) {
    const computed = yogaNode.getComputedLayout();
    layoutMap.set(pomNode, {
      left: computed.left,
      top: computed.top,
      width: computed.width,
      height: computed.height,
    });
  }
  return layoutMap;
}
