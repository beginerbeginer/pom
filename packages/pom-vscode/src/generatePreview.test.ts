import { describe, it, expect, vi, beforeEach } from "vitest";

// 外部依存をモック
vi.mock("@hirokisakabe/pom-md", () => ({
  parseMd: vi.fn(),
}));

vi.mock("@hirokisakabe/pom", () => ({
  buildPptx: vi.fn(),
}));

vi.mock("pptx-glimpse", () => ({
  convertPptxToSvg: vi.fn(),
}));

import { parseMd } from "@hirokisakabe/pom-md";
import { buildPptx } from "@hirokisakabe/pom";
import { convertPptxToSvg } from "pptx-glimpse";
import {
  generatePreviewSvg,
  buildHtml,
  buildErrorHtml,
  SLIDE_WIDTH,
  SLIDE_HEIGHT,
  ZOOM_LEVELS,
  type ZoomLevel,
} from "./generatePreview.js";

const mockParseMd = vi.mocked(parseMd);
const mockBuildPptx = vi.mocked(buildPptx);
const mockConvertPptxToSvg = vi.mocked(convertPptxToSvg);

describe("generatePreviewSvg", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("正常な Markdown から success を返す", async () => {
    mockParseMd.mockReturnValue("<Text>Hello</Text>");
    mockBuildPptx.mockResolvedValue({
      pptx: {
        write: vi.fn().mockResolvedValue(new Uint8Array([1, 2, 3])),
      },
    } as never);
    mockConvertPptxToSvg.mockResolvedValue([
      { svg: '<svg width="1280" height="720">slide1</svg>' },
    ] as never);

    const result = await generatePreviewSvg("# Title", []);
    expect(result.type).toBe("success");
    if (result.type === "success") {
      expect(result.svgs).toHaveLength(1);
      expect(result.svgs[0]).toContain("<svg");
    }
  });

  it("パイプライン各段階が正しい引数で呼ばれる", async () => {
    mockParseMd.mockReturnValue("<Text>Test</Text>");
    mockBuildPptx.mockResolvedValue({
      pptx: {
        write: vi.fn().mockResolvedValue(new Uint8Array([1])),
      },
    } as never);
    mockConvertPptxToSvg.mockResolvedValue([{ svg: "<svg></svg>" }] as never);

    await generatePreviewSvg("# Test", ["/path/to/fonts"]);

    expect(mockParseMd).toHaveBeenCalledWith("# Test");
    expect(mockBuildPptx).toHaveBeenCalledWith(
      "<Text>Test</Text>",
      { w: SLIDE_WIDTH, h: SLIDE_HEIGHT },
      { textMeasurement: "fallback" },
    );
    expect(mockConvertPptxToSvg).toHaveBeenCalledWith(expect.any(Uint8Array), {
      width: SLIDE_WIDTH,
      fontDirs: ["/path/to/fonts"],
      fontMapping: {
        "游ゴシック Light": "Noto Sans CJK JP",
        "Yu Gothic Light": "Noto Sans CJK JP",
      },
    });
  });

  it("複数スライドの SVG を返す", async () => {
    mockParseMd.mockReturnValue("<Text>A</Text>");
    mockBuildPptx.mockResolvedValue({
      pptx: {
        write: vi.fn().mockResolvedValue(new Uint8Array([1])),
      },
    } as never);
    mockConvertPptxToSvg.mockResolvedValue([
      { svg: "<svg>s1</svg>" },
      { svg: "<svg>s2</svg>" },
    ] as never);

    const result = await generatePreviewSvg("md", []);
    expect(result.type).toBe("success");
    if (result.type === "success") {
      expect(result.svgs).toEqual(["<svg>s1</svg>", "<svg>s2</svg>"]);
    }
  });

  it("parseMd が空文字列を返す場合 empty を返す", async () => {
    mockParseMd.mockReturnValue("");

    const result = await generatePreviewSvg("", []);
    expect(result).toEqual({ type: "empty" });
    expect(mockBuildPptx).not.toHaveBeenCalled();
  });

  it("parseMd が空白のみを返す場合 empty を返す", async () => {
    mockParseMd.mockReturnValue("   ");

    const result = await generatePreviewSvg("   ", []);
    expect(result).toEqual({ type: "empty" });
  });

  it("parseMd がエラーを投げた場合 error を返す", async () => {
    mockParseMd.mockImplementation(() => {
      throw new Error("Parse error");
    });

    const result = await generatePreviewSvg("bad input", []);
    expect(result).toEqual({ type: "error", message: "Parse error" });
  });

  it("buildPptx がエラーを投げた場合 error を返す", async () => {
    mockParseMd.mockReturnValue("<InvalidTag/>");
    mockBuildPptx.mockRejectedValue(new Error("Unknown tag: InvalidTag"));

    const result = await generatePreviewSvg("bad xml", []);
    expect(result).toEqual({
      type: "error",
      message: "Unknown tag: InvalidTag",
    });
  });

  it("Error 以外の例外を文字列に変換する", async () => {
    mockParseMd.mockImplementation(() => {
      throw "string error";
    });

    const result = await generatePreviewSvg("bad", []);
    expect(result).toEqual({ type: "error", message: "string error" });
  });

  it("XML 形式の場合 parseMd をスキップして直接 buildPptx に渡す", async () => {
    mockBuildPptx.mockResolvedValue({
      pptx: {
        write: vi.fn().mockResolvedValue(new Uint8Array([1])),
      },
    } as never);
    mockConvertPptxToSvg.mockResolvedValue([{ svg: "<svg></svg>" }] as never);

    await generatePreviewSvg("<Text>Direct XML</Text>", [], "xml");

    expect(mockParseMd).not.toHaveBeenCalled();
    expect(mockBuildPptx).toHaveBeenCalledWith(
      "<Text>Direct XML</Text>",
      { w: SLIDE_WIDTH, h: SLIDE_HEIGHT },
      { textMeasurement: "fallback" },
    );
  });

  it("XML 形式で空文字列の場合 empty を返す", async () => {
    const result = await generatePreviewSvg("", [], "xml");
    expect(result).toEqual({ type: "empty" });
    expect(mockBuildPptx).not.toHaveBeenCalled();
  });

  it("XML 形式で空白のみの場合 empty を返す", async () => {
    const result = await generatePreviewSvg("   ", [], "xml");
    expect(result).toEqual({ type: "empty" });
  });

  it("XML 形式で buildPptx がエラーを投げた場合 error を返す", async () => {
    mockBuildPptx.mockRejectedValue(new Error("Unknown tag: BadTag"));

    const result = await generatePreviewSvg("<BadTag/>", [], "xml");
    expect(result).toEqual({
      type: "error",
      message: "Unknown tag: BadTag",
    });
  });

  it("pptx.write が Uint8Array 以外を返した場合 error を返す", async () => {
    mockParseMd.mockReturnValue("<Text>X</Text>");
    mockBuildPptx.mockResolvedValue({
      pptx: {
        write: vi.fn().mockResolvedValue("not-uint8array"),
      },
    } as never);

    const result = await generatePreviewSvg("md", []);
    expect(result.type).toBe("error");
    if (result.type === "error") {
      expect(result.message).toBe("Unexpected output type from pptx.write");
    }
  });
});

