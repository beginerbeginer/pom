import { parseMd } from "@hirokisakabe/pom-md";
import { buildPptx } from "@hirokisakabe/pom";
import {
  SLIDE_WIDTH,
  SLIDE_HEIGHT,
  type InputFormat,
} from "./generatePreview.js";

/**
 * Markdown または XML から PPTX バッファを生成する
 */
export async function generatePptxBuffer(
  content: string,
  format: InputFormat = "markdown",
): Promise<Uint8Array> {
  const xml = format === "xml" ? content : parseMd(content);
  if (!xml.trim()) {
    throw new Error("No slides found in the document");
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

  return buffer;
}
