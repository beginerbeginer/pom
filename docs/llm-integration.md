# pom XML Reference

LLM プロンプトに貼り付けて使う、pom XML フォーマットのコンパクトリファレンス。

## 基本

- スライドサイズ: `{ w: 1280, h: 720 }`（px）
- 色: 6桁 hex（`#` 不要）例: `FF0000`
- 属性値は文字列で記述。数値・真偽値・JSON は自動変換される

## 共通属性（全ノード）

| 属性              | 型                                 | 説明          |
| ----------------- | ---------------------------------- | ------------- |
| `w`               | number / `"max"` / `"50%"`         | 幅            |
| `h`               | number / `"max"` / `"50%"`         | 高さ          |
| `minW` `maxW`     | number                             | 最小/最大幅   |
| `minH` `maxH`     | number                             | 最小/最大高さ |
| `padding`         | number / `'{"top":8,"bottom":8}'`  | 内側余白      |
| `backgroundColor` | hex                                | 背景色        |
| `backgroundImage` | `'{"src":"url","sizing":"cover"}'` | 背景画像      |
| `border`          | `'{"color":"333","width":1}'`      | 枠線          |
| `borderRadius`    | number                             | 角丸（px）    |
| `opacity`         | 0-1                                | 背景透過度    |

## レイアウトノード

### VStack / HStack

子要素を縦（VStack）/ 横（HStack）に並べる。

```xml
<VStack gap="16" alignItems="stretch" justifyContent="start">
  <Text>A</Text>
  <Text>B</Text>
</VStack>
```

| 属性             | 値                                                                          |
| ---------------- | --------------------------------------------------------------------------- |
| `gap`            | number（子要素間の間隔）                                                    |
| `alignItems`     | `start` / `center` / `end` / `stretch`                                      |
| `justifyContent` | `start` / `center` / `end` / `spaceBetween` / `spaceAround` / `spaceEvenly` |

### Box

子要素を1つだけ持つコンテナ。パディングや固定サイズの付与に使用。

```xml
<Box w="50%" padding="20" backgroundColor="FFFFFF">
  <Text>内容</Text>
</Box>
```

| 属性     | 型   | 説明                                                   |
| -------- | ---- | ------------------------------------------------------ |
| `shadow` | JSON | `'{"type":"outer","blur":4,"offset":2,"color":"000"}'` |

### Layer

子要素を絶対座標で配置。子要素に `x` `y` 必須。記述順が重なり順。

```xml
<Layer w="600" h="400">
  <Shape shapeType="roundRect" x="50" y="50" w="120" h="80" fill='{"color":"1D4ED8"}' text="A" color="FFFFFF" />
  <Line x1="170" y1="90" x2="300" y2="90" endArrow="true" />
</Layer>
```

## コンテンツノード

### Text

```xml
<Text fontPx="24" bold="true" color="333333" alignText="center">タイトル</Text>
```

| 属性                     | 型 / 値                                        |
| ------------------------ | ---------------------------------------------- |
| `fontPx`                 | number（デフォルト: 24）                       |
| `color`                  | hex（文字色）                                  |
| `alignText`              | `left` / `center` / `right`                    |
| `bold` `italic` `strike` | `true` / `false`                               |
| `underline`              | `true` / `'{"style":"wavy","color":"FF0000"}'` |
| `highlight`              | hex（ハイライト色）                            |
| `fontFamily`             | string（デフォルト: `Noto Sans JP`）           |
| `lineSpacingMultiple`    | number（デフォルト: 1.3）                      |

フォントサイズ目安: タイトル 28-40 / 見出し 18-24 / 本文 13-16 / 注釈 10-12

### Ul（箇条書きリスト）

```xml
<Ul fontPx="14" color="333333">
  <Li>項目A</Li>
  <Li>項目B</Li>
  <Li bold="true">項目C（個別スタイル）</Li>
</Ul>
```

