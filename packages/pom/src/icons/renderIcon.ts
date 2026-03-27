import { Resvg, initWasm } from "@resvg/resvg-wasm";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ICON_DATA } from "./iconData.ts";

let wasmInitPromise: Promise<void> | undefined;

/**
 * WASM バイナリのパスを解決する。
 * バンドル環境（esbuild）では同ディレクトリの index_bg.wasm を参照し、
 * 非バンドル環境では createRequire で node_modules から解決する。
 */
function resolveWasmPath(): string {
  const dir = dirname(fileURLToPath(import.meta.url));
  const localPath = join(dir, "index_bg.wasm");
  if (existsSync(localPath)) return localPath;
  const require = createRequire(import.meta.url);
  return require.resolve("@resvg/resvg-wasm/index_bg.wasm");
}

/**
 * WASM モジュールを初期化する。並行呼び出しでも安全（Promise をキャッシュ）。
 */
function ensureWasmInitialized(): Promise<void> {
  if (!wasmInitPromise) {
    wasmInitPromise = (async () => {
      const wasmPath = resolveWasmPath();
      const wasmBuffer = await readFile(wasmPath);
      await initWasm(wasmBuffer);
    })();
  }
  return wasmInitPromise;
}

function buildIconSvg(name: string, size: number, color: string): string {
  const pathData = ICON_DATA[name];
  if (!pathData) {
    throw new Error(`Unknown icon name: "${name}"`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${pathData}</svg>`;
}

export async function rasterizeIcon(
  name: string,
  size: number,
  color: string,
  cache: Map<string, string>,
): Promise<string> {
  const key = `${name}|${size}|${color}`;
  const cached = cache.get(key);
  if (cached) return cached;

  await ensureWasmInitialized();
  const svg = buildIconSvg(name, size, color);
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: size } });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  const result = `image/png;base64,${Buffer.from(pngBuffer).toString("base64")}`;
  cache.set(key, result);
  return result;
}

/**
 * インライン SVG 文字列を指定サイズでラスタライズし、base64 PNG を返す。
 * color が指定された場合、SVG ルートに stroke / fill 属性を設定する。
 */
export async function rasterizeSvgContent(
  svgContent: string,
  size: number,
  color: string | undefined,
  cache: Map<string, string>,
): Promise<string> {
  const key = `svg:${svgContent}|${size}|${color ?? ""}`;
  const cached = cache.get(key);
  if (cached) return cached;

  // SVG に xmlns / width / height を設定し、color があれば stroke / fill を注入
  let svg = svgContent;

  // xmlns が無ければ追加
  if (!svg.includes("xmlns")) {
    svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  // width / height を上書き
  svg = svg.replace(/<svg([^>]*)>/, (match, attrs: string) => {
    let newAttrs = attrs
      .replace(/\bwidth\s*=\s*"[^"]*"/g, "")
      .replace(/\bheight\s*=\s*"[^"]*"/g, "");
    newAttrs += ` width="${size}" height="${size}"`;

    // color 指定時は stroke / fill を設定（プリセットアイコンとの一貫性）
    if (color) {
      if (!attrs.includes("stroke=")) {
        newAttrs += ` stroke="${color}"`;
      }
      if (!attrs.includes("fill=")) {
        newAttrs += ` fill="none"`;
      }
    }

    return `<svg${newAttrs}>`;
  });

  await ensureWasmInitialized();
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: size } });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  const result = `image/png;base64,${Buffer.from(pngBuffer).toString("base64")}`;
  cache.set(key, result);
  return result;
}
