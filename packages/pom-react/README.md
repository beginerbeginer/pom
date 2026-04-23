# @miyabi/pom-react

React JSX でパワーポイントを宣言的に作成するライブラリ。  
[hirokisakabe/pom](https://github.com/hirokisakabe/pom) の fork 専用レイヤー。

## 何ができるか

`@hirokisakabe/pom` はXML文字列でスライドを記述する。  
`@miyabi/pom-react` を使うと **React コンポーネントとして** スライドを記述できる。

```tsx
// 繰り返しのカードを関数コンポーネントに切り出せる
function TopicCard({ title, body }: { title: string; body: string }) {
  return (
    <VStack padding={12} backgroundColor="FFFFFF" border={{ color: "0E0D6A", width: 2 }}>
      <Text fontSize={14} color="0E0D6A" bold>{title}</Text>
      <Text fontSize={11} color="3C3C3C">{body}</Text>
    </VStack>
  );
}

// データ配列から動的にスライドを生成できる
const topics = [
  { title: "新規事業", body: "AI事業が前年比+42%成長" },
  { title: "コスト削減", body: "年間45億円のコスト削減" },
];

function Slide() {
  return (
    <VStack w={1280} h={720} padding={48} gap={24}>
      <HStack w="max" gap={12}>
        {topics.map((t) => <TopicCard key={t.title} {...t} />)}
      </HStack>
    </VStack>
  );
}

const { pptx } = await buildPptxFromReact(<Slide />, { w: 1280, h: 720 });
await pptx.writeFile({ fileName: "output.pptx" });
```

## インストール

```bash
# このリポジトリ内のワークスペースパッケージとして使用
pnpm install
```

## スライドの書き方

### 1. ファイルを作成する

`my-slide.tsx` を作成して先頭に JSX プラグマを記述する。

```tsx
/** @jsxImportSource @miyabi/pom-react */
import { buildPptxFromReact, VStack, HStack, Text, Table, Chart, Shape, Icon } from "@miyabi/pom-react";
```

### 2. コンポーネントを書く

利用できるコンポーネントと主要な props は以下の通り。

#### レイアウト

| コンポーネント | 説明 | 主要 props |
|-------------|------|-----------|
| `<VStack>` | 縦方向 Flexbox | `gap`, `alignItems`, `justifyContent`, `padding`, `backgroundColor` |
| `<HStack>` | 横方向 Flexbox | `gap`, `alignItems`, `justifyContent`, `padding`, `backgroundColor` |
| `<Layer>` | 絶対配置コンテナ | `w`, `h`, `backgroundColor` |

#### コンテンツ

| コンポーネント | 説明 | 主要 props |
|-------------|------|-----------|
| `<Text>` | テキスト | `fontSize`, `color`, `bold`, `italic`, `textAlign` |
| `<Image>` | 画像 | `src`, `sizing` |
| `<Shape>` | 図形 | `shapeType`, `fill`, `text` |
| `<Icon>` | アイコン（Lucide） | `name`, `size`, `color` |
| `<Table>` | 表 | `columns`, `rows`, `defaultRowHeight` |
| `<Chart>` | グラフ | `chartType`, `data`, `showLegend` |
| `<Ul>` / `<Ol>` | リスト | `items`, `fontSize` |
| `<Timeline>` | タイムライン | `items`, `direction` |
| `<Pyramid>` | ピラミッド図 | `levels`, `direction` |
| `<ProcessArrow>` | プロセス矢印 | `steps`, `direction` |
| `<Tree>` | ツリー図 | `data`, `layout` |
| `<Flow>` | フロー図 | `nodes`, `connections` |

#### サイズ指定

```tsx
w={1280}       // 数値（ピクセル）
w="max"        // 親要素いっぱい
w="50%"        // パーセント
```

#### 余白・装飾

```tsx
padding={24}                           // 上下左右均一
padding={{ top: 12, left: 24 }}        // 個別指定
border={{ color: "0E0D6A", width: 2 }} // 枠線（#なし HEX）
backgroundColor="F8F9FC"               // 背景色（#なし HEX）
```

### 3. 複数スライドを作る

Fragment（`<>...</>`）でラップすると複数スライドになる。

```tsx
const { pptx } = await buildPptxFromReact(
  <>
    <TitleSlide />
    <ContentSlide />
    <SummarySlide />
  </>,
  { w: 1280, h: 720 }
);
```

### 4. テーブルの書き方

`columns`（列定義）と `rows`（行データ）を props で渡す。  
データがある場合は `.map()` で生成できる。

```tsx
const data = [
  { label: "売上高",   value: "4,285億円", change: "+10.1%" },
  { label: "営業利益", value: "512億円",   change: "+16.9%" },
];

<Table
  w="max"
  defaultRowHeight={38}
  columns={[{ width: 200 }, { width: 120 }, { width: 100 }]}
  rows={[
    // ヘッダー行
    {
      cells: [
        { text: "項目",   bold: true, backgroundColor: "1A1980", color: "FFFFFF" },
        { text: "実績",   bold: true, backgroundColor: "1A1980", color: "FFFFFF" },
        { text: "前年比", bold: true, backgroundColor: "1A1980", color: "FFFFFF" },
      ],
    },
    // データ行を .map() で生成
    ...data.map((d) => ({
      cells: [
        { text: d.label, backgroundColor: "E8EAF6" },
        { text: d.value, textAlign: "right" as const },
        { text: d.change, color: "0D7A3E", bold: true, textAlign: "center" as const },
      ],
    })),
  ]}
/>
```

### 5. チャートの書き方

```tsx
<Chart
  w={480} h={200}
  chartType="bar"       // "bar" | "line" | "pie" | "area" | "doughnut" | "radar"
  showLegend
  chartColors={["0E0D6A", "5C6BC0"]}
  data={[
    {
      name: "売上高（億円）",
      labels: ["Q1", "Q2", "Q3", "Q4"],
      values: [3980, 4120, 4285, 4450],
    },
  ]}
/>
```

## コマンド

```bash
# デモスライド（sample-q3.pptx）を生成して即座に開く
pnpm run preview

# デモスライドの生成のみ（ファイルを手動で開く場合）
pnpm run demo

# TypeScript ビルド
pnpm run build

# 型チェック
pnpm run typecheck
```

## デモファイルの動かし方

`demo.tsx` がサンプルスライドの完全な実装。

```bash
cd packages/pom-react

# PPTX を生成して PowerPoint / Keynote で即座に開く
pnpm run preview
```

## プレビューについて

`pnpm run preview` を実行すると：

1. `demo.tsx` が実行されて `sample-q3.pptx` が生成される
2. Mac の `open` コマンドで自動的に PowerPoint / Keynote が起動する
3. スライドの見た目をその場で確認できる

スライドの内容を変更したいときは `demo.tsx` を編集してから再度 `pnpm run preview` を実行する。

## 自分のスライドを作るには

1. `demo.tsx` をコピーして `my-presentation.tsx` を作成
2. データとコンポーネントを書き換える
3. `pnpm run preview` の代わりに以下を実行:

```bash
npx tsx --tsconfig tsconfig.demo.json my-presentation.tsx
open my-presentation.pptx
```

## アーキテクチャ

```
JSX コンポーネント
  │
  ▼ jsx-runtime.ts（カスタム JSX ファクトリ）
POMElement ツリー
  │
  ▼ renderer.ts（ツリー変換）
SerializableNode ツリー
  │
  ▼ serializer.ts（XML シリアライズ）
XML 文字列
  │
  ▼ @hirokisakabe/pom（buildPptx）
PPTX ファイル
```

`@hirokisakabe/pom` の公開 API（`buildPptx`）だけを使用しており、  
upstream の内部実装変更の影響を受けない設計になっている。
