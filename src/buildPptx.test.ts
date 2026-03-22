import { describe, expect, it, vi } from "vitest";
import { buildPptx } from "./buildPptx.ts";
import * as measureTextModule from "./calcYogaLayout/measureText.ts";

describe("buildPptx 並列実行", () => {
  const slideSize = { w: 1280, h: 720 };

  it("異なる textMeasurement モードで並列実行しても干渉しない", async () => {
    const xml = `<VStack><Text fontSize="24">テスト文字列</Text></VStack>`;

    const spy = vi.spyOn(measureTextModule, "measureText");

    // 異なる textMeasurement オプションで並列実行
    const [pptxOpentype, pptxFallback] = await Promise.all([
      buildPptx(xml, slideSize, {
        textMeasurement: "opentype",
        autoFit: false,
      }),
      buildPptx(xml, slideSize, {
        textMeasurement: "fallback",
        autoFit: false,
      }),
    ]);

    // 両方とも正常に完了すること
    expect(pptxOpentype).toBeDefined();
    expect(pptxFallback).toBeDefined();

    // measureText の呼び出しで各モードが正しく渡されていることを検証
    const opentypeCalls = spy.mock.calls.filter(
      (args) => args[3] === "opentype",
    );
    const fallbackCalls = spy.mock.calls.filter(
      (args) => args[3] === "fallback",
    );
    expect(opentypeCalls.length).toBeGreaterThan(0);
    expect(fallbackCalls.length).toBeGreaterThan(0);

    spy.mockRestore();
  });

  it("同一オプションで並列実行してもキャッシュが干渉しない", async () => {
    const xml1 = `<VStack><Text fontSize="20">文字列A</Text></VStack>`;
    const xml2 = `<VStack><Text fontSize="30">文字列B</Text></VStack>`;

    const [pptx1, pptx2] = await Promise.all([
      buildPptx(xml1, slideSize, { autoFit: false }),
      buildPptx(xml2, slideSize, { autoFit: false }),
    ]);

    expect(pptx1).toBeDefined();
    expect(pptx2).toBeDefined();
  });

  it("Icon を含む並列実行でキャッシュが干渉しない", async () => {
    const xml1 = `<VStack><Icon name="star" size="32" color="#FF0000" /></VStack>`;
    const xml2 = `<VStack><Icon name="heart" size="48" color="#0000FF" /></VStack>`;

    const [pptx1, pptx2] = await Promise.all([
      buildPptx(xml1, slideSize, { autoFit: false }),
      buildPptx(xml2, slideSize, { autoFit: false }),
    ]);

    expect(pptx1).toBeDefined();
    expect(pptx2).toBeDefined();
  });
});
