// @vitest-environment node
import { describe, expect, it } from "vitest";
import { SAMPLE_TEMPLATES } from "../client/lib/sampleTemplates";
import { convertXmlToPptx } from "./convertXmlToPptx";

// PPTX (ZIP) マジックバイト: PK\x03\x04
const ZIP_SIGNATURE = new Uint8Array([0x50, 0x4b, 0x03, 0x04]);

describe("convertXmlToPptx", () => {
  it("サンプルテンプレートが1件以上存在する", () => {
    expect(SAMPLE_TEMPLATES.length).toBeGreaterThan(0);
  });

  describe.each(SAMPLE_TEMPLATES)("サンプル「$name」($id)", ({ xml }) => {
    it("有効な PPTX (ZIP) バイナリに変換できる", async () => {
      const result = await convertXmlToPptx(xml);
      expect(result).toBeInstanceOf(ArrayBuffer);
      expect(result.byteLength).toBeGreaterThan(0);

      const header = new Uint8Array(result).slice(0, 4);
      expect(header).toEqual(ZIP_SIGNATURE);
    });
  });
});