| 属性                     | 型 / 値                              |
| ------------------------ | ------------------------------------ |
| `fontPx`                 | number（デフォルト: 24）             |
| `color`                  | hex（文字色）                        |
| `alignText`              | `left` / `center` / `right`          |
| `bold` `italic` `strike` | `true` / `false`                     |
| `fontFamily`             | string（デフォルト: `Noto Sans JP`） |
| `lineSpacingMultiple`    | number（デフォルト: 1.3）            |

Li属性（親のスタイルを上書き）: `bold`, `italic`, `strike`, `underline`, `highlight`, `color`, `fontPx`, `fontFamily`

### Ol（番号付きリスト）

Ul の全属性に加えて:

```xml
<Ol fontPx="14" numberType="alphaLcPeriod" numberStartAt="3">
  <Li>項目A</Li>
  <Li>項目B</Li>
</Ol>
```

| 属性            | 型 / 値                                               |
| --------------- | ----------------------------------------------------- |
| `numberType`    | `alphaLcPeriod` / `alphaUcPeriod` / `arabicParenR` 等 |
| `numberStartAt` | number（開始番号、デフォルト: 1）                     |

### Image

```xml
<Image src="https://example.com/img.png" w="200" h="150" />
```

| 属性     | 型 / 値                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------ |
| `src`    | string（URL / パス / base64）                                                                    |
| `sizing` | `'{"type":"contain"}' ` / `'{"type":"cover"}'` / `'{"type":"crop","x":0,"y":0,"w":100,"h":100}'` |
| `shadow` | JSON（Image, Box, Shape で共通）                                                                 |

### Shape

```xml
<Shape shapeType="roundRect" w="200" h="60" text="ボタン" fontPx="16" fill='{"color":"1D4ED8"}' color="FFFFFF" />
```

| 属性         | 型 / 値                                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `shapeType`  | `rect` / `roundRect` / `ellipse` / `triangle` / `star5` / `cloud` / `downArrow` 等                               |
| `text`       | string（図形内テキスト）                                                                                         |
| `fill`       | `'{"color":"hex","transparency":0.5}'`                                                                           |
| `line`       | `'{"color":"hex","width":2,"dashType":"dash"}'`                                                                  |
| `shadow`     | JSON                                                                                                             |
| テキスト属性 | `fontPx` `color` `alignText` `bold` `italic` `underline` `strike` `highlight` `fontFamily` `lineSpacingMultiple` |

### Line

```xml
<Line x1="100" y1="100" x2="300" y2="100" color="333333" lineWidth="2" endArrow="true" />
```

| 属性                      | 型 / 値                                                                          |
| ------------------------- | -------------------------------------------------------------------------------- |
| `x1` `y1` `x2` `y2`       | number（絶対座標、必須）                                                         |
| `color`                   | hex（デフォルト: `000000`）                                                      |
| `lineWidth`               | number（デフォルト: 1）                                                          |
| `dashType`                | `solid` / `dash` / `dashDot` / `lgDash` / `sysDash` 等                           |
| `beginArrow` / `endArrow` | `true` / `'{"type":"triangle"}'`（型: none/arrow/triangle/diamond/oval/stealth） |

## データ可視化ノード

### Table

```xml
<Table>
  <Column width="200" />
  <Column width="100" />
  <Row>
    <Cell bold="true" backgroundColor="DBEAFE">名前</Cell>
    <Cell bold="true" backgroundColor="DBEAFE">点数</Cell>
  </Row>
  <Row>
    <Cell>Alice</Cell>
    <Cell>95</Cell>
  </Row>
</Table>
```

- `<Column>`: `width`（省略で均等分割）
- `<Row>`: `height`（省略で `defaultRowHeight` 適用、デフォルト 32）
- `<Cell>`: テキスト内容 + `fontPx` `color` `bold` `italic` `underline` `strike` `highlight` `alignText` `backgroundColor`

### Chart

```xml
<Chart chartType="bar" w="500" h="300" showLegend="true" chartColors='["0088CC","00AA00"]'>
  <Series name="売上">
    <DataPoint label="1月" value="100" />
    <DataPoint label="2月" value="150" />
  </Series>
</Chart>
```

