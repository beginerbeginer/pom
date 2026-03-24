import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect } from "vitest";
import { generatePreviewSvg } from "./generatePreview.js";

const samplePath = resolve(__dirname, "../sample.pom.md");
const sampleMarkdown = readFileSync(samplePath, "utf-8");

describe("generatePreviewSvg 統合テスト", () => {
  it(
    "sample.pom.md を処理してクラッシュしない",
    { timeout: 30000 },
    async () => {
      const result = await generatePreviewSvg(sampleMarkdown, []);
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
