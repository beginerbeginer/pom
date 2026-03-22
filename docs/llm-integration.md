# pom XML Reference

LLM プロンプトに貼り付けて使う、pom XML フォーマットのコンパクトリファレンス。

## 基本

- スライドサイズ: `{ w: 1280, h: 720 }`（px）
- 色: 6桁 hex（`#` 不要）例: `FF0000`
- 属性値は文字列で記述。数値・真偽値は自動変換される
- ネストされたオブジェクト属性はドット記法で記述（例: `fill.color="1D4ED8"`）

## 共通属性（全ノード）

| 属性              | 型                                                         | 説明          |
| ----------------- | ---------------------------------------------------------- | ------------- |
| `w`               | number / `"max"` / `"50%"`                                 | 幅            |
| `h`               | number / `"max"` / `"50%"`                                 | 高さ          |
| `minW` `maxW`     | number                                                     | 最小/最大幅   |
| `minH` `maxH`     | number                                                     | 最小/最大高さ |
| `padding`         | number / `padding.top="8" padding.bottom="8"`              | 内側余白      |
| `backgroundColor` | hex                                                        | 背景色        |
| `backgroundImage` | `backgroundImage.src="url" backgroundImage.sizing="cover"` | 背景画像      |
| `border`          | `border.color="333" border.width="1"`                      | 枠線          |
| `borderRadius`    | number                                                     | 角丸（px）    |
| `opacity`         | 0-1                                                        | 背景透過度    |
| `margin`          | number / `margin.top="8" margin.bottom="8"`                | 外側余白      |
| `zIndex`          | number                                                     | 重なり順（大きいほど上） |
| `position`        | `relative` / `absolute`                                    | 配置モード    |
| `top`             | number                                                     | 上オフセット（position使用時） |
| `right`           | number                                                     | 右オフセット（position使用時） |
| `bottom`          | number                                                     | 下オフセット（position使用時） |
| `left`            | number                                                     | 左オフセット（position使用時） |
| `alignSelf`       | `auto` / `start` / `center` / `end` / `stretch`           | 親の alignItems を個別上書き |

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
| `flexWrap`       | `nowrap` / `wrap` / `wrapReverse`                                           |
| `shadow`         | `shadow.type="outer" shadow.blur="4" shadow.offset="2" shadow.color="000"`  |

> **補足:** VStack / HStack の子要素は `flexShrink=1` がデフォルト（CSS Flexbox と同じ挙動）。`%` 幅と `gap` を併用しても、子要素が自動的に縮小して親要素内に収まる。

### Box

子要素を1つだけ持つコンテナ。パディングや固定サイズの付与に使用。

```xml
<Box w="50%" padding="20" backgroundColor="FFFFFF">
  <Text>内容</Text>
</Box>
```

| 属性     | 型                                                                         | 説明 |
| -------- | -------------------------------------------------------------------------- | ---- |
| `shadow` | `shadow.type="outer" shadow.blur="4" shadow.offset="2" shadow.color="000"` | 影   |

### Layer

子要素を絶対座標で配置。子要素に `x` `y` 必須。記述順が重なり順。

```xml
<Layer w="600" h="400">
  <Shape shapeType="roundRect" x="50" y="50" w="120" h="80" fill.color="1D4ED8" text="A" color="FFFFFF" />
  <Line x1="170" y1="90" x2="300" y2="90" endArrow="true" />
</Layer>
```

## コンテンツノード

### Text

```xml
<Text fontSize="24" bold="true" color="333333" textAlign="center">タイトル</Text>
```

| 属性                     | 型 / 値                                                    |
| ------------------------ | ---------------------------------------------------------- |
| `fontSize`               | number（デフォルト: 24）                                   |
| `color`                  | hex（文字色）                                              |
| `textAlign`              | `left` / `center` / `right`                                |
| `bold` `italic` `strike` | `true` / `false`                                           |
| `underline`              | `true` / `underline.style="wavy" underline.color="FF0000"` |
| `highlight`              | hex（ハイライト色）                                        |
| `fontFamily`             | string（デフォルト: `Noto Sans JP`）                       |
| `lineHeight`             | number（デフォルト: 1.3）                                  |

