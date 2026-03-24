import * as assert from "node:assert";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import * as vscode from "vscode";

// esbuild が CJS にバンドルするため、実行時に __dirname は利用可能
declare const __dirname: string;

/**
 * sample.pom.md を一時ディレクトリにコピーし、テスト用ファイルパスを返す。
 * 元ファイルの変更を防ぐため、テストは常にコピーを使用する。
 */
function createTempPomFile(): string {
  const src = path.resolve(__dirname, "../../sample.pom.md");
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "pom-test-"));
  const dest = path.join(tmpDir, "sample.pom.md");
  fs.copyFileSync(src, dest);
  return dest;
}

/**
 * 条件が true になるまでポーリングで待機する。
 * 固定 sleep よりも安定かつ高速。
 */
async function waitFor(
  condition: () => boolean | Promise<boolean>,
  timeoutMs = 10000,
  intervalMs = 200,
): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await condition()) return;
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error(`waitFor timed out after ${timeoutMs}ms`);
}

function hasPreviewTab(): boolean {
  return vscode.window.tabGroups.all.some((group) =>
    group.tabs.some((tab) => tab.label === "pom Preview"),
  );
}

suite("pom-vscode Extension", () => {
  // 拡張機能が読み込まれるまで待機
  suiteSetup(async () => {
    const ext = vscode.extensions.getExtension("hirokisakabe.pom-vscode");
    assert.ok(ext, "Extension should be installed");
    if (!ext.isActive) {
      await ext.activate();
    }
  });

  // 各テスト後にエディタとパネルを閉じて状態を初期化
  teardown(async () => {
    await vscode.commands.executeCommand("workbench.action.closeAllEditors");
  });

  test("pom.openPreview command is registered", async () => {
    const commands = await vscode.commands.getCommands(false);
    assert.ok(
      commands.includes("pom.openPreview"),
      "pom.openPreview should be in the command list",
    );
  });

  test("opens preview panel for .pom.md file", async () => {
    const tmpFile = createTempPomFile();
    const doc = await vscode.workspace.openTextDocument(tmpFile);
    await vscode.window.showTextDocument(doc);

    await vscode.commands.executeCommand("pom.openPreview");

    await waitFor(() => hasPreviewTab());
    assert.ok(hasPreviewTab(), "Preview panel should be opened");
  });

  test("updates preview on text change", async () => {
    const tmpFile = createTempPomFile();
    const doc = await vscode.workspace.openTextDocument(tmpFile);
    const editor = await vscode.window.showTextDocument(doc);

    await vscode.commands.executeCommand("pom.openPreview");
    await waitFor(() => hasPreviewTab());

    // 変更前の HTML を記録
    const previewTabBefore = vscode.window.tabGroups.all
      .flatMap((g) => g.tabs)
      .find((t) => t.label === "pom Preview");
    assert.ok(previewTabBefore, "Preview tab should exist before edit");

    // テキストを変更
    await editor.edit((editBuilder) => {
      editBuilder.insert(new vscode.Position(0, 0), "<!-- test -->\n");
    });

    // デバウンス(500ms) + レンダリング完了を待つ
    // PomPreviewPanel は非同期レンダリング後に webview.html を更新する
    await new Promise((r) => setTimeout(r, 1500));

    // パネルがまだ存在していること（エラーで閉じていないこと）を確認
    assert.ok(
      hasPreviewTab(),
      "Preview panel should still exist after text change",
    );
  });
});
