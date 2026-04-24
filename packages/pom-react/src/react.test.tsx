/** @jsxImportSource react */
/**
 * @vitest-environment node
 */

import { describe, it, expect } from "vitest";
import React, { createContext, useContext } from "react";
import {
  renderToSerializableNodes,
  ThemeProvider,
  useTheme,
  VStack,
  HStack,
  Text,
  Shape,
} from "./react-renderer.ts";
import { serializeToXml } from "./serializer.ts";

describe("React context による props の共有", () => {
  it("useContext でテーマカラーを参照できる", () => {
    const ThemeCtx = createContext({ primary: "000000" });

    function ThemedBox({ children }: { children?: React.ReactNode }) {
      const { primary } = useContext(ThemeCtx);
      return (
        <VStack backgroundColor={primary as string}>
          {children}
        </VStack>
      );
    }

    const element = (
      <ThemeCtx.Provider value={{ primary: "0E0D6A" }}>
        <ThemedBox />
      </ThemeCtx.Provider>
    );

    const nodes = renderToSerializableNodes(element);
    const xml = serializeToXml(nodes);

    expect(xml).toContain('backgroundColor="0E0D6A"');
  });

  it("Provider の外と中でコンテキスト値が切り替わる", () => {
    const ColorCtx = createContext("FFFFFF");

    function ColoredText({ label }: { label: string }) {
      const color = useContext(ColorCtx);
      return <Text text={label} color={color} />;
    }

    const element = (
      <VStack>
        <ColoredText label="outside" />
        <ColorCtx.Provider value="FF0000">
          <ColoredText label="inside" />
        </ColorCtx.Provider>
      </VStack>
    );

    const nodes = renderToSerializableNodes(element);
    const xml = serializeToXml(nodes);

    expect(xml).toContain('text="outside"');
    expect(xml).toContain('text="inside"');
    expect(xml).toContain("FF0000");
  });
});

describe("React コンポーネントのネスト", () => {
  it("複数階層の関数コンポーネントを正しく展開する", () => {
    function Label({ text }: { text: string }) {
      return <Text fontSize={12} text={text} />;
    }

    function Card({ title }: { title: string }) {
      return (
        <VStack padding={12}>
          <Label text={title} />
        </VStack>
      );
    }

    const element = <Card title="テスト" />;
    const nodes = renderToSerializableNodes(element);
    const xml = serializeToXml(nodes);

    expect(xml).toContain("<VStack");
    expect(xml).toContain('<Text fontSize="12" text="テスト" />');
  });

  it("Fragment で複数スライドを返せる", () => {
    function TwoSlides() {
      return (
        <>
          <VStack w={1280} h={720}><Text text="Slide 1" /></VStack>
          <VStack w={1280} h={720}><Text text="Slide 2" /></VStack>
        </>
      );
    }

    const nodes = renderToSerializableNodes(<TwoSlides />);
    expect(nodes).toHaveLength(2);
    expect(nodes[0].tag).toBe("VStack");
    expect(nodes[1].tag).toBe("VStack");
  });
});

describe("ThemeProvider による一括スタイル適用", () => {
  it("ThemeProvider 経由で useTheme() が使える", () => {
    const theme = {
      colors: { primary: "0E0D6A", white: "FFFFFF" },
      spacing: { md: 16 },
    };

    function SectionHeader({ title }: { title: string }) {
      const { colors, spacing } = useTheme() as typeof theme;
      return (
        <VStack backgroundColor={colors.primary} padding={spacing.md}>
          <Text color={colors.white} text={title} />
        </VStack>
      );
    }

    const element = (
      <ThemeProvider theme={theme}>
        <SectionHeader title="Q3 Results" />
      </ThemeProvider>
    );

    const nodes = renderToSerializableNodes(element);
    const xml = serializeToXml(nodes);

    expect(xml).toContain('backgroundColor="0E0D6A"');
    expect(xml).toContain('color="FFFFFF"');
    expect(xml).toContain('text="Q3 Results"');
    expect(xml).toContain('padding="16"');
  });
});

describe("文字列 children の text prop 昇格", () => {
  it("<Text>文字列</Text> 構文で text prop が設定される", () => {
    const nodes = renderToSerializableNodes(<Text fontSize={12}>Hello World</Text>);
    expect(nodes[0].props.text).toBe("Hello World");
    // children として残らず text prop に昇格していること
    expect(nodes[0].children).toHaveLength(0);
  });

  it("<Shape>文字列</Shape> 構文で text prop が設定される", () => {
    const nodes = renderToSerializableNodes(
      <Shape shapeType="ellipse">42</Shape>
    );
    expect(nodes[0].props.text).toBe("42");
  });

  it("ThemeProvider 配下でも文字列 children の昇格が機能する", () => {
    const theme = { colors: { primary: "0E0D6A" } };
    function Title() {
      const { colors } = useTheme() as typeof theme;
      return <Text color={colors.primary}>タイトル</Text>;
    }
    const xml = serializeToXml(
      renderToSerializableNodes(
        <ThemeProvider theme={theme}><Title /></ThemeProvider>
      )
    );
    expect(xml).toContain('text="タイトル"');
    expect(xml).toContain('color="0E0D6A"');
  });

  it("HStack の文字列 children は昇格しない", () => {
    // TEXT_CONTENT_TAGS に含まれない要素は文字列 children を無視する
    const nodes = renderToSerializableNodes(<HStack gap={8} />);
    expect(nodes[0].props).not.toHaveProperty("text");
  });
});
