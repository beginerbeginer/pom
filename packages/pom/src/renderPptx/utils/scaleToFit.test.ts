import { describe, it, expect } from "vitest";
import { calcScaleFactor } from "./scaleToFit.ts";
import { DiagnosticCollector } from "../../diagnostics.ts";

describe("calcScaleFactor", () => {
  it("割り当てサイズ >= 固有サイズの場合、1.0を返す", () => {
    const d = new DiagnosticCollector();
    expect(calcScaleFactor(500, 300, 400, 200, "tree", d)).toBe(1.0);
  });

  it("幅が制約される場合、幅のスケール比を返す", () => {
    const d = new DiagnosticCollector();
    expect(calcScaleFactor(200, 300, 400, 200, "tree", d)).toBe(0.5);
  });

  it("高さが制約される場合、高さのスケール比を返す", () => {
    const d = new DiagnosticCollector();
    expect(calcScaleFactor(500, 100, 400, 200, "tree", d)).toBe(0.5);
  });

  it("両方が制約される場合、小さい方を返す", () => {
    const d = new DiagnosticCollector();
    expect(calcScaleFactor(200, 100, 400, 200, "tree", d)).toBe(0.5);
  });

  it("閾値未満の場合、閾値でクランプして diagnostics に記録する", () => {
    const d = new DiagnosticCollector();
    const result = calcScaleFactor(100, 100, 400, 200, "tree", d);
    expect(result).toBe(0.5);
    expect(d.items).toHaveLength(1);
    expect(d.items[0].code).toBe("SCALE_BELOW_THRESHOLD");
    expect(d.items[0].message).toContain("scale factor");
  });

  it("閾値ちょうどの場合、diagnostics なし", () => {
    const d = new DiagnosticCollector();
    calcScaleFactor(200, 100, 400, 200, "tree", d);
    expect(d.items).toHaveLength(0);
  });

  it("固有サイズが0の場合、1.0を返す", () => {
    const d = new DiagnosticCollector();
    expect(calcScaleFactor(100, 100, 0, 0, "tree", d)).toBe(1.0);
  });

  it("固有サイズが負の場合、1.0を返す", () => {
    const d = new DiagnosticCollector();
    expect(calcScaleFactor(100, 100, -10, 50, "tree", d)).toBe(1.0);
  });
});