フォントサイズ目安: タイトル 28-40 / 見出し 18-24 / 本文 13-16 / 注釈 10-12

### Ul（箇条書きリスト）

```xml
<Ul fontSize="14" color="333333">
  <Li>項目A</Li>
  <Li>項目B</Li>
  <Li bold="true">項目C（個別スタイル）</Li>
</Ul>
```

| 属性                     | 型 / 値                              |
| ------------------------ | ------------------------------------ |
| `fontSize`               | number（デフォルト: 24）             |
| `color`                  | hex（文字色）                        |
| `textAlign`              | `left` / `center` / `right`          |
| `bold` `italic` `strike` | `true` / `false`                     |
| `fontFamily`             | string（デフォルト: `Noto Sans JP`） |
| `lineHeight`             | number（デフォルト: 1.3）            |

Li属性（親のスタイルを上書き）: `bold`, `italic`, `strike`, `underline`, `highlight`, `color`, `fontSize`, `fontFamily`

### Ol（番号付きリスト）

Ul の全属性に加えて:

```xml
<Ol fontSize="14" numberType="alphaLcPeriod" numberStartAt="3">
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

| 属性     | 型 / 値                                                                                                                |
| -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `src`    | string（URL / パス / base64）                                                                                          |
| `sizing` | `'{"type":"contain"}' ` / `'{"type":"cover"}'` / `'{"type":"crop","x":0,"y":0,"w":100,"h":100}'`                       |
| `shadow` | `shadow.type="outer" shadow.blur="4" shadow.offset="2" shadow.color="000"`（Image, Box, Shape, VStack, HStack で共通） |

### Icon

プリセットアイコンを表示する（Lucide アイコンライブラリ）。

```xml
<Icon name="cpu" size="32" color="1D4ED8" />
```

| 属性    | 型 / 値                                         |
| ------- | ----------------------------------------------- |
| `name`  | アイコン名（必須）                              |
| `size`  | number（デフォルト: 24、px 単位）               |
| `color` | hex カラー（`#` 省略可、デフォルト: `#000000`） |

利用可能なアイコン: `cpu`, `database`, `cloud`, `server`, `code`, `terminal`, `wifi`, `globe`, `user`, `users`, `contact`, `briefcase`, `building`, `bar-chart`, `line-chart`, `pie-chart`, `trending-up`, `mail`, `message-square`, `phone`, `video`, `search`, `settings`, `filter`, `download`, `upload`, `share`, `check`, `alert-triangle`, `info`, `shield`, `lock`, `unlock`, `file`, `folder`, `image`, `calendar`, `clock`, `bookmark`, `arrow-right`, `arrow-left`, `arrow-up`, `arrow-down`, `external-link`, `star`, `heart`, `zap`, `target`, `lightbulb`

### Shape

```xml
<Shape shapeType="roundRect" w="200" h="60" text="ボタン" fontSize="16" fill.color="1D4ED8" color="FFFFFF" />
```

| 属性         | 型 / 値                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| `shapeType`  | 図形タイプ（全178種類 — 下記参照）                                                                        |
| `text`       | string（図形内テキスト）                                                                                  |
| `fill`       | `fill.color="hex" fill.transparency="0.5"`                                                                |
| `line`       | `line.color="hex" line.width="2" line.dashType="dash"`                                                    |
| `shadow`     | `shadow.type="outer" shadow.blur="4" shadow.offset="2" shadow.color="000"`                                |
| テキスト属性 | `fontSize` `color` `textAlign` `bold` `italic` `underline` `strike` `highlight` `fontFamily` `lineHeight` |

**shapeType 全値一覧:**

基本図形:
`arc`, `bevel`, `blockArc`, `can`, `chord`, `corner`, `cube`, `decagon`, `diagStripe`, `diamond`, `dodecagon`, `donut`, `ellipse`, `folderCorner`, `frame`, `funnel`, `halfFrame`, `heptagon`, `hexagon`, `homePlate`, `nonIsoscelesTrapezoid`, `octagon`, `parallelogram`, `pentagon`, `pie`, `pieWedge`, `plaque`, `plus`, `rect`, `roundRect`, `rtTriangle`, `trapezoid`, `triangle`