describe("buildHtml", () => {
  const nonce = "test-nonce";
  const defaultZoom: ZoomLevel = "fit";

  it("SVG が1つの場合、スライド番号付きの HTML を返す", () => {
    const html = buildHtml(
      ['<svg width="100" height="50"></svg>'],
      nonce,
      defaultZoom,
    );
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("Slide 1");
    expect(html).toContain('<svg width="100" height="50"></svg>');
    expect(html).not.toContain("Slide 2");
  });

  it("SVG が複数の場合、全スライドを含む HTML を返す", () => {
    const svgs = [
      '<svg id="s1"></svg>',
      '<svg id="s2"></svg>',
      '<svg id="s3"></svg>',
    ];
    const html = buildHtml(svgs, nonce, defaultZoom);
    expect(html).toContain("Slide 1");
    expect(html).toContain("Slide 2");
    expect(html).toContain("Slide 3");
    expect(html).toContain('<svg id="s1"></svg>');
    expect(html).toContain('<svg id="s2"></svg>');
    expect(html).toContain('<svg id="s3"></svg>');
  });

  it("空配列の場合、No slides メッセージを返す", () => {
    const html = buildHtml([], nonce, defaultZoom);
    expect(html).toContain("No slides to preview");
    expect(html).not.toContain("Slide 1");
  });

  it("ズームコントロールのボタンを含む", () => {
    const html = buildHtml(["<svg></svg>"], nonce, defaultZoom);
    for (const { label } of ZOOM_LEVELS) {
      expect(html).toContain(label);
    }
  });

  it("data-zoom 属性にデフォルトズームが設定される", () => {
    const html = buildHtml(["<svg></svg>"], nonce, "100");
    expect(html).toContain('data-zoom="100"');
  });

  it("nonce が style と script タグに設定される", () => {
    const html = buildHtml(["<svg></svg>"], "abc123", defaultZoom);
    expect(html).toContain('nonce="abc123"');
  });

  it("Content-Security-Policy meta タグが出力される", () => {
    const html = buildHtml(["<svg></svg>"], nonce, defaultZoom);
    expect(html).toContain("Content-Security-Policy");
    expect(html).toContain(`'nonce-${nonce}'`);
    expect(html).toContain("default-src 'none'");
  });
});

describe("buildErrorHtml", () => {
  it("エラーメッセージを含む HTML を返す", () => {
    const html = buildErrorHtml("Something went wrong");
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("Something went wrong");
    expect(html).toContain("Error:");
  });

  it("HTML 特殊文字をエスケープする", () => {
    const html = buildErrorHtml('<script>alert("xss")</script>');
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("& 文字をエスケープする", () => {
    const html = buildErrorHtml("foo & bar");
    expect(html).toContain("foo &amp; bar");
  });

  it("> 文字をエスケープする", () => {
    const html = buildErrorHtml("a > b");
    expect(html).toContain("a &gt; b");
  });
});

describe("定数", () => {
  it("SLIDE_WIDTH が 1280", () => {
    expect(SLIDE_WIDTH).toBe(1280);
  });

  it("SLIDE_HEIGHT が 720", () => {
    expect(SLIDE_HEIGHT).toBe(720);
  });
});
