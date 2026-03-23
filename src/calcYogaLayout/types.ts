import type { Node as YogaNode } from "yoga-layout";
import type { POMNode } from "../types.ts";

/** POMNode と対応する YogaNode のマッピング。レイアウト計算フェーズでのみ存在する */
export type YogaNodeMap = Map<POMNode, YogaNode>;
