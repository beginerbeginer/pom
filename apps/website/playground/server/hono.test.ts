// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

// convertXmlToPreview / convertXmlToPptx をモック
vi.mock("./convertXmlToPreview", () => ({
  convertXmlToPreview: vi.fn(),
}));

vi.mock("./convertXmlToPptx", () => ({
  convertXmlToPptx: vi.fn(),
}));

import { convertXmlToPreview } from "./convertXmlToPreview";
import { convertXmlToPptx } from "./convertXmlToPptx";
import { app } from "./hono";

const mockConvertXmlToPreview = vi.mocked(convertXmlToPreview);
const mockConvertXmlToPptx = vi.mocked(convertXmlToPptx);

describe("Hono API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET /api/health", () => {
    it('{ status: "ok" } を返す', async () => {
      const res = await app.request("/api/health");
      expect(res.status).toBe(200);
      const data: unknown = await res.json();
      expect(data).toEqual({ status: "ok" });
    });
  });

  describe("POST /api/preview", () => {
    it("有効な XML で SVG 配列を返す", async () => {
      mockConvertXmlToPreview.mockResolvedValue({
        svgs: ["<svg>slide1</svg>"],
      });

      const res = await app.request("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xml: "<Text>hello</Text>" }),
      });

      expect(res.status).toBe(200);
      const data: unknown = await res.json();
      expect(data).toEqual({ svgs: ["<svg>slide1</svg>"] });
      expect(mockConvertXmlToPreview).toHaveBeenCalledWith(
        "<Text>hello</Text>",
      );
    });

    it("変換エラー時に 400 とエラー配列を返す", async () => {
      mockConvertXmlToPreview.mockRejectedValue(new Error("Tag is not closed"));

      const res = await app.request("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xml: "<broken" }),
      });

      expect(res.status).toBe(400);
      const data = (await res.json()) as { errors: unknown[] };
      expect(data.errors).toBeDefined();
      expect(data.errors.length).toBeGreaterThan(0);
    });

    it("xml パラメータが欠落で 400 を返す", async () => {
      const res = await app.request("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/download", () => {
    it("有効な XML で PPTX バイナリを返す", async () => {
      const buffer = new ArrayBuffer(8);
      mockConvertXmlToPptx.mockResolvedValue(buffer);

      const res = await app.request("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xml: "<Text>hello</Text>" }),
      });

      expect(res.status).toBe(200);
      expect(mockConvertXmlToPptx).toHaveBeenCalledWith("<Text>hello</Text>");
    });

    it("Content-Type と Content-Disposition ヘッダーが正しい", async () => {
      mockConvertXmlToPptx.mockResolvedValue(new ArrayBuffer(8));

      const res = await app.request("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xml: "<Text>hello</Text>" }),
      });

      expect(res.headers.get("Content-Type")).toBe(
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      );
      expect(res.headers.get("Content-Disposition")).toBe(
        'attachment; filename="output.pptx"',
      );
    });

    it("変換エラー時に 400 とエラー配列を返す", async () => {
      mockConvertXmlToPptx.mockRejectedValue(new Error("Invalid XML"));

      const res = await app.request("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xml: "<broken" }),
      });

      expect(res.status).toBe(400);
      const data = (await res.json()) as { errors: unknown[] };
      expect(data.errors).toBeDefined();
    });
  });
});
