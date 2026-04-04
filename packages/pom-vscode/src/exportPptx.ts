import * as fs from "fs";
import * as path from "path";
import { parseMd } from "@hirokisakabe/pom-md";
import { buildPptx } from "@hirokisakabe/pom";
import {
  DEFAULT_SLIDE_WIDTH,
  DEFAULT_SLIDE_HEIGHT,
  type InputFormat,
} from "./generatePreview.js";

/**
 * Markdown または XML から PPTX バッファを生成する
 */
export async function generatePptxBuffer(
  content: string,
  format: InputFormat = "markdown",
  documentPath?: string,
): Promise<Uint8Array> {
  let xml: string;
  let slideWidth = DEFAULT_SLIDE_WIDTH;
  let slideHeight = DEFAULT_SLIDE_HEIGHT;
  let masterPptxData: Uint8Array | undefined;

  if (format === "xml") {
    xml = content;
  } else {
    const result = parseMd(content);
    xml = result.xml;
    slideWidth = result.meta.size.w;
    slideHeight = result.meta.size.h;

    if (result.meta.masterPptx && documentPath) {
      const masterPath = path.resolve(
        path.dirname(documentPath),
        result.meta.masterPptx,
      );
      try {
        masterPptxData = new Uint8Array(fs.readFileSync(masterPath));
      } catch (e: unknown) {
        // ファイルが見つからない場合のみ無視
        if (!(e instanceof Error && "code" in e && e.code === "ENOENT")) {
          throw e;
        }
      }
    }
  }

  if (!xml.trim()) {
    throw new Error("No slides found in the document");
  }

  const { pptx } = await buildPptx(
    xml,
    { w: slideWidth, h: slideHeight },
    {
      textMeasurement: "fallback",
      ...(masterPptxData ? { masterPptx: masterPptxData } : {}),
    },
  );

  const buffer = await pptx.write({ outputType: "uint8array" });
  if (!(buffer instanceof Uint8Array)) {
    throw new Error("Unexpected output type from pptx.write");
  }

  return buffer;
}
