import { describe, it, expect } from "vitest";
import { detectFormat, isPomFile } from "./fileUtils.js";

describe("detectFormat", () => {
  it(".pom.md ファイルは markdown を返す", () => {
    expect(detectFormat("test.pom.md")).toBe("markdown");
  });

  it(".pom.xml ファイルは xml を返す", () => {
    expect(detectFormat("test.pom.xml")).toBe("xml");
  });

  it("パス付き .pom.xml ファイルは xml を返す", () => {
    expect(detectFormat("/path/to/test.pom.xml")).toBe("xml");
  });

  it("その他のファイルは markdown を返す", () => {
    expect(detectFormat("test.md")).toBe("markdown");
  });
});

describe("isPomFile", () => {
  it(".pom.md ファイルは true を返す", () => {
    expect(isPomFile("test.pom.md")).toBe(true);
  });

  it(".pom.xml ファイルは true を返す", () => {
    expect(isPomFile("test.pom.xml")).toBe(true);
  });

  it("通常の .md ファイルは false を返す", () => {
    expect(isPomFile("test.md")).toBe(false);
  });

  it("通常の .xml ファイルは false を返す", () => {
    expect(isPomFile("test.xml")).toBe(false);
  });
});
