import type { POMNode } from "../types.ts";
import { calcYogaLayout } from "../calcYogaLayout/calcYogaLayout.ts";
import { freeYogaTree } from "./freeYogaTree.ts";
import { reduceTableRowHeight } from "./strategies/reduceTableRowHeight.ts";
import { reduceFontSize } from "./strategies/reduceFontSize.ts";
import { reduceGapAndPadding } from "./strategies/reduceGapAndPadding.ts";
import { uniformScale } from "./strategies/uniformScale.ts";

/** オーバーフロー判定の許容マージン（0.5%） */
const OVERFLOW_TOLERANCE = 1.005;

/** 高さ制約なしでレイアウトする際の仮の高さ上限 */
const UNCONSTRAINED_HEIGHT = 100000;

type Strategy = (node: POMNode, targetRatio: number) => boolean;

const strategies: Strategy[] = [
  reduceTableRowHeight,
  reduceFontSize,
  reduceGapAndPadding,
  uniformScale,
];

/**
 * 高さ制約なしでレイアウト計算し、コンテンツの自然な高さを取得する。
 */
async function measureNaturalHeight(
  node: POMNode,
  slideWidth: number,
): Promise<number> {
  await calcYogaLayout(node, { w: slideWidth, h: UNCONSTRAINED_HEIGHT });
  return node.yogaNode.getComputedHeight();
}

/**
 * スライドのオーバーフローを検出し、段階的に調整してスライド内に収める。
 *
 * 調整の優先順:
 * 1. テーブル行高さ縮小
 * 2. フォントサイズ縮小
 * 3. gap/padding 縮小
 * 4. 全体スケーリング（フォールバック）
 */
export async function autoFitSlide(
  node: POMNode,
  slideSize: { w: number; h: number },
): Promise<void> {
  for (const strategy of strategies) {
    freeYogaTree(node);
    const naturalHeight = await measureNaturalHeight(node, slideSize.w);

    if (naturalHeight <= slideSize.h * OVERFLOW_TOLERANCE) {
      break;
    }

    const ratio = slideSize.h / naturalHeight;
    const changed = strategy(node, ratio);

    if (!changed) {
      continue;
    }
  }

  // 最終的にオーバーフローが解消されたか確認
  freeYogaTree(node);
  const finalHeight = await measureNaturalHeight(node, slideSize.w);
  if (finalHeight > slideSize.h * OVERFLOW_TOLERANCE) {
    console.warn(
      `[pom] autoFit: content height (${Math.round(finalHeight)}px) exceeds slide height (${slideSize.h}px) after all adjustments.`,
    );
  }

  // 最終レイアウト（正しい slideSize で）
  freeYogaTree(node);
  await calcYogaLayout(node, slideSize);
}