| 属性          | 型 / 値                                                |
| ------------- | ------------------------------------------------------ |
| `chartType`   | `bar` / `line` / `pie` / `area` / `doughnut` / `radar` |
| `showLegend`  | boolean                                                |
| `showTitle`   | boolean                                                |
| `title`       | string                                                 |
| `chartColors` | JSON配列 `'["hex1","hex2"]'`                           |
| `radarStyle`  | `standard` / `marker` / `filled`（radar のみ）         |

### Timeline

```xml
<Timeline direction="horizontal" w="1000" h="120">
  <TimelineItem date="Q1" title="Phase 1" description="基盤構築" color="4CAF50" />
  <TimelineItem date="Q2" title="Phase 2" description="開発" color="2196F3" />
</Timeline>
```

| 属性        | 型 / 値                   |
| ----------- | ------------------------- |
| `direction` | `horizontal` / `vertical` |

`<TimelineItem>`: `date`（必須）`title`（必須）`description` `color`

### Matrix

```xml
<Matrix w="600" h="500">
  <Axes x="コスト" y="効果" />
  <Quadrants topLeft="Quick Wins" topRight="戦略的" bottomLeft="低優先" bottomRight="回避" />
  <MatrixItem label="施策A" x="0.2" y="0.8" color="4CAF50" />
  <MatrixItem label="施策B" x="0.7" y="0.6" />
</Matrix>
```

- 座標: (0,0)=左下, (1,1)=右上（数学座標系）
- `<Axes>`: `x` `y`（軸ラベル、必須）
- `<Quadrants>`: `topLeft` `topRight` `bottomLeft` `bottomRight`
- `<MatrixItem>`: `label` `x` `y`（必須）`color`

### Tree

```xml
<Tree layout="vertical" nodeShape="roundRect" w="600" h="400">
  <TreeItem label="CEO" color="1D4ED8">
    <TreeItem label="CTO" color="0EA5E9">
      <TreeItem label="Engineer A" />
    </TreeItem>
    <TreeItem label="CFO" color="16A34A" />
  </TreeItem>
</Tree>
```

| 属性             | 型 / 値                          |
| ---------------- | -------------------------------- |
| `layout`         | `vertical` / `horizontal`        |
| `nodeShape`      | `rect` / `roundRect` / `ellipse` |
| `nodeWidth`      | number（デフォルト: 120）        |
| `nodeHeight`     | number（デフォルト: 40）         |
| `levelGap`       | number（デフォルト: 60）         |
| `siblingGap`     | number（デフォルト: 20）         |
| `connectorStyle` | `'{"color":"333","width":2}'`    |

`<TreeItem>` は再帰的にネスト可能。ルートは1つのみ。

### Flow

```xml
<Flow direction="horizontal" w="500" h="300">
  <FlowNode id="start" shape="flowChartTerminator" text="開始" color="4CAF50" />
  <FlowNode id="process" shape="flowChartProcess" text="処理" />
  <FlowNode id="decision" shape="flowChartDecision" text="OK?" color="FF9800" />
  <FlowNode id="end" shape="flowChartTerminator" text="終了" color="E91E63" />
  <Connection from="start" to="process" />
  <Connection from="process" to="decision" />
  <Connection from="decision" to="end" label="Yes" />
</Flow>
```

| 属性             | 型 / 値                                           |
| ---------------- | ------------------------------------------------- |
| `direction`      | `horizontal` / `vertical`                         |
| `nodeWidth`      | number（デフォルト: 120）                         |
| `nodeHeight`     | number（デフォルト: 60）                          |
| `nodeGap`        | number（デフォルト: 80）                          |
| `connectorStyle` | `'{"color":"hex","width":2,"arrowType":"arrow"}'` |

`<FlowNode>` の属性:

