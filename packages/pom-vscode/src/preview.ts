import * as crypto from "crypto";
import * as path from "path";
import * as vscode from "vscode";
import {
  generatePreviewSvg,
  buildHtml,
  buildErrorHtml,
  ZOOM_LEVELS,
  type ZoomLevel,
} from "./generatePreview.js";

const DEBOUNCE_MS = 500;

function getNonce(): string {
  return crypto.randomBytes(16).toString("hex");
}

const VALID_ZOOM_VALUES = new Set<string>(ZOOM_LEVELS.map((z) => z.value));

function getDefaultZoom(): ZoomLevel {
  const value = vscode.workspace
    .getConfiguration("pom.preview")
    .get<string>("defaultZoom", "fit");
  return VALID_ZOOM_VALUES.has(value) ? (value as ZoomLevel) : "fit";
}

export class PomPreviewPanel {
  private static instance: PomPreviewPanel | undefined;
  private readonly panel: vscode.WebviewPanel;
  private readonly fontDirs: string[];
  private documentUri: vscode.Uri;
  private debounceTimer: ReturnType<typeof setTimeout> | undefined;
  private renderGeneration = 0;
  private disposed = false;

  private constructor(
    panel: vscode.WebviewPanel,
    extensionPath: string,
    document: vscode.TextDocument,
  ) {
    this.panel = panel;
    this.fontDirs = [path.join(extensionPath, "fonts")];
    this.documentUri = document.uri;

    this.panel.onDidDispose(() => {
      this.disposed = true;
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      PomPreviewPanel.instance = undefined;
    });

    void this.render(document.getText());
  }

  static createOrShow(
    extensionUri: vscode.Uri,
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
      { enableScripts: true },
    );

    PomPreviewPanel.instance = new PomPreviewPanel(
      panel,
      extensionUri.fsPath,
      document,
    );
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

    const result = await generatePreviewSvg(markdown, this.fontDirs);

    if (generation !== this.renderGeneration || this.disposed) return;

    const nonce = getNonce();
    const defaultZoom = getDefaultZoom();

    switch (result.type) {
      case "empty":
        this.panel.webview.html = buildHtml([], nonce, defaultZoom);
        break;
      case "success":
        this.panel.webview.html = buildHtml(result.svgs, nonce, defaultZoom);
        break;
      case "error":
        this.panel.webview.html = buildErrorHtml(result.message);
        break;
    }
  }
}
