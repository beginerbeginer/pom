import path from "path";

const LIB_DIR = path.dirname(new URL(import.meta.url).pathname);
const DOCS_DIR = path.dirname(LIB_DIR);
export const IMAGES_DIR = path.join(DOCS_DIR, "images");

// VRT用ディレクトリ
export const EXPECTED_DIR = path.join(IMAGES_DIR, "expected");
export const OUTPUT_DIR = path.join(IMAGES_DIR, "output");
export const ACTUAL_DIR = path.join(OUTPUT_DIR, "actual");
export const DIFF_DIR = path.join(OUTPUT_DIR, "diff");

export const NODE_TYPES = [
  "text",
  "image",
  "table",
  "shape",
  "chart",
  "timeline",
  "matrix",
  "tree",
  "flow",
  "processArrow",
  "pyramid",
  "box",
  "vstack",
  "hstack",
  "icon",
] as const;

export type NodeType = (typeof NODE_TYPES)[number];
