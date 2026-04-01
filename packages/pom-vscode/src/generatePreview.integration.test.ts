import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect } from "vitest";
import { generatePreviewSvg } from "./generatePreview.js";

const fontDirs = [resolve(__dirname, "../fonts")];

describe("generatePreviewSvg 統合テスト", () => {
  it(
    "sample.pom.md を処理してクラッシュしない",
    { timeout: 30000 },
    async () => {
      const sampleMarkdown = readFileSync(
        resolve(__dirname, "../sample.pom.md"),
        "utf-8",
      );
      const result = await generatePreviewSvg(sampleMarkdown, fontDirs);
      expect(result.type).toBe("success");
      if (result.type === "success") {
        expect(result.svgs.length).toBeGreaterThan(0);
        for (const svg of result.svgs) {
          expect(svg).toContain("<svg");
        }
      }
    },
  );

  it(
    "sample.pom.xml を処理してクラッシュしない",
    { timeout: 30000 },
    async () => {
      const sampleXml = readFileSync(
        resolve(__dirname, "../sample.pom.xml"),
        "utf-8",
      );
      const result = await generatePreviewSvg(sampleXml, fontDirs, "xml");
      if (result.type === "error") {
        throw new Error(`XML processing failed: ${result.message}`);
      }
      expect(result.type).toBe("success");
      if (result.type === "success") {
        expect(result.svgs.length).toBeGreaterThan(0);
        for (const svg of result.svgs) {
          expect(svg).toContain("<svg");
        }
      }
    },
  );
});
