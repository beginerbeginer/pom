import type { NodeDefinition } from "../types.ts";

export const boxNodeDef: NodeDefinition = {
  type: "box",
  category: "single-child",
  // applyYogaStyle: デフォルトで十分（共通スタイルのみ）
  // render: category ベースの子要素再帰で対応
};
