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

  // ===== 子要素記法 =====
  describe("子要素記法", () => {
    // ----- ProcessArrow -----
    describe("ProcessArrow", () => {
      it("Step 子要素から steps を構築する", () => {
        const xml = `
          <ProcessArrow direction="horizontal">
            <Step label="Plan" color="1D4ED8" />
            <Step label="Build" color="0EA5E9" />
            <Step label="Launch" />
          </ProcessArrow>
        `;
        const result = parseXml(xml);
        expect(result).toEqual([
          {
            type: "processArrow",
            direction: "horizontal",
            steps: [
              { label: "Plan", color: "1D4ED8" },
              { label: "Build", color: "0EA5E9" },
              { label: "Launch" },
            ],
          },
        ]);
      });

      it("textColor 属性も正しく変換する", () => {
        const xml = `
          <ProcessArrow>
            <Step label="A" textColor="FFFFFF" />
          </ProcessArrow>
        `;
        const result = parseXml(xml);
        expect(
          (
            (result[0] as Record<string, unknown>).steps as Record<
              string,
              unknown
            >[]
          )[0].textColor,
        ).toBe("FFFFFF");
      });

      it("JSON 属性のみでも引き続き動作する（後方互換性）", () => {
        const steps = JSON.stringify([
          { label: "Step 1" },
          { label: "Step 2" },
        ]);
        const result = parseXml(`<ProcessArrow steps='${steps}' />`);
        expect((result[0] as Record<string, unknown>).steps).toEqual([
          { label: "Step 1" },
          { label: "Step 2" },
        ]);
      });

      it("未知の子タグでエラーをスローする", () => {
        expect(() =>
          parseXml('<ProcessArrow><Unknown label="X" /></ProcessArrow>'),
        ).toThrow(
          "Unknown child element <Unknown> inside <ProcessArrow>. Expected: <Step>",
        );
      });
    });

    // ----- Timeline -----
    describe("Timeline", () => {
      it("TimelineItem 子要素から items を構築する", () => {
        const xml = `
          <Timeline direction="horizontal">
            <TimelineItem date="2024-01" title="Launch" description="Product launch" color="1D4ED8" />
            <TimelineItem date="2024-06" title="Update" />
          </Timeline>
        `;
        const result = parseXml(xml);
        expect(result).toEqual([
          {
            type: "timeline",
            direction: "horizontal",
            items: [
              {
                date: "2024-01",
                title: "Launch",
                description: "Product launch",
                color: "1D4ED8",
              },
              { date: "2024-06", title: "Update" },
            ],
          },
        ]);
      });

      it("JSON 属性のみでも引き続き動作する（後方互換性）", () => {
        const items = JSON.stringify([{ date: "2024-01", title: "Start" }]);
        const result = parseXml(`<Timeline items='${items}' />`);
        expect((result[0] as Record<string, unknown>).items).toEqual([
          { date: "2024-01", title: "Start" },
        ]);
      });

      it("未知の子タグでエラーをスローする", () => {
        expect(() =>
          parseXml('<Timeline><Unknown date="X" /></Timeline>'),
        ).toThrow(
          "Unknown child element <Unknown> inside <Timeline>. Expected: <TimelineItem>",
        );
      });
    });

    // ----- Matrix -----
    describe("Matrix", () => {
      it("Axes/Quadrants/MatrixItem 子要素から構築する", () => {
        const xml = `
          <Matrix>
            <Axes x="Impact" y="Effort" />
            <Quadrants topLeft="Quick Wins" topRight="Major Projects" bottomLeft="Fill-Ins" bottomRight="Thankless Tasks" />
            <MatrixItem label="Feature A" x="0.8" y="0.2" color="1D4ED8" />
            <MatrixItem label="Feature B" x="0.3" y="0.7" />
          </Matrix>
        `;
        const result = parseXml(xml);
        expect(result).toEqual([
          {
            type: "matrix",
            axes: { x: "Impact", y: "Effort" },
            quadrants: {
              topLeft: "Quick Wins",
              topRight: "Major Projects",
              bottomLeft: "Fill-Ins",
              bottomRight: "Thankless Tasks",
            },
            items: [
              { label: "Feature A", x: 0.8, y: 0.2, color: "1D4ED8" },
              { label: "Feature B", x: 0.3, y: 0.7 },
            ],
          },
        ]);
      });

      it("Quadrants なしでも動作する", () => {
        const xml = `
          <Matrix>
            <Axes x="X" y="Y" />
            <MatrixItem label="A" x="0.5" y="0.5" />
          </Matrix>
        `;
        const result = parseXml(xml);
        const node = result[0] as Record<string, unknown>;
        expect(node.axes).toEqual({ x: "X", y: "Y" });
        expect(node.quadrants).toBeUndefined();
        expect(node.items).toEqual([{ label: "A", x: 0.5, y: 0.5 }]);
      });

      it("JSON 属性のみでも引き続き動作する（後方互換性）", () => {
        const axes = JSON.stringify({ x: "X", y: "Y" });
        const items = JSON.stringify([{ label: "A", x: 0.5, y: 0.5 }]);
        const result = parseXml(`<Matrix axes='${axes}' items='${items}' />`);
        const node = result[0] as Record<string, unknown>;
        expect(node.axes).toEqual({ x: "X", y: "Y" });
        expect(node.items).toEqual([{ label: "A", x: 0.5, y: 0.5 }]);
      });

      it("未知の子タグでエラーをスローする", () => {
        expect(() => parseXml('<Matrix><Unknown x="X" /></Matrix>')).toThrow(
          "Unknown child element <Unknown> inside <Matrix>. Expected: <Axes>, <Quadrants>, or <MatrixItem>",
        );
      });
    });

    // ----- Flow -----
    describe("Flow", () => {
      it("FlowNode/Connection 子要素から構築する", () => {
        const xml = `
          <Flow direction="vertical">
            <FlowNode id="start" shape="flowChartTerminator" text="Start" />
            <FlowNode id="process" shape="flowChartProcess" text="Process" color="1D4ED8" />
            <Connection from="start" to="process" label="next" />
          </Flow>
        `;
        const result = parseXml(xml);
        expect(result).toEqual([
          {
            type: "flow",
            direction: "vertical",
            nodes: [
              {
                id: "start",
                shape: "flowChartTerminator",
                text: "Start",
              },
              {
                id: "process",
                shape: "flowChartProcess",
                text: "Process",
                color: "1D4ED8",
              },
            ],
            connections: [{ from: "start", to: "process", label: "next" }],
          },
        ]);
      });

      it("FlowNode と Connection の混在順序を許容する", () => {
        const xml = `
          <Flow>
            <FlowNode id="a" shape="flowChartProcess" text="A" />
            <Connection from="a" to="b" />
            <FlowNode id="b" shape="flowChartProcess" text="B" />
          </Flow>
        `;
        const result = parseXml(xml);
        const node = result[0] as Record<string, unknown>;
        expect(node.nodes).toHaveLength(2);
        expect(node.connections).toHaveLength(1);
      });

      it("FlowNode の数値属性を正しく変換する", () => {
        const xml = `
          <Flow>
            <FlowNode id="a" shape="flowChartProcess" text="A" width="200" height="100" />
          </Flow>
        `;
        const result = parseXml(xml);
        const nodes = (result[0] as Record<string, unknown>).nodes as Record<
          string,
          unknown
        >[];
        expect(nodes[0].width).toBe(200);
        expect(nodes[0].height).toBe(100);
      });

      it("JSON 属性のみでも引き続き動作する（後方互換性）", () => {
        const nodes = JSON.stringify([
          { id: "1", shape: "flowChartProcess", text: "A" },
        ]);
        const connections = JSON.stringify([{ from: "1", to: "2" }]);
        const result = parseXml(
          `<Flow nodes='${nodes}' connections='${connections}' />`,
        );
        const node = result[0] as Record<string, unknown>;
        expect(node.nodes).toEqual([
          { id: "1", shape: "flowChartProcess", text: "A" },
        ]);
        expect(node.connections).toEqual([{ from: "1", to: "2" }]);
      });

      it("未知の子タグでエラーをスローする", () => {
        expect(() => parseXml('<Flow><Unknown id="x" /></Flow>')).toThrow(
          "Unknown child element <Unknown> inside <Flow>. Expected: <FlowNode> or <Connection>",
        );
      });
    });

    // ----- Chart -----
    describe("Chart", () => {
      it("Series/DataPoint 子要素から data を構築する", () => {
        const xml = `
          <Chart chartType="bar">
            <Series name="Q1">
              <DataPoint label="1月" value="100" />
              <DataPoint label="2月" value="120" />
              <DataPoint label="3月" value="90" />
            </Series>
          </Chart>
        `;
        const result = parseXml(xml);
        expect(result).toEqual([
          {
            type: "chart",
            chartType: "bar",
            data: [
              {
                name: "Q1",
                labels: ["1月", "2月", "3月"],
                values: [100, 120, 90],
              },
            ],
          },
        ]);
      });

      it("複数 Series を処理する", () => {
        const xml = `
          <Chart chartType="line">
            <Series name="2023">
              <DataPoint label="Q1" value="100" />
              <DataPoint label="Q2" value="200" />
            </Series>
            <Series name="2024">
              <DataPoint label="Q1" value="150" />
              <DataPoint label="Q2" value="250" />
            </Series>
          </Chart>
        `;
        const result = parseXml(xml);
        const data = (result[0] as Record<string, unknown>).data as Record<
          string,
          unknown
        >[];
        expect(data).toHaveLength(2);
        expect(data[0].name).toBe("2023");
        expect(data[1].name).toBe("2024");
      });

      it("name なしの Series を処理する", () => {
        const xml = `
          <Chart chartType="pie">
            <Series>
              <DataPoint label="A" value="60" />
              <DataPoint label="B" value="40" />
            </Series>
          </Chart>
        `;
        const result = parseXml(xml);
        const data = (result[0] as Record<string, unknown>).data as Record<
          string,
          unknown
        >[];
        expect(data[0].name).toBeUndefined();
        expect(data[0].labels).toEqual(["A", "B"]);
        expect(data[0].values).toEqual([60, 40]);
      });

      it("JSON 属性のみでも引き続き動作する（後方互換性）", () => {
        const data = JSON.stringify([
          { name: "S1", labels: ["A"], values: [1] },
        ]);
        const result = parseXml(`<Chart chartType="bar" data='${data}' />`);
        expect((result[0] as Record<string, unknown>).data).toEqual([
          { name: "S1", labels: ["A"], values: [1] },
        ]);
      });

      it("Chart 内の未知タグでエラーをスローする", () => {
        expect(() =>
          parseXml('<Chart chartType="bar"><Unknown /></Chart>'),
        ).toThrow(
          "Unknown child element <Unknown> inside <Chart>. Expected: <Series>",
        );
      });

      it("Series 内の未知タグでエラーをスローする", () => {
        expect(() =>
          parseXml(
            '<Chart chartType="bar"><Series><Unknown /></Series></Chart>',
          ),
        ).toThrow(
          "Unknown child element <Unknown> inside <Series>. Expected: <DataPoint>",
        );
      });
    });

    // ----- Table -----
    describe("Table", () => {
      it("Column/Row/Cell 子要素から columns/rows を構築する", () => {
        const xml = `
          <Table>
            <Column width="200" />
            <Column width="100" />
            <Row>
              <Cell>太郎</Cell>
              <Cell>30</Cell>
            </Row>
            <Row>
              <Cell>花子</Cell>
              <Cell>25</Cell>
            </Row>
          </Table>
        `;
        const result = parseXml(xml);
        expect(result).toEqual([
          {
            type: "table",
            columns: [{ width: 200 }, { width: 100 }],
            rows: [
              { cells: [{ text: "太郎" }, { text: "30" }] },
              { cells: [{ text: "花子" }, { text: "25" }] },
            ],
          },
        ]);
      });

      it("Cell に属性（fontPx, bold等）を設定する", () => {
        const xml = `
          <Table>
            <Column width="200" />
            <Row>
              <Cell fontPx="14" bold="true" color="FF0000">Header</Cell>
            </Row>
          </Table>
        `;
        const result = parseXml(xml);
        const rows = (result[0] as Record<string, unknown>).rows as Record<
          string,
          unknown
        >[];
        const cells = rows[0].cells as Record<string, unknown>[];
        expect(cells[0]).toEqual({
          text: "Header",
          fontPx: 14,
          bold: true,
          color: "FF0000",
        });
      });

      it("Cell の text 属性がテキストコンテンツより優先される", () => {
        const xml = `
          <Table>
            <Column />
            <Row>
              <Cell text="from attr">from content</Cell>
            </Row>
          </Table>
        `;
        const result = parseXml(xml);
        const rows = (result[0] as Record<string, unknown>).rows as Record<
          string,
          unknown
        >[];
        const cells = rows[0].cells as Record<string, unknown>[];
        expect(cells[0].text).toBe("from attr");
      });

      it("Row に height 属性を設定する", () => {
        const xml = `
          <Table>
            <Column />
            <Row height="50">
              <Cell>A</Cell>
            </Row>
          </Table>
        `;
        const result = parseXml(xml);
        const rows = (result[0] as Record<string, unknown>).rows as Record<
          string,
          unknown
        >[];
        expect(rows[0].height).toBe(50);
      });

      it("Column なしで Row のみを指定する", () => {
        const xml = `
          <Table>
            <Row>
              <Cell>A</Cell>
              <Cell>B</Cell>
            </Row>
          </Table>
        `;
        const result = parseXml(xml);
        const node = result[0] as Record<string, unknown>;
        expect(node.columns).toBeUndefined();
        expect(node.rows).toEqual([{ cells: [{ text: "A" }, { text: "B" }] }]);
      });

      it("JSON 属性のみでも引き続き動作する（後方互換性）", () => {
        const columns = JSON.stringify([{ width: 100 }]);
        const rows = JSON.stringify([{ cells: [{ text: "A" }] }]);
        const result = parseXml(
          `<Table columns='${columns}' rows='${rows}' />`,
        );
        const node = result[0] as Record<string, unknown>;
        expect(node.columns).toEqual([{ width: 100 }]);
        expect(node.rows).toEqual([{ cells: [{ text: "A" }] }]);
      });

      it("Row 内の未知タグでエラーをスローする", () => {
        expect(() =>
          parseXml("<Table><Row><Unknown>x</Unknown></Row></Table>"),
        ).toThrow(
          "Unknown child element <Unknown> inside <Row>. Expected: <Cell>",
        );
      });

      it("Table 内の未知タグでエラーをスローする", () => {
        expect(() =>
          parseXml('<Table><Unknown width="100" /></Table>'),
        ).toThrow(
          "Unknown child element <Unknown> inside <Table>. Expected: <Column> or <Row>",
        );
      });
    });

    // ----- Tree -----
    describe("Tree", () => {
      it("TreeItem の再帰的なネストを処理する", () => {
        const xml = `
          <Tree layout="vertical">
            <TreeItem label="CEO" color="1D4ED8">
              <TreeItem label="CTO">
                <TreeItem label="Dev Lead" />
              </TreeItem>
              <TreeItem label="CFO" />
            </TreeItem>
          </Tree>
        `;
        const result = parseXml(xml);
        expect(result).toEqual([
          {
            type: "tree",
            layout: "vertical",
            data: {
              label: "CEO",
              color: "1D4ED8",
              children: [
                {
                  label: "CTO",
                  children: [{ label: "Dev Lead" }],
                },
                { label: "CFO" },
              ],
            },
          },
        ]);
      });

      it("子要素なしの TreeItem（リーフノード）を処理する", () => {
        const xml = `
          <Tree>
            <TreeItem label="Root" />
          </Tree>
        `;
        const result = parseXml(xml);
        expect((result[0] as Record<string, unknown>).data).toEqual({
          label: "Root",
        });
      });

      it("JSON 属性のみでも引き続き動作する（後方互換性）", () => {
        const data = JSON.stringify({
          label: "Root",
          children: [{ label: "A" }],
        });
        const result = parseXml(`<Tree data='${data}' />`);
        expect((result[0] as Record<string, unknown>).data).toEqual({
          label: "Root",
          children: [{ label: "A" }],
        });
      });

      it("Tree に複数の TreeItem があるとエラーをスローする", () => {
        expect(() =>
          parseXml('<Tree><TreeItem label="A" /><TreeItem label="B" /></Tree>'),
        ).toThrow(
          "<Tree> must have exactly 1 <TreeItem> child element, but got 2",
        );
      });

      it("Tree 内の未知タグでエラーをスローする", () => {
        expect(() => parseXml('<Tree><Unknown label="X" /></Tree>')).toThrow(
          "Unknown child element <Unknown> inside <Tree>. Expected: <TreeItem>",
        );
      });

      it("TreeItem 内の未知タグでエラーをスローする", () => {
        expect(() =>
          parseXml(
            '<Tree><TreeItem label="Root"><Unknown label="X" /></TreeItem></Tree>',
          ),
        ).toThrow(
          "Unknown child element <Unknown> inside <TreeItem>. Expected: <TreeItem>",
        );
      });
    });

    // ----- コンテナ内でのネスト -----
    describe("コンテナ内でのネスト", () => {
      it("VStack 内で Chart の子要素記法を使用できる", () => {
        const xml = `
          <VStack gap="16">
            <Text fontPx="24" bold="true">売上</Text>
            <Chart chartType="bar" w="400" h="300">
              <Series name="Q1">
                <DataPoint label="1月" value="100" />
              </Series>
            </Chart>
          </VStack>
        `;
        const result = parseXml(xml);
        expect(result).toEqual([
          {
            type: "vstack",
            gap: 16,
            children: [
              { type: "text", text: "売上", fontPx: 24, bold: true },
              {
                type: "chart",
                chartType: "bar",
                w: 400,
                h: 300,
                data: [{ name: "Q1", labels: ["1月"], values: [100] }],
              },
            ],
          },
        ]);
      });

      it("HStack 内で Table の子要素記法を使用できる", () => {
        const xml = `
          <HStack gap="16">
            <Table>
              <Column width="200" />
              <Row><Cell>A</Cell></Row>
            </Table>
            <Text>Notes</Text>
          </HStack>
        `;
        const result = parseXml(xml);
        expect(result).toEqual([
          {
            type: "hstack",
            gap: 16,
            children: [
              {
                type: "table",
                columns: [{ width: 200 }],
                rows: [{ cells: [{ text: "A" }] }],
              },
              { type: "text", text: "Notes" },
            ],
          },
        ]);
      });
    });
  });
});
