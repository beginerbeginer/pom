import * as path from "path";
import * as vscode from "vscode";
import { PomPreviewPanel } from "./preview.js";
import { isPomFile, detectFormat } from "./fileUtils.js";
import { generatePptxBuffer } from "./exportPptx.js";

/** ファイル名から拡張子（.pom.md or .pom.xml）を取得する */
function getPomExtension(fileName: string): string {
  if (fileName.endsWith(".pom.xml")) return ".pom.xml";
  return ".pom.md";
}

export function activate(context: vscode.ExtensionContext): void {
  const diagnosticCollection =
    vscode.languages.createDiagnosticCollection("pom");
  context.subscriptions.push(diagnosticCollection);
  PomPreviewPanel.setDiagnosticCollection(diagnosticCollection);

  context.subscriptions.push(
    vscode.commands.registerCommand("pom.openPreview", () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        void vscode.window.showErrorMessage("No active editor");
        return;
      }
      if (!isPomFile(editor.document.fileName)) {
        void vscode.window.showErrorMessage(
          "This command is only available for .pom.md or .pom.xml files",
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
      if (!isPomFile(editor.document.fileName)) {
        void vscode.window.showErrorMessage(
          "This command is only available for .pom.md or .pom.xml files",
        );
        return;
      }

      const ext = getPomExtension(editor.document.fileName);
      const basename = path.basename(editor.document.fileName, ext);
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
            const format = detectFormat(editor.document.fileName);
            const buffer = await generatePptxBuffer(
              editor.document.getText(),
              format,
            );
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
      if (isPomFile(e.document.fileName)) {
        PomPreviewPanel.update(e.document);
      }
    }),
  );
}

export function deactivate(): void {
  // nothing to clean up
}
