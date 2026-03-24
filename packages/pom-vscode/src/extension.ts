import * as vscode from "vscode";
import { PomPreviewPanel } from "./preview.js";

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand("pom.openPreview", () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        void vscode.window.showErrorMessage("No active editor");
        return;
      }
      if (!editor.document.fileName.endsWith(".pom.md")) {
        void vscode.window.showErrorMessage(
          "This command is only available for .pom.md files",
        );
        return;
      }
      PomPreviewPanel.createOrShow(context.extensionUri, editor.document);
    }),
  );

  // エディタ内容の変更を監視
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document.fileName.endsWith(".pom.md")) {
        PomPreviewPanel.update(e.document);
      }
    }),
  );
}

export function deactivate(): void {
  // nothing to clean up
}
