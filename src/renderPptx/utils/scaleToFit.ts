const MIN_SCALE_THRESHOLD = 0.5;

/**
 * 割り当てサイズと固有サイズからスケール係数を計算する。
 *
 * - scaleFactor = min(allocatedW / intrinsicW, allocatedH / intrinsicH, 1.0)
 * - scaleFactor < MIN_SCALE_THRESHOLD の場合、閾値でクランプして console.warn
 */
export function calcScaleFactor(
  allocatedW: number,
  allocatedH: number,
  intrinsicW: number,
  intrinsicH: number,
  nodeType: string,
): number {
  if (intrinsicW <= 0 || intrinsicH <= 0) return 1.0;

  const scaleX = allocatedW / intrinsicW;
  const scaleY = allocatedH / intrinsicH;
  let scaleFactor = Math.min(scaleX, scaleY, 1.0);

  if (scaleFactor < MIN_SCALE_THRESHOLD) {
    console.warn(
      `[pom] ${nodeType} node: scale factor ${scaleFactor.toFixed(2)} is below threshold ${MIN_SCALE_THRESHOLD}. Content may overflow.`,
    );
    scaleFactor = MIN_SCALE_THRESHOLD;
  }

  return scaleFactor;
}
