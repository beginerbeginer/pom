import { parseMd } from "@hirokisakabe/pom-md";
import { buildPptx } from "@hirokisakabe/pom";
import { convertPptxToSvg } from "pptx-glimpse";

export const SLIDE_WIDTH = 1280;
export const SLIDE_HEIGHT = 720;

/**
 * pptx-glimpse の DEFAULT_FONT_MAPPING に含まれないテーマフォントの追加マッピング。
 * pptxgenjs のテーマフォントに「游ゴシック Light」が含まれるが、
 * DEFAULT_FONT_MAPPING には「游ゴシック」のみでLight は未定義のため補完する。
 */
const EXTRA_FONT_MAPPING: Record<string, string> = {
  "游ゴシック Light": "Noto Sans CJK JP",
  "Yu Gothic Light": "Noto Sans CJK JP",
};

export type PreviewResult =
  | { type: "empty" }
  | { type: "success"; svgs: string[] }
  | { type: "error"; message: string };

/**
 * Markdown から SVG プレビューを生成する純粋関数
 */
export async function generatePreviewSvg(
  markdown: string,
  fontDirs: string[],
): Promise<PreviewResult> {
  try {
    const xml = parseMd(markdown);
    if (!xml.trim()) {
      return { type: "empty" };
    }

    const { pptx } = await buildPptx(
      xml,
      { w: SLIDE_WIDTH, h: SLIDE_HEIGHT },
      { textMeasurement: "fallback" },
    );

    const buffer = await pptx.write({ outputType: "uint8array" });
    if (!(buffer instanceof Uint8Array)) {
      throw new Error("Unexpected output type from pptx.write");
    }

    const slides = await convertPptxToSvg(buffer, {
      width: SLIDE_WIDTH,
      fontDirs,
      fontMapping: EXTRA_FONT_MAPPING,
    });
    const svgs = slides.map((s: { svg: string }) => s.svg);

    return { type: "success", svgs };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { type: "error", message };
  }
}

export function buildHtml(svgs: string[]): string {
  if (svgs.length === 0) {
    return `<!DOCTYPE html>
<html><body style="display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:sans-serif;color:#888;">
<p>No slides to preview</p>
</body></html>`;
  }

  const slideElements = svgs
    .map(
      (svg, i) => `
    <div style="margin-bottom:24px;">
      <div style="font-size:12px;color:#888;margin-bottom:4px;">Slide ${i + 1}</div>
      <div style="border:1px solid #ddd;border-radius:4px;overflow:hidden;background:#fff;">
        ${svg}
      </div>
    </div>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:16px;background:#f5f5f5;font-family:sans-serif;">
  ${slideElements}
</body>
</html>`;
}

export function buildErrorHtml(message: string): string {
  const escaped = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html><body style="margin:0;padding:16px;font-family:sans-serif;">
<div style="background:#fee;border:1px solid #fcc;border-radius:4px;padding:12px;color:#c00;">
  <strong>Error:</strong> ${escaped}
</div>
</body></html>`;
}
