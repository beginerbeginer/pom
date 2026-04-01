import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@hirokisakabe/pom-md", () => ({
  parseMd: vi.fn(),
}));

vi.mock("@hirokisakabe/pom", () => ({
  buildPptx: vi.fn(),
}));

import { parseMd } from "@hirokisakabe/pom-md";
import { buildPptx } from "@hirokisakabe/pom";
import { generatePptxBuffer } from "./exportPptx.js";
import { SLIDE_WIDTH, SLIDE_HEIGHT } from "./generatePreview.js";

const mockParseMd = vi.mocked(parseMd);
const mockBuildPptx = vi.mocked(buildPptx);

describe("generatePptxBuffer", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("正常な Markdown から Uint8Array を返す", async () => {
    const expected = new Uint8Array([1, 2, 3]);
    mockParseMd.mockReturnValue("<Text>Hello</Text>");
    mockBuildPptx.mockResolvedValue({
      pptx: {
        write: vi.fn().mockResolvedValue(expected),
      },
    } as never);

    const result = await generatePptxBuffer("# Title");
    expect(result).toBe(expected);
  });

  it("パイプライン各段階が正しい引数で呼ばれる", async () => {
    mockParseMd.mockReturnValue("<Text>Test</Text>");
    mockBuildPptx.mockResolvedValue({
      pptx: {
        write: vi.fn().mockResolvedValue(new Uint8Array([1])),
      },
    } as never);

    await generatePptxBuffer("# Test");

    expect(mockParseMd).toHaveBeenCalledWith("# Test");
    expect(mockBuildPptx).toHaveBeenCalledWith(
      "<Text>Test</Text>",
      { w: SLIDE_WIDTH, h: SLIDE_HEIGHT },
      { textMeasurement: "fallback" },
    );
  });

  it("parseMd が空文字列を返す場合エラーを投げる", async () => {
    mockParseMd.mockReturnValue("");

    await expect(generatePptxBuffer("")).rejects.toThrow(
      "No slides found in the document",
    );
    expect(mockBuildPptx).not.toHaveBeenCalled();
  });

  it("parseMd が空白のみを返す場合エラーを投げる", async () => {
    mockParseMd.mockReturnValue("   ");

    await expect(generatePptxBuffer("   ")).rejects.toThrow(
      "No slides found in the document",
    );
  });

  it("pptx.write が Uint8Array 以外を返した場合エラーを投げる", async () => {
    mockParseMd.mockReturnValue("<Text>X</Text>");
    mockBuildPptx.mockResolvedValue({
      pptx: {
        write: vi.fn().mockResolvedValue("not-uint8array"),
      },
    } as never);

    await expect(generatePptxBuffer("md")).rejects.toThrow(
      "Unexpected output type from pptx.write",
    );
  });

  it("buildPptx がエラーを投げた場合そのまま伝搬する", async () => {
    mockParseMd.mockReturnValue("<InvalidTag/>");
    mockBuildPptx.mockRejectedValue(new Error("Unknown tag"));

    await expect(generatePptxBuffer("bad")).rejects.toThrow("Unknown tag");
  });

  it("XML 形式の場合 parseMd をスキップして直接 buildPptx に渡す", async () => {
    const expected = new Uint8Array([1, 2, 3]);
    mockBuildPptx.mockResolvedValue({
      pptx: {
        write: vi.fn().mockResolvedValue(expected),
      },
    } as never);

    const result = await generatePptxBuffer("<Text>Hello</Text>", "xml");
    expect(result).toBe(expected);
    expect(mockParseMd).not.toHaveBeenCalled();
    expect(mockBuildPptx).toHaveBeenCalledWith(
      "<Text>Hello</Text>",
      { w: SLIDE_WIDTH, h: SLIDE_HEIGHT },
      { textMeasurement: "fallback" },
    );
  });

  it("XML 形式で空文字列の場合エラーを投げる", async () => {
    await expect(generatePptxBuffer("", "xml")).rejects.toThrow(
      "No slides found in the document",
    );
    expect(mockBuildPptx).not.toHaveBeenCalled();
  });
});
