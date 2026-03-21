import fs from "fs";
import path from "path";
import { buildPptx } from "../../src/index.js";
import { comparePng } from "../../vrt/lib/comparePng.js";
import { pptxToPng } from "../../vrt/lib/pptxToPng.js";
import {
  ACTUAL_DIR,
  DIFF_DIR,
  EXPECTED_DIR,
  IMAGES_DIR,
  NODE_TYPES,
  OUTPUT_DIR,
  type NodeType,
} from "./config.js";
import { sampleNodes } from "./sampleNodes.js";

const SLIDE_WIDTH = 1280;
const SLIDE_HEIGHT = 720;

async function generateNodeImage(
  nodeType: NodeType,
  outputDir: string,
): Promise<void> {
  const sampleXml = sampleNodes[nodeType];
  const tempPptxPath = path.join(outputDir, `${nodeType}.pptx`);

  // PPTXを生成
  const pptx = await buildPptx(
    sampleXml,
    { w: SLIDE_WIDTH, h: SLIDE_HEIGHT },
    { textMeasurement: "fallback" },
  );

  // PPTXをバッファとして取得
  const pptxBuffer = await pptx.write({ outputType: "nodebuffer" });

  // PPTXファイルを保存
  fs.writeFileSync(tempPptxPath, Buffer.from(pptxBuffer as Uint8Array));

  // PPTX → PNG変換
  await pptxToPng(tempPptxPath, outputDir, [nodeType]);

  // 一時PPTXファイルを削除
  fs.unlinkSync(tempPptxPath);

  console.log(`Generated: ${nodeType}.png`);
}

async function generateImages(outputDir: string): Promise<void> {
  fs.mkdirSync(outputDir, { recursive: true });

  for (const nodeType of NODE_TYPES) {
    await generateNodeImage(nodeType, outputDir);
  }
}

async function runCheck(): Promise<void> {
  console.log("=== Docs Images VRT: Visual Regression Testing ===\n");

  // 1. 一時ディレクトリに画像を生成
  console.log("1. Generating images to temporary directory...");
  fs.mkdirSync(ACTUAL_DIR, { recursive: true });
  fs.mkdirSync(DIFF_DIR, { recursive: true });

  for (const nodeType of NODE_TYPES) {
    await generateNodeImage(nodeType, ACTUAL_DIR);
  }

  // 2. ベースラインと比較
  console.log("\n2. Comparing with baseline...");

  if (!fs.existsSync(EXPECTED_DIR)) {
    console.error(`\nExpected directory not found: ${EXPECTED_DIR}`);
    console.error("Run with --update to create baseline");
    process.exit(1);
  }

  const failedImages: { name: string; diffPixels: number }[] = [];

  console.log("\nResults:");
  for (const nodeType of NODE_TYPES) {
    const actualPath = path.join(ACTUAL_DIR, `${nodeType}.png`);
    const expectedPath = path.join(EXPECTED_DIR, `${nodeType}.png`);
    const diffPath = path.join(DIFF_DIR, `${nodeType}.png`);

    if (!fs.existsSync(expectedPath)) {
      console.log(`  ? ${nodeType} (baseline not found)`);
      failedImages.push({ name: nodeType, diffPixels: -1 });
      continue;
    }

    const diffPixels = comparePng(actualPath, expectedPath, diffPath);

    if (diffPixels > 0) {
      console.log(`  x ${nodeType} (${diffPixels} pixels differ)`);
      failedImages.push({ name: nodeType, diffPixels });
    } else {
      if (fs.existsSync(diffPath)) {
        fs.unlinkSync(diffPath);
      }
      console.log(`  o ${nodeType}`);
    }
  }

  if (failedImages.length > 0) {
    console.error(
      `\nFAILED: ${failedImages.length} of ${NODE_TYPES.length} images differ.`,
    );
    console.error(`Diff images saved in: ${DIFF_DIR}`);
    process.exit(1);
  }

  console.log(
    `\nNo visual differences found. (${NODE_TYPES.length} images checked)`,
  );
}

async function runUpdate(): Promise<void> {
  console.log("Updating docs images baseline...\n");

  // 一時ディレクトリに画像を生成
  fs.mkdirSync(ACTUAL_DIR, { recursive: true });

  for (const nodeType of NODE_TYPES) {
    await generateNodeImage(nodeType, ACTUAL_DIR);
  }

  // ベースラインディレクトリにコピー
  fs.mkdirSync(EXPECTED_DIR, { recursive: true });
  for (const nodeType of NODE_TYPES) {
    const src = path.join(ACTUAL_DIR, `${nodeType}.png`);
    const dst = path.join(EXPECTED_DIR, `${nodeType}.png`);
    fs.copyFileSync(src, dst);
  }

  console.log(`\nBaseline updated: ${EXPECTED_DIR}`);
}

async function runGenerate(): Promise<void> {
  console.log("Generating node images for documentation...\n");

  await generateImages(IMAGES_DIR);

  console.log(`\nAll images generated in: ${IMAGES_DIR}`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.includes("--check")) {
    await runCheck();
  } else if (args.includes("--update")) {
    await runUpdate();
  } else {
    await runGenerate();
  }
}

main().catch((error) => {
  console.error("Error generating node images:", error);
  process.exit(1);
});