角丸・切り欠き四角:
`round1Rect`, `round2DiagRect`, `round2SameRect`, `snip1Rect`, `snip2DiagRect`, `snip2SameRect`, `snipRoundRect`

矢印:
`bentArrow`, `bentUpArrow`, `chevron`, `circularArrow`, `curvedDownArrow`, `curvedLeftArrow`, `curvedRightArrow`, `curvedUpArrow`, `downArrow`, `leftArrow`, `leftCircularArrow`, `leftRightArrow`, `leftRightCircularArrow`, `leftRightUpArrow`, `leftUpArrow`, `notchedRightArrow`, `quadArrow`, `rightArrow`, `stripedRightArrow`, `swooshArrow`, `upArrow`, `upDownArrow`, `uturnArrow`

矢印コールアウト:
`downArrowCallout`, `leftArrowCallout`, `leftRightArrowCallout`, `quadArrowCallout`, `rightArrowCallout`, `upArrowCallout`, `upDownArrowCallout`

コールアウト（吹き出し）:
`accentBorderCallout1`, `accentBorderCallout2`, `accentBorderCallout3`, `accentCallout1`, `accentCallout2`, `accentCallout3`, `borderCallout1`, `borderCallout2`, `borderCallout3`, `callout1`, `callout2`, `callout3`, `cloudCallout`, `wedgeEllipseCallout`, `wedgeRectCallout`, `wedgeRoundRectCallout`

星・バナー:
`doubleWave`, `ellipseRibbon`, `ellipseRibbon2`, `horizontalScroll`, `irregularSeal1`, `irregularSeal2`, `leftRightRibbon`, `ribbon`, `ribbon2`, `star4`, `star5`, `star6`, `star7`, `star8`, `star10`, `star12`, `star16`, `star24`, `star32`, `verticalScroll`, `wave`

フローチャート:
`flowChartAlternateProcess`, `flowChartCollate`, `flowChartConnector`, `flowChartDecision`, `flowChartDelay`, `flowChartDisplay`, `flowChartDocument`, `flowChartExtract`, `flowChartInputOutput`, `flowChartInternalStorage`, `flowChartMagneticDisk`, `flowChartMagneticDrum`, `flowChartMagneticTape`, `flowChartManualInput`, `flowChartManualOperation`, `flowChartMerge`, `flowChartMultidocument`, `flowChartOfflineStorage`, `flowChartOffpageConnector`, `flowChartOnlineStorage`, `flowChartOr`, `flowChartPredefinedProcess`, `flowChartPreparation`, `flowChartProcess`, `flowChartPunchedCard`, `flowChartPunchedTape`, `flowChartSort`, `flowChartSummingJunction`, `flowChartTerminator`

アクションボタン:
`actionButtonBackPrevious`, `actionButtonBeginning`, `actionButtonBlank`, `actionButtonDocument`, `actionButtonEnd`, `actionButtonForwardNext`, `actionButtonHelp`, `actionButtonHome`, `actionButtonInformation`, `actionButtonMovie`, `actionButtonReturn`, `actionButtonSound`

括弧・ブレース:
`bracePair`, `bracketPair`, `leftBrace`, `leftBracket`, `rightBrace`, `rightBracket`

数式記号:
`mathDivide`, `mathEqual`, `mathMinus`, `mathMultiply`, `mathNotEqual`, `mathPlus`

その他:
`chartPlus`, `chartStar`, `chartX`, `cloud`, `cornerTabs`, `gear6`, `gear9`, `heart`, `lightningBolt`, `line`, `lineInv`, `moon`, `noSmoking`, `plaqueTabs`, `smileyFace`, `squareTabs`, `sun`, `teardrop`

### Line

```xml
<Line x1="100" y1="100" x2="300" y2="100" color="333333" lineWidth="2" endArrow="true" />
```

