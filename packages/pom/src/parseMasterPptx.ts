import { XMLParser } from "fast-xml-parser";
import type { SlideMasterBackground } from "./types.ts";

// JSZip は CJS パッケージのため動的 import で読み込む
async function loadJSZip(): Promise<typeof import("jszip")> {
  const mod = await import("jszip");
  /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
  return (mod as any).default ?? mod;
  /* eslint-enable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
}

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

/**
 * MIME タイプを拡張子から判定する
 */
function mimeTypeFromExt(filePath: string): string {
  const ext = filePath.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "bmp":
      return "image/bmp";
    case "svg":
      return "image/svg+xml";
    case "tiff":
    case "tif":
      return "image/tiff";
    case "webp":
      return "image/webp";
    default:
      return "image/png";
  }
}

/**
 * rels XML から rId に対応するファイルパスを取得する
 */
function resolveRelId(relsXml: string, rId: string): string | undefined {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
  const parsed = xmlParser.parse(relsXml);
  const relationships = parsed?.Relationships?.Relationship;
  if (!relationships) return undefined;

  const rels = Array.isArray(relationships) ? relationships : [relationships];
  for (const rel of rels) {
    if (rel["@_Id"] === rId) {
      return rel["@_Target"] as string;
    }
  }
  /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
  return undefined;
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

/**
 * bgPr 要素から背景情報を抽出する
 */
async function extractBackgroundFromBgPr(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bgPr: any,
  zip: import("jszip"),
  relsPath: string,
  basePath: string,
): Promise<SlideMasterBackground | undefined> {
  if (!bgPr) return undefined;

  // 単色塗りつぶし
  const solidFill = bgPr["a:solidFill"];
  if (solidFill) {
    const srgbClr = solidFill["a:srgbClr"];
    if (srgbClr) {
      const color = (srgbClr["@_val"] as string) ?? undefined;
      if (color) return { color };
    }
  }

  // 画像背景
  const blipFill = bgPr["a:blipFill"];
  if (blipFill) {
    const blip = blipFill["a:blip"];
    const rId = blip?.["@_r:embed"] as string | undefined;
    if (!rId) return undefined;

    const relsFile = zip.file(relsPath);
    if (!relsFile) return undefined;
    const relsXml = await relsFile.async("text");
    const target = resolveRelId(relsXml, rId);
    if (!target) return undefined;

    // target は相対パスなので basePath からの相対パスとして解決
    const imagePath = new URL(
      target,
      `file:///${basePath}dummy`,
    ).pathname.slice(1);

    const imageFile = zip.file(imagePath);
    if (!imageFile) return undefined;

    const imageData = await imageFile.async("base64");
    const mimeType = mimeTypeFromExt(imagePath);
    return { data: `data:${mimeType};base64,${imageData}` };
  }

  return undefined;
}

/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

/**
 * マスター PPTX のバッファからスライドマスターの背景情報を抽出する。
 *
 * 探索順序:
 * 1. `ppt/slideMasters/slideMaster1.xml` の `p:bg > p:bgPr`
 * 2. 各スライドレイアウト (`ppt/slideLayouts/slideLayoutN.xml`) の `p:bg > p:bgPr`
 *
 * サポートする背景:
 * - 単色塗りつぶし (`a:solidFill` / `a:srgbClr`)
 * - 画像背景 (`a:blipFill` / `a:blip`)
 *
 * @returns 背景情報。背景が設定されていない場合は `undefined`。
 */
export async function parseMasterPptx(
  pptxBuffer: ArrayBuffer | Uint8Array,
): Promise<SlideMasterBackground | undefined> {
  const JSZip = await loadJSZip();
  const zip = await JSZip.loadAsync(pptxBuffer);

  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

  // 1. スライドマスター本体を探索
  const masterFile = zip.file("ppt/slideMasters/slideMaster1.xml");
  if (masterFile) {
    const masterXml = await masterFile.async("text");
    const parsed = xmlParser.parse(masterXml);
    const bgPr = parsed?.["p:sldMaster"]?.["p:cSld"]?.["p:bg"]?.["p:bgPr"];
    const result = await extractBackgroundFromBgPr(
      bgPr,
      zip,
      "ppt/slideMasters/_rels/slideMaster1.xml.rels",
      "ppt/slideMasters/",
    );
    if (result) return result;
  }

  // 2. スライドレイアウトを探索
  const layoutFiles = Object.keys(zip.files).filter(
    (f) => f.startsWith("ppt/slideLayouts/slideLayout") && f.endsWith(".xml"),
  );
  // 番号順にソート（数値ソートで slideLayout2 < slideLayout10 の順序を保証）
  layoutFiles.sort((a, b) => {
    const numA = parseInt(a.match(/slideLayout(\d+)\.xml$/)?.[1] ?? "0", 10);
    const numB = parseInt(b.match(/slideLayout(\d+)\.xml$/)?.[1] ?? "0", 10);
    return numA - numB;
  });

  for (const layoutPath of layoutFiles) {
    const layoutFile = zip.file(layoutPath);
    if (!layoutFile) continue;

    const layoutXml = await layoutFile.async("text");
    const parsed = xmlParser.parse(layoutXml);
    const bgPr = parsed?.["p:sldLayout"]?.["p:cSld"]?.["p:bg"]?.["p:bgPr"];
    const fileName = layoutPath.split("/").pop()!;
    const relsPath = `ppt/slideLayouts/_rels/${fileName}.rels`;
    const result = await extractBackgroundFromBgPr(
      bgPr,
      zip,
      relsPath,
      "ppt/slideLayouts/",
    );
    if (result) return result;
  }

  /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

  return undefined;
}
