import { Resvg } from "@resvg/resvg-js";
import { ICON_DATA } from "./iconData.ts";

const rasterCache = new Map<string, string>();

export function buildIconSvg(
  name: string,
  size: number,
  color: string,
): string {
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
): string {
  const key = `${name}|${size}|${color}`;
  const cached = rasterCache.get(key);
  if (cached) return cached;

  const svg = buildIconSvg(name, size, color);
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: size } });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  const result = `image/png;base64,${Buffer.from(pngBuffer).toString("base64")}`;
  rasterCache.set(key, result);
  return result;
}