| 属性                      | 型 / 値                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------- |
| `x1` `y1` `x2` `y2`       | number（絶対座標、必須）                                                            |
| `color`                   | hex（デフォルト: `000000`）                                                         |
| `lineWidth`               | number（デフォルト: 1）                                                             |
| `dashType`                | `solid` / `dash` / `dashDot` / `lgDash` / `sysDash` 等                              |
| `beginArrow` / `endArrow` | `true` / `endArrow.type="triangle"`（型: none/arrow/triangle/diamond/oval/stealth） |

## データ可視化ノード

### Table

```xml
<Table>
  <TableColumn width="200" />
  <TableColumn width="100" />
  <TableRow>
    <TableCell bold="true" backgroundColor="DBEAFE">名前</TableCell>
    <TableCell bold="true" backgroundColor="DBEAFE">点数</TableCell>
  </TableRow>
  <TableRow>
    <TableCell>Alice</TableCell>
    <TableCell>95</TableCell>
  </TableRow>
</Table>
```

- `<TableColumn>`: `width`（省略で均等分割）
- `<TableRow>`: `height`（省略で `defaultRowHeight` 適用、デフォルト 32）
- `<TableCell>`: テキスト内容 + `fontSize` `color` `bold` `italic` `underline` `strike` `highlight` `textAlign` `backgroundColor` `colspan` `rowspan`

### Chart

```xml
<Chart chartType="bar" w="500" h="300" showLegend="true" chartColors='["0088CC","00AA00"]'>
  <ChartSeries name="売上">
    <ChartDataPoint label="1月" value="100" />
    <ChartDataPoint label="2月" value="150" />
  </ChartSeries>
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
  <MatrixAxes x="コスト" y="効果" />
  <MatrixQuadrants topLeft="Quick Wins" topRight="戦略的" bottomLeft="低優先" bottomRight="回避" />
  <MatrixItem label="施策A" x="0.2" y="0.8" color="4CAF50" />
  <MatrixItem label="施策B" x="0.7" y="0.6" />
</Matrix>
```

- 座標: (0,0)=左下, (1,1)=右上（数学座標系）
- `<MatrixAxes>`: `x` `y`（軸ラベル、必須）
- `<MatrixQuadrants>`: `topLeft` `topRight` `bottomLeft` `bottomRight`
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

| 属性             | 型 / 値                                               |
| ---------------- | ----------------------------------------------------- |
| `layout`         | `vertical` / `horizontal`                             |
| `nodeShape`      | `rect` / `roundRect` / `ellipse`                      |
| `nodeWidth`      | number（デフォルト: 120）                             |
| `nodeHeight`     | number（デフォルト: 40）                              |
| `levelGap`       | number（デフォルト: 60）                              |
| `siblingGap`     | number（デフォルト: 20）                              |
| `connectorStyle` | `connectorStyle.color="333" connectorStyle.width="2"` |

`<TreeItem>` は再帰的にネスト可能。ルートは1つのみ。

### Flow

```xml
<Flow direction="horizontal" w="500" h="300">
  <FlowNode id="start" shape="flowChartTerminator" text="開始" color="4CAF50" />
  <FlowNode id="process" shape="flowChartProcess" text="処理" />
  <FlowNode id="decision" shape="flowChartDecision" text="OK?" color="FF9800" />
  <FlowNode id="end" shape="flowChartTerminator" text="終了" color="E91E63" />
  <FlowConnection from="start" to="process" />
  <FlowConnection from="process" to="decision" />
  <FlowConnection from="decision" to="end" label="Yes" />
</Flow>
```

| 属性             | 型 / 値                                                                                |
| ---------------- | -------------------------------------------------------------------------------------- |
| `direction`      | `horizontal` / `vertical`                                                              |
| `nodeWidth`      | number（デフォルト: 120）                                                              |
| `nodeHeight`     | number（デフォルト: 60）                                                               |
| `nodeGap`        | number（デフォルト: 80）                                                               |
| `connectorStyle` | `connectorStyle.color="hex" connectorStyle.width="2" connectorStyle.arrowType="arrow"` |

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

