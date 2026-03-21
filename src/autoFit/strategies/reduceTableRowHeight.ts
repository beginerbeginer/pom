import type { POMNode } from "../../types.ts";
import { walkPOMTree } from "../walkTree.ts";

const MIN_ROW_HEIGHT = 20;
const MIN_SCALE = 0.5;

/**
 * テーブルの defaultRowHeight と各行の height を縮小する。
 * @returns 変更があった場合 true
 */
export function reduceTableRowHeight(
  node: POMNode,
  targetRatio: number,
): boolean {
  const ratio = Math.max(targetRatio, MIN_SCALE);
  let changed = false;

  walkPOMTree(node, (n) => {
    if (n.type !== "table") return;

    if (n.defaultRowHeight !== undefined) {
      const newHeight = Math.max(
        MIN_ROW_HEIGHT,
        Math.round(n.defaultRowHeight * ratio),
      );
      if (newHeight !== n.defaultRowHeight) {
        n.defaultRowHeight = newHeight;
        changed = true;
      }
    }

    for (const row of n.rows) {
      if (row.height !== undefined) {
        const newHeight = Math.max(
          MIN_ROW_HEIGHT,
          Math.round(row.height * ratio),
        );
        if (newHeight !== row.height) {
          row.height = newHeight;
          changed = true;
        }
      }
    }
  });

  return changed;
}
