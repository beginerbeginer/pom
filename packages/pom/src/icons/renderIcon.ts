import { Resvg } from "@resvg/resvg-js";
import { ICON_DATA } from "./iconData.ts";

function buildIconSvg(name: string, size: number, color: string): string {
  const pathData = ICON_DATA[name];
  if (!pathData) {
    throw new Error(`Unknown icon name: "${name}"`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${pathData}</svg>`;
}

export function rasterizeIcon(
  name: string,
  size: number,
  color: string,
  cache: Map<string, string>,
): string {
  const key = `${name}|${size}|${color}`;
  const cached = cache.get(key);
  if (cached) return cached;

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
export function rasterizeSvgContent(
  svgContent: string,
  size: number,
  color: string | undefined,
  cache: Map<string, string>,
): string {
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

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: size } });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  const result = `image/png;base64,${Buffer.from(pngBuffer).toString("base64")}`;
  cache.set(key, result);
  return result;
}
