import { describe, it, expect } from "vitest";
import { parseXml } from "./parseXml.ts";

describe("parseXml", () => {
  // ===== 基本的なノード変換 =====
  describe("ノードタイプ変換", () => {
    it("Text ノードを変換する", () => {
      const result = parseXml('<Text fontPx="32" bold="true">Hello</Text>');
      expect(result).toEqual([
        { type: "text", text: "Hello", fontPx: 32, bold: true },
      ]);
    });

    it("Image ノードを変換する（self-closing）", () => {
      const result = parseXml('<Image src="image.png" w="400" h="300" />');
      expect(result).toEqual([
        { type: "image", src: "image.png", w: 400, h: 300 },
      ]);
    });

    it("Shape ノードを変換する", () => {
      const result = parseXml(
        '<Shape shapeType="rect" w="200" h="100">Hello</Shape>',
      );
      expect(result).toEqual([
        { type: "shape", shapeType: "rect", w: 200, h: 100, text: "Hello" },
      ]);
    });

    it("Chart ノードを変換する", () => {
      const data = JSON.stringify([
        { name: "Q1", labels: ["1月", "2月"], values: [100, 120] },
      ]);
      const result = parseXml(
        `<Chart chartType="bar" w="400" h="300" data='${data}' />`,
      );
      expect(result).toEqual([
        {
          type: "chart",
          chartType: "bar",
          w: 400,
          h: 300,
          data: [{ name: "Q1", labels: ["1月", "2月"], values: [100, 120] }],
        },
      ]);
    });

    it("Timeline ノードを変換する", () => {
      const items = JSON.stringify([
        { date: "2024-01", title: "Start" },
        { date: "2024-06", title: "End" },
      ]);
      const result = parseXml(
        `<Timeline direction="horizontal" items='${items}' />`,
      );
      expect(result).toEqual([
        {
          type: "timeline",
          direction: "horizontal",
          items: [
            { date: "2024-01", title: "Start" },
            { date: "2024-06", title: "End" },
          ],
        },
      ]);
    });

    it("Matrix ノードを変換する", () => {
      const axes = JSON.stringify({ x: "Impact", y: "Effort" });
      const items = JSON.stringify([{ label: "A", x: 0.5, y: 0.5 }]);
      const result = parseXml(`<Matrix axes='${axes}' items='${items}' />`);
      expect(result).toEqual([
        {
          type: "matrix",
          axes: { x: "Impact", y: "Effort" },
          items: [{ label: "A", x: 0.5, y: 0.5 }],
        },
      ]);
    });

    it("Tree ノードを変換する", () => {
      const data = JSON.stringify({
        label: "Root",
        children: [{ label: "A" }, { label: "B" }],
      });
      const result = parseXml(`<Tree layout="vertical" data='${data}' />`);
      expect(result).toEqual([
        {
          type: "tree",
          layout: "vertical",
          data: {
            label: "Root",
            children: [{ label: "A" }, { label: "B" }],
          },
        },
      ]);
    });

    it("Flow ノードを変換する", () => {
      const nodes = JSON.stringify([
        { id: "1", shape: "flowChartProcess", text: "Start" },
        { id: "2", shape: "flowChartProcess", text: "End" },
      ]);
      const connections = JSON.stringify([{ from: "1", to: "2" }]);
      const result = parseXml(
        `<Flow direction="horizontal" nodes='${nodes}' connections='${connections}' />`,
      );
      expect(result).toEqual([
        {
          type: "flow",
          direction: "horizontal",
          nodes: [
            { id: "1", shape: "flowChartProcess", text: "Start" },
            { id: "2", shape: "flowChartProcess", text: "End" },
          ],
          connections: [{ from: "1", to: "2" }],
        },
      ]);
    });

    it("ProcessArrow ノードを変換する", () => {
      const steps = JSON.stringify([{ label: "Step 1" }, { label: "Step 2" }]);
      const result = parseXml(
        `<ProcessArrow direction="horizontal" steps='${steps}' gap="16" />`,
      );
      expect(result).toEqual([
        {
          type: "processArrow",
          direction: "horizontal",
          steps: [{ label: "Step 1" }, { label: "Step 2" }],
          gap: 16,
        },
      ]);
    });

    it("Line ノードを変換する", () => {
      const result = parseXml(
        '<Line x1="0" y1="0" x2="100" y2="100" color="FF0000" lineWidth="2" />',
      );
      expect(result).toEqual([
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 100,
          y2: 100,
          color: "FF0000",
          lineWidth: 2,
        },
      ]);
    });

    it("Table ノードを変換する", () => {
      const columns = JSON.stringify([{ width: 100 }, { width: 200 }]);
      const rows = JSON.stringify([{ cells: [{ text: "A" }, { text: "B" }] }]);
      const result = parseXml(`<Table columns='${columns}' rows='${rows}' />`);
      expect(result).toEqual([
        {
          type: "table",
          columns: [{ width: 100 }, { width: 200 }],
          rows: [{ cells: [{ text: "A" }, { text: "B" }] }],
        },
      ]);
    });
  });

  // ===== コンテナノード =====
  describe("コンテナノード", () => {
    it("VStack で children を配列として変換する", () => {
      const xml = `
        <VStack gap="16">
          <Text>A</Text>
          <Text>B</Text>
        </VStack>
      `;
      const result = parseXml(xml);
      expect(result).toEqual([
        {
          type: "vstack",
          gap: 16,
          children: [
            { type: "text", text: "A" },
            { type: "text", text: "B" },
          ],
        },
      ]);
    });

    it("HStack で children を配列として変換する", () => {
      const xml = `
        <HStack gap="8" alignItems="center">
          <Text>Left</Text>
          <Text>Right</Text>
        </HStack>
      `;
      const result = parseXml(xml);
      expect(result).toEqual([
        {
          type: "hstack",
          gap: 8,
          alignItems: "center",
          children: [
            { type: "text", text: "Left" },
            { type: "text", text: "Right" },
          ],
        },
      ]);
    });

    it("Box で children を単一ノードとして変換する", () => {
      const xml = `
        <Box padding="20" backgroundColor="FFFFFF">
          <Text>Content</Text>
        </Box>
      `;
      const result = parseXml(xml);
      expect(result).toEqual([
        {
          type: "box",
          padding: 20,
          backgroundColor: "FFFFFF",
          children: { type: "text", text: "Content" },
        },
      ]);
    });

    it("Layer で children を配列として変換する", () => {
      const xml = `
        <Layer w="800" h="600">
          <Text x="10" y="20" fontPx="32">Hello</Text>
          <Image x="100" y="200" src="img.png" />
        </Layer>
      `;
      const result = parseXml(xml);
      expect(result).toEqual([
        {
          type: "layer",
          w: 800,
          h: 600,
          children: [
            { type: "text", x: 10, y: 20, fontPx: 32, text: "Hello" },
            { type: "image", x: 100, y: 200, src: "img.png" },
          ],
        },
      ]);
    });
  });

  // ===== 属性値の型変換 =====
  describe("属性値の型変換", () => {
    it("number 型に変換する", () => {
      const result = parseXml('<Text fontPx="24">test</Text>');
      expect(result[0]).toHaveProperty("fontPx", 24);
      expect(typeof (result[0] as Record<string, unknown>).fontPx).toBe(
        "number",
      );
    });

    it("boolean 型に変換する", () => {
      const result = parseXml('<Text bold="true" italic="false">test</Text>');
      expect(result[0]).toHaveProperty("bold", true);
      expect(result[0]).toHaveProperty("italic", false);
    });

    it("string 型をそのまま保持する", () => {
      const result = parseXml('<Text color="FF0000">test</Text>');
      expect(result[0]).toHaveProperty("color", "FF0000");
      expect(typeof (result[0] as Record<string, unknown>).color).toBe(
        "string",
      );
    });

    it("array 型を JSON.parse で変換する", () => {
      const data = JSON.stringify([{ name: "S1", labels: ["A"], values: [1] }]);
      const result = parseXml(`<Chart chartType="bar" data='${data}' />`);
      expect((result[0] as Record<string, unknown>).data).toEqual([
        { name: "S1", labels: ["A"], values: [1] },
      ]);
    });

    it("object 型を JSON.parse で変換する", () => {
      const border = JSON.stringify({ color: "000000", width: 2 });
      const result = parseXml(`<Text border='${border}'>test</Text>`);
      expect((result[0] as Record<string, unknown>).border).toEqual({
        color: "000000",
        width: 2,
      });
    });

    it("union 型（number | string）の length を正しく変換する", () => {
      // number
      const r1 = parseXml('<Text w="400">test</Text>');
      expect((r1[0] as Record<string, unknown>).w).toBe(400);

      // literal "max"
      const r2 = parseXml('<Text w="max">test</Text>');
      expect((r2[0] as Record<string, unknown>).w).toBe("max");

      // percentage string
      const r3 = parseXml('<Text w="50%">test</Text>');
      expect((r3[0] as Record<string, unknown>).w).toBe("50%");
    });

    it("union 型（boolean | object）の underline を正しく変換する", () => {
      // boolean
      const r1 = parseXml('<Text underline="true">test</Text>');
      expect((r1[0] as Record<string, unknown>).underline).toBe(true);

      // object
      const obj = JSON.stringify({ style: "dbl", color: "FF0000" });
      const r2 = parseXml(`<Text underline='${obj}'>test</Text>`);
      expect((r2[0] as Record<string, unknown>).underline).toEqual({
        style: "dbl",
        color: "FF0000",
      });
    });

    it("union 型（boolean | object）の bullet を正しく変換する", () => {
      const r1 = parseXml('<Text bullet="true">test</Text>');
      expect((r1[0] as Record<string, unknown>).bullet).toBe(true);

      const obj = JSON.stringify({ type: "number", numberStartAt: 1 });
      const r2 = parseXml(`<Text bullet='${obj}'>test</Text>`);
      expect((r2[0] as Record<string, unknown>).bullet).toEqual({
        type: "number",
        numberStartAt: 1,
      });
    });

    it("enum 型をそのまま文字列として保持する", () => {
      const result = parseXml('<Text alignText="center">test</Text>');
      expect((result[0] as Record<string, unknown>).alignText).toBe("center");
    });

    it("padding の number 変換", () => {
      const r1 = parseXml('<VStack padding="32"><Text>A</Text></VStack>');
      expect((r1[0] as Record<string, unknown>).padding).toBe(32);
    });

    it("padding の object 変換", () => {
      const padding = JSON.stringify({ top: 10, bottom: 20 });
      const r = parseXml(
        `<VStack padding='${padding}'><Text>A</Text></VStack>`,
      );
      expect((r[0] as Record<string, unknown>).padding).toEqual({
        top: 10,
        bottom: 20,
      });
    });

    it("opacity を number に変換する", () => {
      const result = parseXml('<Text opacity="0.5">test</Text>');
      expect((result[0] as Record<string, unknown>).opacity).toBe(0.5);
    });
  });

  // ===== テキストコンテンツの扱い =====
  describe("テキストコンテンツ", () => {
    it("Text ノードのテキストコンテンツを text プロパティに設定する", () => {
      const result = parseXml("<Text>Hello World</Text>");
      expect(result[0]).toHaveProperty("text", "Hello World");
    });

    it("Shape ノードのテキストコンテンツを text プロパティに設定する", () => {
      const result = parseXml('<Shape shapeType="rect">Hello</Shape>');
      expect(result[0]).toHaveProperty("text", "Hello");
    });

    it("text 属性がある場合はテキストコンテンツで上書きしない", () => {
      const result = parseXml('<Text text="from attr">from content</Text>');
      expect(result[0]).toHaveProperty("text", "from attr");
    });

    it("self-closing の Text で text 属性を使用する", () => {
      const result = parseXml('<Text text="hello" fontPx="16" />');
      expect(result[0]).toHaveProperty("text", "hello");
    });
  });

  // ===== ネスト構造 =====
  describe("ネスト構造", () => {
    it("深いネスト構造を正しく変換する", () => {
      const xml = `
        <VStack gap="16" padding="32">
          <Text fontPx="32" bold="true">Title</Text>
          <HStack gap="16">
            <Text fontPx="18" color="00AA00">Left</Text>
            <Text fontPx="18">Right</Text>
          </HStack>
        </VStack>
      `;
      const result = parseXml(xml);
      expect(result).toEqual([
        {
          type: "vstack",
          gap: 16,
          padding: 32,
          children: [
            { type: "text", text: "Title", fontPx: 32, bold: true },
            {
              type: "hstack",
              gap: 16,
              children: [
                { type: "text", text: "Left", fontPx: 18, color: "00AA00" },
                { type: "text", text: "Right", fontPx: 18 },
              ],
            },
          ],
        },
      ]);
    });

    it("Box の中にコンテナノードをネストできる", () => {
      const xml = `
        <Box padding="20">
          <VStack gap="8">
            <Text>A</Text>
            <Text>B</Text>
          </VStack>
        </Box>
      `;
      const result = parseXml(xml);
      expect(result).toEqual([
        {
          type: "box",
          padding: 20,
          children: {
            type: "vstack",
            gap: 8,
            children: [
              { type: "text", text: "A" },
              { type: "text", text: "B" },
            ],
          },
        },
      ]);
    });
  });

  // ===== コンポーネント変換 =====
  describe("コンポーネント変換", () => {
    it("組み込みノード以外のタグをコンポーネントとして変換する", () => {
      const xml = '<SectionCard title="KPI Summary" padding="20" />';
      const result = parseXml(xml);
      expect(result).toEqual([
        {
          type: "component",
          name: "SectionCard",
          props: { title: "KPI Summary", padding: 20 },
        },
      ]);
    });

    it("コンポーネントの children を props に含める", () => {
      const xml = `
        <SectionCard title="Report">
          <Text>Revenue: $1M</Text>
        </SectionCard>
      `;
      const result = parseXml(xml);
      expect(result).toEqual([
        {
          type: "component",
          name: "SectionCard",
          props: {
            title: "Report",
            children: [{ type: "text", text: "Revenue: $1M" }],
          },
        },
      ]);
    });

    it("コンポーネントのテキストコンテンツを children に含める", () => {
      const xml = "<Label>Hello</Label>";
      const result = parseXml(xml);
      expect(result).toEqual([
        {
          type: "component",
          name: "Label",
          props: { children: "Hello" },
        },
      ]);
    });

    it("コンポーネントの属性値をフォールバック変換する", () => {
      const xml =
        '<MyComp count="5" visible="true" name="test" data=\'[1,2,3]\' />';
      const result = parseXml(xml);
      const props = (result[0] as Record<string, unknown>).props as Record<
        string,
        unknown
      >;
      expect(props.count).toBe(5);
      expect(props.visible).toBe(true);
      expect(props.name).toBe("test");
      expect(props.data).toEqual([1, 2, 3]);
    });
  });

  // ===== 複数ルート要素 =====
  describe("複数ルート要素", () => {
    it("複数のルート要素を配列として返す", () => {
      const xml = "<Text>Slide 1</Text><Text>Slide 2</Text>";
      const result = parseXml(xml);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ type: "text", text: "Slide 1" });
      expect(result[1]).toEqual({ type: "text", text: "Slide 2" });
    });
  });

  // ===== エッジケース =====
  describe("エッジケース", () => {
    it("空文字列で空配列を返す", () => {
      expect(parseXml("")).toEqual([]);
      expect(parseXml("  ")).toEqual([]);
    });

    it("backgroundImage を object として変換する", () => {
      const bg = JSON.stringify({ src: "bg.png", sizing: "cover" });
      const result = parseXml(
        `<VStack backgroundImage='${bg}'><Text>A</Text></VStack>`,
      );
      expect((result[0] as Record<string, unknown>).backgroundImage).toEqual({
        src: "bg.png",
        sizing: "cover",
      });
    });

    it("shadow を object として変換する", () => {
      const shadow = JSON.stringify({
        type: "outer",
        blur: 4,
        offset: 2,
        color: "000000",
      });
      const result = parseXml(`<Box shadow='${shadow}'><Text>A</Text></Box>`);
      expect((result[0] as Record<string, unknown>).shadow).toEqual({
        type: "outer",
        blur: 4,
        offset: 2,
        color: "000000",
      });
    });

    it("Chart の showLegend, showTitle を boolean に変換する", () => {
      const data = JSON.stringify([{ labels: ["A"], values: [1] }]);
      const result = parseXml(
        `<Chart chartType="pie" data='${data}' showLegend="true" showTitle="false" />`,
      );
      expect((result[0] as Record<string, unknown>).showLegend).toBe(true);
      expect((result[0] as Record<string, unknown>).showTitle).toBe(false);
    });

    it("不正な JSON 属性値でエラーをスローする", () => {
      expect(() =>
        parseXml('<Chart chartType="bar" data="not-json" />'),
      ).toThrow();
    });

    it("Box に複数子要素がある場合エラーをスローする", () => {
      expect(() => parseXml("<Box><Text>A</Text><Text>B</Text></Box>")).toThrow(
        "<Box> must have exactly 1 child element",
      );
    });

    it("boolean の不正値でエラーをスローする", () => {
      expect(() => parseXml('<Text bold="TRUE">x</Text>')).toThrow(
        'Cannot convert "TRUE" to boolean',
      );
      expect(() => parseXml('<Text bold="yes">x</Text>')).toThrow(
        'Cannot convert "yes" to boolean',
      );
    });

    it("Issue の比較例（XML）を正しく変換する", () => {
      const xml = `
        <VStack gap="16" padding="32">
          <Text fontPx="32" bold="true">売上レポート</Text>
          <HStack gap="16">
            <Chart chartType="bar" w="400" h="300"
              data='[{ "name": "Q1", "labels": ["1月","2月","3月"], "values": [100,120,90] }]'
            />
            <Text fontPx="18" color="00AA00">前年比 +15%</Text>
          </HStack>
        </VStack>
      `;
      const result = parseXml(xml);
      expect(result).toEqual([
        {
          type: "vstack",
          gap: 16,
          padding: 32,
          children: [
            {
              type: "text",
              text: "売上レポート",
              fontPx: 32,
              bold: true,
            },
            {
              type: "hstack",
              gap: 16,
              children: [
                {
                  type: "chart",
                  chartType: "bar",
                  w: 400,
                  h: 300,
                  data: [
                    {
                      name: "Q1",
                      labels: ["1月", "2月", "3月"],
                      values: [100, 120, 90],
                    },
                  ],
                },
                {
                  type: "text",
                  text: "前年比 +15%",
                  fontPx: 18,
                  color: "00AA00",
                },
              ],
            },
          ],
        },
      ]);
    });
  });
});
