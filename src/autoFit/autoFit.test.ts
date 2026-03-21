import { describe, expect, it, vi } from "vitest";
import { walkPOMTree } from "./walkTree.ts";
import { reduceTableRowHeight } from "./strategies/reduceTableRowHeight.ts";
import { reduceFontSize } from "./strategies/reduceFontSize.ts";
import { reduceGapAndPadding } from "./strategies/reduceGapAndPadding.ts";
import { uniformScale } from "./strategies/uniformScale.ts";
import { autoFitSlide } from "./autoFit.ts";
import type { POMNode } from "../types.ts";

// ===== walkTree =====
describe("walkPOMTree", () => {
  it("リーフノードを走査する", () => {
    const node: POMNode = { type: "text", text: "hello" };
    const visited: string[] = [];
    walkPOMTree(node, (n) => visited.push(n.type));
    expect(visited).toEqual(["text"]);
  });

  it("vstack の子を再帰的に走査する", () => {
    const node: POMNode = {
      type: "vstack",
      children: [
        { type: "text", text: "a" },
        { type: "text", text: "b" },
      ],
    };
    const visited: string[] = [];
    walkPOMTree(node, (n) => visited.push(n.type));
    expect(visited).toEqual(["vstack", "text", "text"]);
  });

  it("box の子を走査する", () => {
    const node: POMNode = {
      type: "box",
      children: { type: "text", text: "child" },
    };
    const visited: string[] = [];
    walkPOMTree(node, (n) => visited.push(n.type));
    expect(visited).toEqual(["box", "text"]);
  });

  it("ネストされたツリーを走査する", () => {
    const node: POMNode = {
      type: "vstack",
      children: [
        {
          type: "hstack",
          children: [{ type: "text", text: "nested" }],
        },
      ],
    };
    const visited: string[] = [];
    walkPOMTree(node, (n) => visited.push(n.type));
    expect(visited).toEqual(["vstack", "hstack", "text"]);
  });
});

// ===== reduceTableRowHeight =====
describe("reduceTableRowHeight", () => {
  it("テーブルの defaultRowHeight を縮小する", () => {
    const node: POMNode = {
      type: "table",
      columns: [{}],
      rows: [{ cells: [{ text: "a" }] }],
      defaultRowHeight: 40,
    };
    const changed = reduceTableRowHeight(node, 0.7);
    expect(changed).toBe(true);
    expect(node.defaultRowHeight).toBe(28);
  });

  it("行の height を縮小する", () => {
    const node: POMNode = {
      type: "table",
      columns: [{}],
      rows: [{ cells: [{ text: "a" }], height: 50 }],
    };
    const changed = reduceTableRowHeight(node, 0.8);
    expect(changed).toBe(true);
    expect(node.rows[0].height).toBe(40);
  });

  it("下限値（20px）を下回らない", () => {
    const node: POMNode = {
      type: "table",
      columns: [{}],
      rows: [{ cells: [{ text: "a" }] }],
      defaultRowHeight: 30,
    };
    reduceTableRowHeight(node, 0.5);
    expect(node.defaultRowHeight).toBe(20);
  });

  it("テーブルがない場合は false を返す", () => {
    const node: POMNode = { type: "text", text: "hello" };
    const changed = reduceTableRowHeight(node, 0.7);
    expect(changed).toBe(false);
  });
});

// ===== reduceFontSize =====
describe("reduceFontSize", () => {
  it("テキストの fontSize を縮小する", () => {
    const node: POMNode = { type: "text", text: "hello", fontSize: 24 };
    const changed = reduceFontSize(node, 0.8);
    expect(changed).toBe(true);
    expect(node.fontSize).toBe(19);
  });

  it("下限値（10px）を下回らない", () => {
    const node: POMNode = { type: "text", text: "hello", fontSize: 12 };
    reduceFontSize(node, 0.6);
    expect(node.fontSize).toBe(10);
  });

  it("ul/ol の items の fontSize も縮小する", () => {
    const node: POMNode = {
      type: "ul",
      items: [{ text: "item", fontSize: 20 }],
      fontSize: 20,
    };
    const changed = reduceFontSize(node, 0.8);
    expect(changed).toBe(true);
    expect(node.items[0].fontSize).toBe(16);
    expect(node.fontSize).toBe(16);
  });

  it("table セルの fontSize も縮小する", () => {
    const node: POMNode = {
      type: "table",
      columns: [{}],
      rows: [{ cells: [{ text: "a", fontSize: 14 }] }],
    };
    const changed = reduceFontSize(node, 0.8);
    expect(changed).toBe(true);
    expect(node.rows[0].cells[0].fontSize).toBe(11);
  });

  it("fontSize が未設定のノードは変更しない", () => {
    const node: POMNode = { type: "text", text: "hello" };
    const changed = reduceFontSize(node, 0.8);
    expect(changed).toBe(false);
  });
});

