/** @jsxImportSource react */
/**
 * デモ：Q3決算サマリースライドを ThemeProvider + useTheme で書き直したもの。
 * 色・スペーシングをテーマに一元化し、各コンポーネントが useTheme() で参照する。
 *
 * 実行:
 *   cd packages/pom-react
 *   npx tsx --tsconfig tsconfig.demo.json demo.tsx
 */
import React from "react";
import {
  buildPptxFromJsx,
  ThemeProvider,
  useTheme,
  VStack,
  HStack,
  Text,
  Shape,
  Table,
  Chart,
} from "./src/react-renderer.ts";

// ============================================================
// ① テーマ定義（色・スペーシングをここに集約）
// ============================================================

const theme = {
  colors: {
    primary:   "0E0D6A",
    primary2:  "1A1980",
    accent:    "3949AB",
    white:     "FFFFFF",
    lightBlue: "E8EAF6",
    bg:        "F8F9FC",
    border:    "C5CAE9",
    sub:       "5A5A8A",
    green:     "0D7A3E",
    greenBg:   "E3F2E8",
    orange:    "E65100",
    orangeBg:  "FFF3E0",
    text:      "1A1A1A",
  },
  spacing: { sm: 6, md: 12, lg: 16, xl: 24 },
};

type AppTheme = typeof theme;

// ============================================================
// ② 再利用コンポーネント（useTheme で色を参照）
// ============================================================

function SectionHeader({ title }: { title: string }) {
  const { colors, spacing } = useTheme() as AppTheme;
  return (
    <VStack w="max" padding={spacing.md} backgroundColor={colors.primary} border={{ color: colors.primary, width: 1 }}>
      <Text fontSize={14} color={colors.white} textAlign="center" bold>{title}</Text>
    </VStack>
  );
}

function TopicCard({ num, title, body }: { num: string; title: string; body: string }) {
  const { colors, spacing } = useTheme() as AppTheme;
  return (
    <VStack padding={10} backgroundColor={colors.white} border={{ color: colors.primary, width: 2 }}>
      <VStack gap={spacing.sm} alignItems="center">
        <Shape
          w={36} h={36} shapeType="ellipse"
          fill={{ color: colors.lightBlue }} fontSize={12} color={colors.primary}
        >{num}</Shape>
        <Text fontSize={11} color={colors.primary} textAlign="center" bold>{title}</Text>
        <Text fontSize={9} color="3C3C3C" textAlign="center">{body}</Text>
      </VStack>
    </VStack>
  );
}

// ============================================================
// ③ データ
// ============================================================

const metrics = [
  { label: "売上高",     current: "4,285億円", prev: "3,892億円", change: "+10.1%" },
  { label: "営業利益",   current: "512億円",   prev: "438億円",   change: "+16.9%" },
  { label: "経常利益",   current: "498億円",   prev: "421億円",   change: "+18.3%" },
  { label: "当期純利益", current: "328億円",   prev: "276億円",   change: "+18.8%" },
  { label: "営業利益率", current: "11.9%",     prev: "11.3%",     change: "+0.6pt"  },
];

const quarterly = [
  { q: "Q1",    growth: "+8.2%",  margin: "11.7%",  highlight: false, forecast: false },
  { q: "Q2",    growth: "+9.5%",  margin: "11.8%",  highlight: false, forecast: false },
  { q: "Q3",    growth: "+10.1%", margin: "11.9%",  highlight: true,  forecast: false },
  { q: "通期予想", growth: "+9.8%", margin: "12.0%",  highlight: false, forecast: true  },
];

const segments = [
  { name: "デジタル事業",  value: "1,842億円", pct: "43.0%", bg: "E8EAF6", border: "0E0D6A", fg: "0E0D6A" },
  { name: "ソリューション", value: "1,285億円", pct: "30.0%", bg: "FFF8E1", border: "F9A825", fg: "E65100" },
  { name: "その他",        value: "1,158億円", pct: "27.0%", bg: "E8F5E9", border: "2E7D32", fg: "1B5E20" },
];

