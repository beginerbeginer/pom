import * as path from "path";
import * as vscode from "vscode";
import { PomPreviewPanel } from "./preview.js";
import { generatePptxBuffer } from "./exportPptx.js";

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

  context.subscriptions.push(
    vscode.commands.registerCommand("pom.exportPptx", async () => {
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

      const basename = path.basename(editor.document.fileName, ".pom.md");
      const defaultUri = vscode.Uri.file(
        path.join(path.dirname(editor.document.fileName), `${basename}.pptx`),
      );

      const saveUri = await vscode.window.showSaveDialog({
        defaultUri,
        filters: { PowerPoint: ["pptx"] },
      });
      if (!saveUri) return;

      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Exporting PPTX...",
          cancellable: false,
        },
        async () => {
          try {
            const buffer = await generatePptxBuffer(editor.document.getText());
            await vscode.workspace.fs.writeFile(saveUri, buffer);
            void vscode.window.showInformationMessage(
              `Exported to ${path.basename(saveUri.fsPath)}`,
            );
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            void vscode.window.showErrorMessage(`Export failed: ${message}`);
          }
        },
      );
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
