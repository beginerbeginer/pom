import { execSync } from "child_process";
import fs from "fs";
import path from "path";

/**
 * LibreOfficeを使ってPPTXをPDFに変換し、ImageMagickでページごとのPNGに変換
 */
export async function pptxToPng(
  pptxPath: string,
  outputDir: string,
  pageNames: readonly string[],
): Promise<void> {
  const tempDir = path.join(path.dirname(pptxPath), ".pptx-temp");

  // 一時ディレクトリを作成
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true });
  }
  fs.mkdirSync(tempDir, { recursive: true });

  // 出力ディレクトリを作成
  fs.mkdirSync(outputDir, { recursive: true });

  try {
    // 1. LibreOfficeでPPTXをPDFに変換（全ページ含む）
    execSync(
      `soffice --headless --convert-to pdf --outdir "${tempDir}" "${pptxPath}"`,
      { stdio: "inherit" },
    );

    // PDFファイルのパスを取得
    const pptxBasename = path.basename(pptxPath, path.extname(pptxPath));
    const pdfPath = path.join(tempDir, `${pptxBasename}.pdf`);

    if (!fs.existsSync(pdfPath)) {
      throw new Error(`PDF file not generated: ${pdfPath}`);
    }

    // 2. ImageMagickでPDFを各ページごとにPNGに変換
    const pngPrefix = path.join(tempDir, "page");
    execSync(`convert -density 150 "${pdfPath}" "${pngPrefix}-%03d.png"`, {
      stdio: "inherit",
    });

    // 生成されたPNGファイルを取得（ページ順にソート）
    const pngFiles = fs
      .readdirSync(tempDir)
      .filter((f) => f.startsWith("page-") && f.endsWith(".png"))
      .sort();

    if (pngFiles.length === 0) {
      throw new Error("No PNG pages generated from PDF");
    }

    if (pngFiles.length !== pageNames.length) {
      throw new Error(
        `Page count mismatch: generated ${pngFiles.length} pages, expected ${pageNames.length}`,
      );
    }

    // 3. 各ページのPNGを出力ディレクトリにコピー
    for (let i = 0; i < pngFiles.length; i++) {
      const src = path.join(tempDir, pngFiles[i]);
      const dst = path.join(outputDir, `${pageNames[i]}.png`);
      fs.copyFileSync(src, dst);
    }
  } finally {
    // 一時ディレクトリを削除
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true });
    }
  }
}
