import { afterEach, describe, expect, it, vi } from "vitest";

// honoClient をモック
const mockDownloadPost = vi.fn();
vi.mock("./honoClient", () => ({
  honoClient: {
    api: {
      download: {
        $post: (...args: unknown[]) => mockDownloadPost(...args) as unknown,
      },
    },
  },
}));

import { downloadPptx } from "./downloadPptx";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("downloadPptx", () => {
  it("成功時: blob をダウンロードリンクで保存する", async () => {
    const mockBlob = new Blob(["test"], { type: "application/octet-stream" });
    mockDownloadPost.mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(mockBlob),
    });

    const mockUrl = "blob:http://localhost/test-url";
    vi.spyOn(URL, "createObjectURL").mockReturnValue(mockUrl);
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});

    const mockAnchor = {
      href: "",
      download: "",
      click: vi.fn(),
    } as unknown as HTMLAnchorElement;
    vi.spyOn(document, "createElement").mockReturnValue(mockAnchor);
    vi.spyOn(document.body, "appendChild").mockImplementation((node) => node);
    vi.spyOn(document.body, "removeChild").mockImplementation((node) => node);

    await downloadPptx("<Text>hello</Text>");

    expect(mockDownloadPost).toHaveBeenCalledWith({
      json: { xml: "<Text>hello</Text>" },
    });
    expect(mockAnchor.href).toBe(mockUrl);
    expect(mockAnchor.download).toBe("output.pptx");
    expect(mockAnchor.click).toHaveBeenCalled();
  });

  it("エラー時: レスポンスからエラーメッセージを抽出して throw する", async () => {
    mockDownloadPost.mockResolvedValue({
      ok: false,
      text: () =>
        Promise.resolve(
          JSON.stringify({
            errors: [{ type: "xml_syntax", message: "Tag is not closed" }],
          }),
        ),
    });

    await expect(downloadPptx("<broken")).rejects.toThrow("Tag is not closed");
  });

  it("エラー時: JSON パース失敗でもデフォルトメッセージで throw する", async () => {
    mockDownloadPost.mockResolvedValue({
      ok: false,
      text: () => Promise.resolve("not json"),
    });

    await expect(downloadPptx("<broken")).rejects.toThrow("Download failed");
  });
});
