import { describe, it, expect, vi } from "vitest";
import { calcScaleFactor } from "./scaleToFit.ts";

describe("calcScaleFactor", () => {
  it("割り当てサイズ >= 固有サイズの場合、1.0を返す", () => {
    expect(calcScaleFactor(500, 300, 400, 200, "tree")).toBe(1.0);
  });

  it("幅が制約される場合、幅のスケール比を返す", () => {
    expect(calcScaleFactor(200, 300, 400, 200, "tree")).toBe(0.5);
  });

  it("高さが制約される場合、高さのスケール比を返す", () => {
    expect(calcScaleFactor(500, 100, 400, 200, "tree")).toBe(0.5);
  });

  it("両方が制約される場合、小さい方を返す", () => {
    expect(calcScaleFactor(200, 100, 400, 200, "tree")).toBe(0.5);
  });

  it("閾値未満の場合、閾値でクランプして警告を出す", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = calcScaleFactor(100, 100, 400, 200, "tree");
    expect(result).toBe(0.5);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("scale factor"),
    );
    warnSpy.mockRestore();
  });

  it("閾値ちょうどの場合、警告なし", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    calcScaleFactor(200, 100, 400, 200, "tree");
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it("固有サイズが0の場合、1.0を返す", () => {
    expect(calcScaleFactor(100, 100, 0, 0, "tree")).toBe(1.0);
  });

  it("固有サイズが負の場合、1.0を返す", () => {
    expect(calcScaleFactor(100, 100, -10, 50, "tree")).toBe(1.0);
  });
});
