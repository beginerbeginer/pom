import { defineConfig } from "@vscode/test-cli";
import { readdirSync } from "fs";
import { resolve } from "path";

// vsce package で生成された .vsix ファイルを検出
const vsixFiles = readdirSync(".").filter((f) => f.endsWith(".vsix"));
if (vsixFiles.length === 0) {
  throw new Error("No .vsix file found. Run 'vsce package' first.");
}

export default defineConfig({
  files: "dist/test/**/*.test.js",
  // ダミー拡張を extensionDevelopmentPath に指定し、
  // 開発ディレクトリ（node_modules あり）からの読み込みを回避する。
  // テスト対象の pom-vscode は installExtensions 経由で .vsix からロードされる。
  extensionDevelopmentPath: resolve("test-vsix-harness"),
  installExtensions: [resolve(vsixFiles[0])],
  workspaceFolder: ".",
  mocha: {
    timeout: 20000,
  },
});
