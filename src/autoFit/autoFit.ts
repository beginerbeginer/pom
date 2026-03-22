import type { POMNode } from "../types.ts";
import type { BuildContext } from "../buildContext.ts";
import { calcYogaLayout } from "../calcYogaLayout/calcYogaLayout.ts";
import { freeYogaTree } from "../shared/freeYogaTree.ts";
import { reduceTableRowHeight } from "./strategies/reduceTableRowHeight.ts";
import { reduceFontSize } from "./strategies/reduceFontSize.ts";
import { reduceGapAndPadding } from "./strategies/reduceGapAndPadding.ts";
import { uniformScale } from "./strategies/uniformScale.ts";

/** オーバーフロー判定の許容マージン（0.5%） */
const OVERFLOW_TOLERANCE = 1.005;

type Strategy = (node: POMNode, targetRatio: number) => boolean;

const strategies: Strategy[] = [
  reduceTableRowHeight,
  reduceFontSize,
  reduceGapAndPadding,
  uniformScale,
];

/**
 * 通常の slideSize でレイアウト計算し、コンテンツの占有高さを取得する。
 *
 * ルートの yogaNode の子要素の (top + height) の最大値を計算し、
 * ルートの padding.bottom を加算してコンテンツの占有高さとする。
 * h="max" や flexGrow の影響を受けず、正確なコンテンツ高さを返す。
 */
async function measureContentHeight(
  node: POMNode,
  slideSize: { w: number; h: number },
  ctx: BuildContext,
): Promise<number> {
  await calcYogaLayout(node, slideSize, ctx);
  const rootYoga = node.yogaNode;

  const childCount = rootYoga.getChildCount();
  if (childCount === 0) {
    return rootYoga.getComputedHeight();
  }

  let maxBottom = 0;
  for (let i = 0; i < childCount; i++) {
    const child = rootYoga.getChild(i);
    const childLayout = child.getComputedLayout();
    const bottom = childLayout.top + childLayout.height;
    if (bottom > maxBottom) {
      maxBottom = bottom;
    }
  }

  // ルートの paddingBottom を加算
  const paddingBottom = rootYoga.getComputedPadding(2); // EDGE_BOTTOM = 2
  return maxBottom + paddingBottom;
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
  ctx: BuildContext,
): Promise<void> {
  for (const strategy of strategies) {
    freeYogaTree(node);
    const contentHeight = await measureContentHeight(node, slideSize, ctx);

    if (contentHeight <= slideSize.h * OVERFLOW_TOLERANCE) {
      break;
    }

    const ratio = slideSize.h / contentHeight;
    const changed = strategy(node, ratio);

    if (!changed) {
      continue;
    }
  }

  // 最終的にオーバーフローが解消されたか確認
  freeYogaTree(node);
  const finalHeight = await measureContentHeight(node, slideSize, ctx);
  if (finalHeight > slideSize.h * OVERFLOW_TOLERANCE) {
    console.warn(
      `[pom] autoFit: content height (${Math.round(finalHeight)}px) exceeds slide height (${slideSize.h}px) after all adjustments.`,
    );
  }

  // 最終レイアウト（正しい slideSize で）
  freeYogaTree(node);
  await calcYogaLayout(node, slideSize, ctx);
}