`<FlowConnection>`: `from` `to`（必須）`label` `color`

### ProcessArrow

```xml
<ProcessArrow direction="horizontal" w="1000" h="80">
  <ProcessArrowStep label="計画" color="4472C4" />
  <ProcessArrowStep label="設計" color="5B9BD5" />
  <ProcessArrowStep label="開発" color="70AD47" />
  <ProcessArrowStep label="リリース" color="ED7D31" />
</ProcessArrow>
```

| 属性                     | 型 / 値                                                    |
| ------------------------ | ---------------------------------------------------------- |
| `direction`              | `horizontal` / `vertical`                                  |
| `itemWidth`              | number（デフォルト: 150）                                  |
| `itemHeight`             | number（デフォルト: 80）                                   |
| `gap`                    | number（デフォルト: -(itemHeight×0.35)、負で重なり）       |
| `fontSize`               | number（デフォルト: 14）                                   |
| `bold` `italic` `strike` | boolean                                                    |
| `underline`              | `true` / `underline.style="wavy" underline.color="FF0000"` |
| `highlight`              | hex（ハイライト色）                                        |

`<ProcessArrowStep>`: `label`（必須）`color`（デフォルト: `4472C4`）`textColor`（デフォルト: `FFFFFF`）

### Pyramid

```xml
<Pyramid direction="up" w="600" h="300">
  <PyramidLevel label="戦略" color="E91E63" />
  <PyramidLevel label="戦術" color="9C27B0" />
  <PyramidLevel label="実行" color="673AB7" />
</Pyramid>
```

| 属性        | 型 / 値                    |
| ----------- | -------------------------- |
| `direction` | `up`（デフォルト）/ `down` |
| `fontSize`  | number（デフォルト: 14）   |
| `bold`      | boolean                    |

`<PyramidLevel>`: `label`（必須）`color`（デフォルト: `4472C4`）`textColor`（デフォルト: `FFFFFF`）

- `direction="up"`: 最初の PyramidLevel が頂点（最も狭い）、最後が底辺（最も広い）
- `direction="down"`: 最初の PyramidLevel が最上段（最も広い）、最後が最下段（最も狭い）

## 子要素タグ一覧

| 親ノード         | 子タグ                                              | 対応プロパティ               |
| ---------------- | --------------------------------------------------- | ---------------------------- |
| `<Chart>`        | `<ChartSeries>` > `<ChartDataPoint>`                | `data`                       |
| `<Table>`        | `<TableColumn>`, `<TableRow>` > `<TableCell>`       | `columns`, `rows`            |
| `<Timeline>`     | `<TimelineItem>`                                    | `items`                      |
| `<Matrix>`       | `<MatrixAxes>`, `<MatrixQuadrants>`, `<MatrixItem>` | `axes`, `quadrants`, `items` |
| `<Tree>`         | `<TreeItem>`（再帰）                                | `data`                       |
| `<Flow>`         | `<FlowNode>`, `<FlowConnection>`                    | `nodes`, `connections`       |
| `<ProcessArrow>` | `<ProcessArrowStep>`                                | `steps`                      |
| `<Pyramid>`      | `<PyramidLevel>`                                    | `levels`                     |

属性（JSON 文字列）と子要素の両方で同一プロパティを指定した場合、子要素が優先される。

## スライドパターン

### 基本構造

```xml
<VStack w="100%" h="max" padding="48" gap="24" alignItems="stretch">
  <Text fontSize="32" bold="true">タイトル</Text>
  <Text fontSize="14">本文テキスト</Text>
</VStack>
```

### 2カラムレイアウト

```xml
<VStack w="100%" h="max" padding="48" gap="24" alignItems="stretch">
  <Text fontSize="28" bold="true">タイトル</Text>
  <HStack gap="24" alignItems="start">
    <Box w="50%" padding="20" backgroundColor="FFFFFF" borderRadius="8">
      <Text fontSize="14">左カラム</Text>
    </Box>
    <Box w="50%" padding="20" backgroundColor="FFFFFF" borderRadius="8">
      <Text fontSize="14">右カラム</Text>
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
