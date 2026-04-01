/** ファイル名から入力形式を判定する */
export function detectFormat(fileName: string): "markdown" | "xml" {
  if (fileName.endsWith(".pom.xml")) return "xml";
  return "markdown";
}

/** ファイルが pom 対応ファイルかどうかを判定する */
export function isPomFile(fileName: string): boolean {
  return fileName.endsWith(".pom.md") || fileName.endsWith(".pom.xml");
}
