import type { YogaNodeMap } from "../calcYogaLayout/types.ts";

/**
 * YogaNodeMap 内の全 YogaNode を解放する。
 * calcYogaLayout を再実行する前に呼び出すこと。
 */
export function freeYogaTree(map: YogaNodeMap): void {
  // Map の insertion order は親→子なので、逆順（リーフから）で解放する
  const yogaNodes = Array.from(map.values());

  for (let i = yogaNodes.length - 1; i >= 0; i--) {
    const yn = yogaNodes[i];
    // 親から切り離してから解放
    const owner = yn.getParent();
    if (owner) {
      const childCount = owner.getChildCount();
      for (let j = 0; j < childCount; j++) {
        if (owner.getChild(j) === yn) {
          owner.removeChild(yn);
          break;
        }
      }
    }
    yn.free();
  }

  map.clear();
}