| 属性        | 型 / 値                                                                                                                                                                                                                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`        | string（必須）— ノードの一意識別子                                                                                                                                                                                                                                                                |
| `shape`     | `flowChartTerminator` / `flowChartProcess` / `flowChartDecision` / `flowChartInputOutput` / `flowChartDocument` / `flowChartPredefinedProcess` / `flowChartConnector` / `flowChartPreparation` / `flowChartManualInput` / `flowChartManualOperation` / `flowChartDelay` / `flowChartMagneticDisk` |
| `text`      | string（必須）— 表示テキスト                                                                                                                                                                                                                                                                      |
| `color`     | hex color（例: `"4CAF50"`）— ノードの塗りつぶし色                                                                                                                                                                                                                                                 |
| `textColor` | hex color（例: `"FFFFFF"`）— テキスト色                                                                                                                                                                                                                                                           |
| `width`     | number — 個別ノード幅（`nodeWidth` を上書き）                                                                                                                                                                                                                                                     |
| `height`    | number — 個別ノード高さ（`nodeHeight` を上書き）                                                                                                                                                                                                                                                  |

`<Connection>`: `from` `to`（必須）`label` `color`

### ProcessArrow

```xml
<ProcessArrow direction="horizontal" w="1000" h="80">
  <Step label="計画" color="4472C4" />
  <Step label="設計" color="5B9BD5" />
  <Step label="開発" color="70AD47" />
  <Step label="リリース" color="ED7D31" />
</ProcessArrow>
```

| 属性                     | 型 / 値                                        |
| ------------------------ | ---------------------------------------------- |
| `direction`              | `horizontal` / `vertical`                      |
| `itemWidth`              | number（デフォルト: 150）                      |
| `itemHeight`             | number（デフォルト: 60）                       |
| `gap`                    | number（デフォルト: -15、負で重なり）          |
| `fontPx`                 | number（デフォルト: 14）                       |
| `bold` `italic` `strike` | boolean                                        |
| `underline`              | `true` / `'{"style":"wavy","color":"FF0000"}'` |
| `highlight`              | hex（ハイライト色）                            |

`<Step>`: `label`（必須）`color`（デフォルト: `4472C4`）`textColor`（デフォルト: `FFFFFF`）

## 子要素タグ一覧

| 親ノード         | 子タグ                                  | 対応プロパティ               |
| ---------------- | --------------------------------------- | ---------------------------- |
| `<Chart>`        | `<Series>` > `<DataPoint>`              | `data`                       |
| `<Table>`        | `<Column>`, `<Row>` > `<Cell>`          | `columns`, `rows`            |
| `<Timeline>`     | `<TimelineItem>`                        | `items`                      |
| `<Matrix>`       | `<Axes>`, `<Quadrants>`, `<MatrixItem>` | `axes`, `quadrants`, `items` |
| `<Tree>`         | `<TreeItem>`（再帰）                    | `data`                       |
| `<Flow>`         | `<FlowNode>`, `<Connection>`            | `nodes`, `connections`       |
| `<ProcessArrow>` | `<Step>`                                | `steps`                      |

属性（JSON 文字列）と子要素の両方で同一プロパティを指定した場合、子要素が優先される。

## スライドパターン

### 基本構造

```xml
<VStack w="100%" h="max" padding="48" gap="24" alignItems="stretch">
  <Text fontPx="32" bold="true">タイトル</Text>
  <Text fontPx="14">本文テキスト</Text>
</VStack>
```

### 2カラムレイアウト

```xml
<VStack w="100%" h="max" padding="48" gap="24" alignItems="stretch">
  <Text fontPx="28" bold="true">タイトル</Text>
  <HStack gap="24" alignItems="start">
    <Box w="50%" padding="20" backgroundColor="FFFFFF" borderRadius="8">
      <Text fontPx="14">左カラム</Text>
    </Box>
    <Box w="50%" padding="20" backgroundColor="FFFFFF" borderRadius="8">
      <Text fontPx="14">右カラム</Text>
    </Box>
  </HStack>
</VStack>
```

## 注意事項

- 色は `#` 不要（`FF0000`）
- `alignItems` / `justifyContent` は `start` / `end` を使用（`left` / `right` は不可）
- `Box` の子要素は1つ（配列ではない）
- プロパティ名は `w` / `h`（`width` / `height` ではない）
- `Layer` の子要素には `x` `y` が必須
- `Tree` のルート `<TreeItem>` は1つだけ
