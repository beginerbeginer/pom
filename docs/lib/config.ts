import path from "path";

const LIB_DIR = path.dirname(new URL(import.meta.url).pathname);
const DOCS_DIR = path.dirname(LIB_DIR);
export const IMAGES_DIR = path.join(DOCS_DIR, "images");

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