const topics = [
  { num: "01", title: "新規事業の収益寄与",
    body: "AI・クラウド事業が前年比+42%成長、売上構成比15%に拡大。SaaS型サービスのARR（年間経常収益）が280億円を突破" },
  { num: "02", title: "コスト最適化の進展",
    body: "全社DX推進により販管費率が前年比1.2pt改善。物流拠点統合で年間45億円のコスト削減を実現" },
  { num: "03", title: "主力製品の成長加速",
    body: "フラッグシップ製品「NEXUS Pro」が累計導入社数5,000社突破。大企業向けエンタープライズ版の受注が好調" },
  { num: "04", title: "海外展開の加速",
    body: "ASEAN地域売上が前年比+28%。シンガポール拠点を起点に東南アジア6カ国での事業展開を本格化" },
];

// ============================================================
// ④ メインスライドコンポーネント
// ============================================================

function Q3Slide() {
  const { colors, spacing } = useTheme() as AppTheme;

  return (
    <VStack w="max" h="max" padding={spacing.xl} backgroundColor={colors.bg} gap={spacing.lg}>

      {/* ── ヘッダー ── */}
      <HStack w="max" gap={0} alignItems="center">
        <Shape w={8} h={48} shapeType="rect" fill={{ color: colors.primary }} />
        <VStack padding={{ left: 16 }} gap={2}>
          <Text fontSize={28} color={colors.primary} bold>2025年度 第3四半期 決算サマリー</Text>
          <Text fontSize={12} color={colors.sub}>Financial Results Summary for Q3 FY2025｜2025年10月1日～12月31日</Text>
        </VStack>
      </HStack>

      {/* ── 2カラム本体 ── */}
      <HStack w="max" gap={spacing.lg} alignItems="start">

        {/* 左カラム */}
        <VStack gap={spacing.md}>
          <SectionHeader title="主要経営指標（連結）" />
          <Table
            w="max"
            defaultRowHeight={38}
            columns={[{ width: 140 }, { width: 110 }, { width: 110 }, { width: 80 }]}
            rows={[
              {
                cells: [
                  { text: "項目",     fontSize: 11, color: colors.white, bold: true, textAlign: "center", backgroundColor: colors.primary2 },
                  { text: "当期実績", fontSize: 11, color: colors.white, bold: true, textAlign: "center", backgroundColor: colors.primary2 },
                  { text: "前年同期", fontSize: 11, color: colors.white, bold: true, textAlign: "center", backgroundColor: colors.primary2 },
                  { text: "増減率",  fontSize: 11, color: colors.white, bold: true, textAlign: "center", backgroundColor: colors.primary2 },
                ],
              },
              ...metrics.map((m) => ({
                cells: [
                  { text: m.label,   fontSize: 11, color: colors.primary, bold: true, backgroundColor: colors.lightBlue },
                  { text: m.current, fontSize: 11,                        textAlign: "right"  as const, backgroundColor: colors.white },
                  { text: m.prev,    fontSize: 11, color: colors.sub,     textAlign: "right"  as const, backgroundColor: colors.white },
                  { text: m.change,  fontSize: 11, color: colors.green,   bold: true, textAlign: "center" as const, backgroundColor: colors.greenBg },
                ],
              })),
            ]}
          />

          {/* セグメント別 */}
          <VStack w="max" padding={10} backgroundColor={colors.white} border={{ color: colors.border, width: 1 }}>
            <VStack gap={spacing.sm}>
              <Text fontSize={11} color={colors.primary} bold>【セグメント別売上構成】</Text>
              <HStack gap={8}>
                {segments.map((s) => (
                  <VStack key={s.name} padding={spacing.sm} backgroundColor={s.bg} border={{ color: s.border, width: 1 }}>
                    <VStack gap={2} alignItems="center">
                      <Text fontSize={9}  color={s.fg}>{s.name}</Text>
                      <Text fontSize={11} color={s.fg} bold>{s.value}</Text>
                      <Text fontSize={9}  color={s.fg}>{s.pct}</Text>
                    </VStack>
                  </VStack>
                ))}
              </HStack>
            </VStack>
          </VStack>
        </VStack>

        {/* 右カラム */}
        <VStack gap={spacing.md}>
          <SectionHeader title="前年同期比推移（四半期別）" />

          <VStack w="max" padding={spacing.md} backgroundColor={colors.white} border={{ color: colors.border, width: 1 }}>
            <Chart
              w={480} h={180}
              chartType="bar"
              showLegend
              chartColors={[colors.primary, colors.accent]}
              data={[
                { name: "売上高（億円）",   labels: ["Q1", "Q2", "Q3", "Q4予想"], values: [3980, 4120, 4285, 4450] },
                { name: "営業利益（億円）", labels: ["Q1", "Q2", "Q3", "Q4予想"], values: [465, 488, 512, 535] },
              ]}
            />
          </VStack>

          <VStack w="max" padding={10} backgroundColor={colors.white} border={{ color: colors.border, width: 1 }}>
            <Table
              w="max"
              defaultRowHeight={28}
              columns={[{ width: 100 }, { width: 90 }, { width: 90 }, { width: 90 }, { width: 90 }]}
              rows={[
                {
                  cells: [
                    { text: "指標",     fontSize: 10, color: colors.white, bold: true, textAlign: "center", backgroundColor: colors.accent },
                    ...quarterly.map((r) => ({
                      text: r.q, fontSize: 10, color: colors.white, bold: true, textAlign: "center" as const, backgroundColor: colors.accent,
                    })),
                  ],
                },
                {
                  cells: [
                    { text: "売上高成長率", fontSize: 10, color: colors.primary, backgroundColor: colors.lightBlue },
                    ...quarterly.map((r) => ({
                      text: r.growth, fontSize: 10,
                      color: r.highlight ? colors.green : r.forecast ? colors.orange : colors.text,
                      bold: r.highlight,
                      textAlign: "center" as const,
                      backgroundColor: r.highlight ? colors.greenBg : r.forecast ? colors.orangeBg : colors.white,
                    })),
                  ],
                },
                {
                  cells: [
                    { text: "営業利益率", fontSize: 10, color: colors.primary, backgroundColor: colors.lightBlue },
                    ...quarterly.map((r) => ({
                      text: r.margin, fontSize: 10,
                      color: r.highlight ? colors.green : r.forecast ? colors.orange : colors.text,
                      bold: r.highlight,
                      textAlign: "center" as const,
                      backgroundColor: r.highlight ? colors.greenBg : r.forecast ? colors.orangeBg : colors.white,
                    })),
                  ],
                },
              ]}
            />
          </VStack>
        </VStack>
      </HStack>

      {/* ── トピックス ── */}
      <SectionHeader title="第3四半期 主要トピックス" />
      <HStack w="max" gap={spacing.md}>
        {topics.map((t) => (
          <TopicCard key={t.num} {...t} />
        ))}
      </HStack>

      {/* ── フッター ── */}
      <HStack w="max" gap={0} alignItems="center" justifyContent="spaceBetween">
        <Text fontSize={9} color="7A7A9A">※本資料に記載の数値はダミーデータです。実際の企業業績とは関係ありません。</Text>
        <Text fontSize={9} color={colors.primary}>株式会社サンプルホールディングス｜IR資料｜2025年1月発表</Text>
      </HStack>

    </VStack>
  );
}

// ============================================================
// ⑤ 実行
// ============================================================

const { pptx, diagnostics } = await buildPptxFromJsx(
  <ThemeProvider theme={theme}>
    <Q3Slide />
  </ThemeProvider>,
  { w: 1280, h: 720 },
);

if (diagnostics.length > 0) {
  console.warn("Diagnostics:", diagnostics);
}

await pptx.writeFile({ fileName: "sample-q3.pptx" });
console.log("✓ sample-q3.pptx を生成しました");
