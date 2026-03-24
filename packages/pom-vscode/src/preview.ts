import * as vscode from "vscode";
import { parseMd } from "@hirokisakabe/pom-md";
import { buildPptx } from "@hirokisakabe/pom";
import { convertPptxToSvg } from "pptx-glimpse";

const SLIDE_WIDTH = 1280;
const SLIDE_HEIGHT = 720;

const DEBOUNCE_MS = 500;

export class PomPreviewPanel {
  private static instance: PomPreviewPanel | undefined;
  private readonly panel: vscode.WebviewPanel;
  private documentUri: vscode.Uri;
  private debounceTimer: ReturnType<typeof setTimeout> | undefined;
  private renderGeneration = 0;
  private disposed = false;

  private constructor(
    panel: vscode.WebviewPanel,
    document: vscode.TextDocument,
  ) {
    this.panel = panel;
    this.documentUri = document.uri;

    this.panel.onDidDispose(() => {
      this.disposed = true;
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      PomPreviewPanel.instance = undefined;
    });

    void this.render(document.getText());
  }

  static createOrShow(
    _extensionUri: vscode.Uri,
    document: vscode.TextDocument,
  ): void {
    if (PomPreviewPanel.instance) {
      PomPreviewPanel.instance.documentUri = document.uri;
      PomPreviewPanel.instance.panel.reveal(vscode.ViewColumn.Beside);
      void PomPreviewPanel.instance.render(document.getText());
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      "pomPreview",
      "pom Preview",
      vscode.ViewColumn.Beside,
      { enableScripts: false },
    );

    PomPreviewPanel.instance = new PomPreviewPanel(panel, document);
  }

  static update(document: vscode.TextDocument): void {
    const instance = PomPreviewPanel.instance;
    if (!instance || instance.disposed) return;

    // 対象ドキュメントの変更のみ再描画
    if (instance.documentUri.toString() !== document.uri.toString()) return;

    if (instance.debounceTimer) clearTimeout(instance.debounceTimer);
    instance.debounceTimer = setTimeout(() => {
      void instance.render(document.getText());
    }, DEBOUNCE_MS);
  }

  private async render(markdown: string): Promise<void> {
    const generation = ++this.renderGeneration;

    try {
      const xml = parseMd(markdown);
      if (!xml.trim()) {
        if (generation === this.renderGeneration && !this.disposed) {
          this.panel.webview.html = buildHtml([]);
        }
        return;
      }

      const { pptx } = await buildPptx(xml, {
        w: SLIDE_WIDTH,
        h: SLIDE_HEIGHT,
      });

      if (generation !== this.renderGeneration) return;

      const buffer = await pptx.write({ outputType: "uint8array" });
      if (!(buffer instanceof Uint8Array)) {
        throw new Error("Unexpected output type from pptx.write");
      }

      if (generation !== this.renderGeneration) return;

      const slides = await convertPptxToSvg(buffer, { width: SLIDE_WIDTH });
      const svgs = slides.map((s: { svg: string }) => s.svg);

      if (generation === this.renderGeneration && !this.disposed) {
        this.panel.webview.html = buildHtml(svgs);
      }
    } catch (err: unknown) {
      if (generation === this.renderGeneration && !this.disposed) {
        const message = err instanceof Error ? err.message : String(err);
        this.panel.webview.html = buildErrorHtml(message);
      }
    }
  }
}

function buildHtml(svgs: string[]): string {
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

function buildErrorHtml(message: string): string {
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
