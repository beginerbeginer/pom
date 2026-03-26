/**
 * .vsix パッケージからの E2E テストランナー。
 *
 * ワークスペース外の一時ディレクトリに拡張をインストールすることで、
 * Node.js のモジュール解決が開発ディレクトリの node_modules を
 * 参照できない環境（= Marketplace インストールと同等）を再現する。
 */
import {
  downloadAndUnzipVSCode,
  resolveCliArgsFromVSCodeExecutablePath,
  runTests,
} from "@vscode/test-electron";
import { execSync } from "child_process";
import { mkdtempSync, readdirSync, rmSync } from "fs";
import { tmpdir } from "os";
import { resolve, join } from "path";

const vsixFile = readdirSync(".").find((f) => f.endsWith(".vsix"));
if (!vsixFile) {
  console.error("No .vsix file found. Run 'vsce package' first.");
  process.exit(1);
}

// ワークスペース外の一時ディレクトリに拡張をインストール
const extensionsDir = mkdtempSync(join(tmpdir(), "pom-vsix-ext-"));

try {
  const vscodeExecutablePath = await downloadAndUnzipVSCode();
  const [cliPath, ...cliArgs] =
    resolveCliArgsFromVSCodeExecutablePath(vscodeExecutablePath);

  // .vsix を一時ディレクトリにインストール
  execSync(
    `"${cliPath}" ${cliArgs.join(" ")} --extensions-dir "${extensionsDir}" --install-extension "${resolve(vsixFile)}"`,
    { stdio: "inherit" },
  );

  // テスト実行
  // - extensionDevelopmentPath: ダミー拡張（コードなし、異なるID）
  // - extensionTestsPath: mocha ランナー（run() をエクスポート）
  // - --extensions-dir: 一時ディレクトリ（node_modules がない環境）
  const exitCode = await runTests({
    vscodeExecutablePath,
    extensionDevelopmentPath: resolve("test-vsix-harness"),
    extensionTestsPath: resolve("dist/test/vsix-runner.js"),
    launchArgs: ["--extensions-dir", extensionsDir, "."],
  });

  process.exit(exitCode);
} finally {
  rmSync(extensionsDir, { recursive: true, force: true });
}
