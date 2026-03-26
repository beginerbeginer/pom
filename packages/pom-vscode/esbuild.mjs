import * as esbuild from "esbuild";
import fs from "fs";

const watch = process.argv.includes("--watch");
const buildTest = process.argv.includes("--test");

// CJS バンドルで import.meta.url が空になる問題を解消するプラグイン。
// pom の dist ファイルが createRequire(import.meta.url) を使用しているため、
// CJS 互換の __filename ベース URL に置き換える。
const importMetaPlugin = {
  name: "import-meta-url-shim",
  setup(build) {
    build.onLoad({ filter: /\.js$/, namespace: "file" }, async (args) => {
      // node_modules 外の .js ファイルで import.meta.url を含むもののみ対象
      if (args.path.includes("node_modules")) return undefined;
      const contents = await fs.promises.readFile(args.path, "utf8");
      if (!contents.includes("import.meta.url")) return undefined;
      return {
        contents: contents.replace(/import\.meta\.url/g, "__filename"),
        loader: "js",
      };
    });
  },
};

/** @type {import('esbuild').BuildOptions} */
const buildOptions = {
  entryPoints: ["src/extension.ts"],
  bundle: true,
  outfile: "dist/extension.js",
  external: ["vscode", "sharp"],
  loader: { ".node": "copy" },
  format: "cjs",
  platform: "node",
  target: "node18",
  sourcemap: true,
  plugins: [importMetaPlugin],
};

/** @type {import('esbuild').BuildOptions} */
const testBuildOptions = {
  entryPoints: ["src/test/extension.test.ts"],
  bundle: true,
  outfile: "dist/test/extension.test.js",
  external: ["vscode", "mocha", "assert", "sharp"],
  loader: { ".node": "copy" },
  format: "cjs",
  platform: "node",
  target: "node18",
  sourcemap: true,
  plugins: [importMetaPlugin],
};

if (watch) {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  console.log("Watching for changes...");
} else {
  await esbuild.build(buildOptions);
  if (buildTest) {
    await esbuild.build(testBuildOptions);
    console.log("Build complete (with tests)");
  } else {
    console.log("Build complete");
  }
}