// ===== reduceGapAndPadding =====
describe("reduceGapAndPadding", () => {
  it("vstack の gap を縮小する", () => {
    const node: POMNode = {
      type: "vstack",
      children: [{ type: "text", text: "a" }],
      gap: 16,
    };
    const changed = reduceGapAndPadding(node, 0.7);
    expect(changed).toBe(true);
    expect(node.gap).toBe(11);
  });

  it("数値 padding を縮小する", () => {
    const node: POMNode = {
      type: "vstack",
      children: [],
      padding: 20,
    };
    reduceGapAndPadding(node, 0.5);
    expect(node.padding).toBe(10);
  });

  it("オブジェクト padding の各方向を縮小する", () => {
    const node: POMNode = {
      type: "vstack",
      children: [],
      padding: { top: 20, bottom: 20 },
    };
    reduceGapAndPadding(node, 0.5);
    expect(node.padding).toEqual({ top: 10, bottom: 10 });
  });

  it("下限値（gap=2, padding=2）を下回らない", () => {
    const node: POMNode = {
      type: "vstack",
      children: [],
      gap: 4,
      padding: 4,
    };
    reduceGapAndPadding(node, 0.25);
    expect(node.gap).toBe(2);
    expect(node.padding).toBe(2);
  });
});

// ===== uniformScale =====
describe("uniformScale", () => {
  it("fontSize, gap, padding を一律スケーリングする", () => {
    const node: POMNode = {
      type: "vstack",
      children: [{ type: "text", text: "a", fontSize: 20 }],
      gap: 10,
      padding: 16,
    };
    const changed = uniformScale(node, 0.7);
    expect(changed).toBe(true);
    expect(node.gap).toBe(7);
    expect(node.padding).toBe(11);
    const text = node.children[0];
    if (text.type === "text") {
      expect(text.fontSize).toBe(14);
    }
  });

  it("テーブルの defaultRowHeight もスケーリングする", () => {
    const node: POMNode = {
      type: "table",
      columns: [{}],
      rows: [{ cells: [{ text: "a" }] }],
      defaultRowHeight: 36,
    };
    uniformScale(node, 0.7);
    expect(node.defaultRowHeight).toBe(25);
  });

  it("スケールファクター 0.5 が下限", () => {
    const node: POMNode = {
      type: "vstack",
      children: [{ type: "text", text: "a", fontSize: 20 }],
      gap: 10,
    };
    uniformScale(node, 0.3); // 0.5 にクランプされる
    expect(node.gap).toBe(5);
    const text = node.children[0];
    if (text.type === "text") {
      expect(text.fontSize).toBe(10);
    }
  });

  it("icon の size をスケーリングする", () => {
    const node: POMNode = {
      type: "icon",
      name: "star",
      size: 48,
    };
    const changed = uniformScale(node, 0.7);
    expect(changed).toBe(true);
    expect(node.size).toBe(34);
  });
});

// ===== autoFitSlide 統合テスト =====
describe("autoFitSlide", () => {
  const slideSize = { w: 1280, h: 720 };

  it("オーバーフローしないコンテンツは変更しない", async () => {
    const node: POMNode = {
      type: "vstack",
      children: [{ type: "text", text: "hello", fontSize: 24 }],
      padding: 20,
    };
    await autoFitSlide(node, slideSize);
    // yogaNode がセットされていること（レイアウト計算が完了）
    expect(node.yogaNode).toBeDefined();
    // fontSize は変更されていない
    const text = node.children[0];
    if (text.type === "text") {
      expect(text.fontSize).toBe(24);
    }
  });

  it("テーブルを含むオーバーフローを調整する", async () => {
    // 大量の行を持つテーブルでオーバーフローを発生させる
    const rows = Array.from({ length: 30 }, (_, i) => ({
      cells: [{ text: `row ${i}` }],
    }));
    const node: POMNode = {
      type: "vstack",
      children: [
        {
          type: "table",
          columns: [{}],
          rows,
          defaultRowHeight: 36,
        },
      ],
    };
    await autoFitSlide(node, slideSize);
    expect(node.yogaNode).toBeDefined();
    // defaultRowHeight が縮小されていること
    const table = node.children[0];
    if (table.type === "table") {
      expect(table.defaultRowHeight).toBeLessThan(36);
    }
  });

  it("収束しない場合に警告を出す", async () => {
    // 非常に大量のコンテンツ（全戦略でも収まらない）
    const rows = Array.from({ length: 100 }, (_, i) => ({
      cells: [{ text: `row ${i}` }],
    }));
    const node: POMNode = {
      type: "vstack",
      children: [
        {
          type: "table",
          columns: [{}],
          rows,
          defaultRowHeight: 36,
        },
      ],
      padding: 20,
      gap: 10,
    };
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    await autoFitSlide(node, { w: 1280, h: 200 });
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("[pom] autoFit"),
    );
    warnSpy.mockRestore();
  });
});
