import type { POMNode } from "../types.ts";
import { walkPOMTree } from "./walkTree.ts";

/**
 * POMNode ツリー内の全 yogaNode を解放し、参照をクリアする。
 * calcYogaLayout を再実行する前に呼び出すこと。
 */
export function freeYogaTree(node: POMNode): void {
  // 子から先に解放する（yoga-layout は親が子を参照しているため）
  const nodes: POMNode[] = [];
  walkPOMTree(node, (n) => nodes.push(n));

  // 逆順（リーフから）で解放
  for (let i = nodes.length - 1; i >= 0; i--) {
    const n = nodes[i];
    if (n.yogaNode) {
      // 親から切り離してから解放
      const owner = n.yogaNode.getParent();
      if (owner) {
        const childCount = owner.getChildCount();
        for (let j = 0; j < childCount; j++) {
          if (owner.getChild(j) === n.yogaNode) {
            owner.removeChild(n.yogaNode);
            break;
          }
        }
      }
      n.yogaNode.free();
      n.yogaNode = undefined;
    }
  }
}
