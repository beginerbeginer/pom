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
} from "./react-renderer.ts";
import { serializeToXml } from "./serializer.ts";

// ============================================================
// Phase 2-Green: React context / hooks を使えることを検証するテスト
// ============================================================

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

    // outside は default color FFFFFF、inside は FF0000
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
