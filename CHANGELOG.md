# @hirokisakabe/pom

## 5.4.0

### Minor Changes

- [#386](https://github.com/hirokisakabe/pom/pull/386) [`30a7ce4`](https://github.com/hirokisakabe/pom/commit/30a7ce4c5ae004e1a0d332f3de2a066a521abe58) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - プリセットアイコンを Lucide v0.577.0 全 1,951 個に拡充

### Patch Changes

- [#382](https://github.com/hirokisakabe/pom/pull/382) [`c803885`](https://github.com/hirokisakabe/pom/commit/c803885c00f527cde725a40dde2019c86d48f405) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - Add API reference documentation for `buildPptx()` options

## 5.3.0

### Minor Changes

- [#378](https://github.com/hirokisakabe/pom/pull/378) [`27ba994`](https://github.com/hirokisakabe/pom/commit/27ba99429ab0ab0a8b4ea368ac8d96a9b70926f1) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - Icon ノードに variant / bgColor 属性を追加し、背景付きアイコンを1タグで描画可能に

## 5.2.1

### Patch Changes

- [#350](https://github.com/hirokisakabe/pom/pull/350) [`0551862`](https://github.com/hirokisakabe/pom/commit/05518625d786bae1c67f4bcede3a98d504294063) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - buildPptx 実行コンテキストを分離し、並列実行時のグローバル状態干渉を防止

- [#321](https://github.com/hirokisakabe/pom/pull/321) [`1b45e09`](https://github.com/hirokisakabe/pom/commit/1b45e0909eb5696aaa54fca9693b18f3f960bce7) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - refactor: NodeRegistry を導入し、ノード処理の分岐を集約

- [#346](https://github.com/hirokisakabe/pom/pull/346) [`5e430b3`](https://github.com/hirokisakabe/pom/commit/5e430b3944548b1060c7d07dc86e44474c6b4128) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - refactor: Yoga ノードのライフサイクルを明示化し解放を保証する

## 5.2.0

### Minor Changes

- [#312](https://github.com/hirokisakabe/pom/pull/312) [`2937014`](https://github.com/hirokisakabe/pom/commit/29370141b31913c52c3f406741ccd6503a9a2681) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - Layout v2: margin, zIndex, position, alignSelf, flexWrap を追加

## 5.1.0

### Minor Changes

- [#302](https://github.com/hirokisakabe/pom/pull/302) [`26a913b`](https://github.com/hirokisakabe/pom/commit/26a913b7af177d65d427c2323c99c9aae565a718) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - feat: スライド縦幅はみ出し時の自動調整機能を追加

  コンテンツがスライドの縦幅を超えた場合、段階的に調整してスライド内に収める機能を追加。
  調整はテーブル行高さ → フォントサイズ → gap/padding → 全体スケーリングの順で適用される。
  `autoFit: false` オプションで無効化可能。

- [#303](https://github.com/hirokisakabe/pom/pull/303) [`e3b6190`](https://github.com/hirokisakabe/pom/commit/e3b619072529cf6e068baf1337bcf466e2b466c2) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - HStack/VStack の子要素に flexShrink=1 をデフォルト設定（CSS Flexbox と同じ挙動）。%サイズと gap を併用した場合に子要素がはみ出す問題を修正。

- [#301](https://github.com/hirokisakabe/pom/pull/301) [`dc70a07`](https://github.com/hirokisakabe/pom/commit/dc70a07d5ae20ca49fcdba5feefd2410a4d7c0c0) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - VStack / HStack で shadow 属性をサポート

### Patch Changes

- [#299](https://github.com/hirokisakabe/pom/pull/299) [`fb0b039`](https://github.com/hirokisakabe/pom/commit/fb0b039dca09c88bf7159939723c99efcd65db8c) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - fix: endArrow/beginArrow のブーリアン簡易形式とドット記法の同時指定を許容

## 5.0.1

### Patch Changes

- [#293](https://github.com/hirokisakabe/pom/pull/293) [`103ce6e`](https://github.com/hirokisakabe/pom/commit/103ce6e43ebc1d455001a740a0e895822f06355d) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - Icon の color 属性で `#` なし hex カラーを受け付けるように変更（`#` 付きに自動正規化）

## 5.0.0

### Major Changes

- [#289](https://github.com/hirokisakabe/pom/pull/289) [`6f55755`](https://github.com/hirokisakabe/pom/commit/6f55755aea3076d593a0096302127c4ed21085ba) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - プロパティ名をCSS-in-JS準拠にリネーム: fontPx→fontSize, alignText→textAlign, lineSpacingMultiple→lineHeight

### Minor Changes

- [#290](https://github.com/hirokisakabe/pom/pull/290) [`b2fc4ee`](https://github.com/hirokisakabe/pom/commit/b2fc4eeed3bc3a83fdd871ba5a63528fde335170) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - ネスト属性のドット記法サポートを追加（例: fill.color="1D4ED8"）。fill, border, shadow, line, backgroundImage, connectorStyle, arrow, endArrow, underline, padding が対象。

- [#284](https://github.com/hirokisakabe/pom/pull/284) [`5fed8a0`](https://github.com/hirokisakabe/pom/commit/5fed8a0e3e2cecda959cc91fe8cee4d37443fec4) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - アイコンプリセットライブラリ機能を追加。`<Icon name="cpu" size="32" color="#1D4ED8" />` のようにLucideアイコンを名前指定で挿入可能に。47個のビジネス向けアイコンをプリセット。

## 4.1.1

### Patch Changes

- [#275](https://github.com/hirokisakabe/pom/pull/275) [`4e863b0`](https://github.com/hirokisakabe/pom/commit/4e863b051f96601a4a9500f8c0723d00d8282de6) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - Text ノードのスペースのみテキストコンテンツが消える問題を修正

## 4.1.0

### Minor Changes

- [#266](https://github.com/hirokisakabe/pom/pull/266) [`a5a2089`](https://github.com/hirokisakabe/pom/commit/a5a208914f9ff6366614b4c4ab63ba4767df0235) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - ProcessArrow のデザインを改善: custGeom によるカスタムジオメトリで矢印をより鋭利に、デフォルト高さを 60px → 80px に変更

## 4.0.0

### Major Changes

- [#261](https://github.com/hirokisakabe/pom/pull/261) [`e1e73ab`](https://github.com/hirokisakabe/pom/commit/e1e73ab75578776dda18bafbce256ae2aaf1a298) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - 複合ノードの子要素XMLタグ名をプレフィックス方式に統一

  **破壊的変更**: 以下のXMLタグ名が変更されました。既存のXMLを更新する必要があります。
  - `Step` → `ProcessArrowStep`
  - `Level` → `PyramidLevel`
  - `Axes` → `MatrixAxes`
  - `Quadrants` → `MatrixQuadrants`
  - `Connection` → `FlowConnection`
  - `Series` → `ChartSeries`
  - `DataPoint` → `ChartDataPoint`
  - `Column` → `TableColumn`
  - `Row` → `TableRow`
  - `Cell` → `TableCell`

  変更なし: `TimelineItem`, `TreeItem`, `MatrixItem`, `FlowNode`, `Li`

### Minor Changes

- [#252](https://github.com/hirokisakabe/pom/pull/252) [`9987b3c`](https://github.com/hirokisakabe/pom/commit/9987b3c0f5680c1cf377a2a4ebc85beecd2e20a3) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - feat: ピラミッド図を作成する PyramidNode を追加

- [#250](https://github.com/hirokisakabe/pom/pull/250) [`29a715f`](https://github.com/hirokisakabe/pom/commit/29a715fe0745bbb25d48172990e4440b8f1748b8) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - TableCellにcolspan/rowspanプロパティを追加し、セル結合を可能にした

### Patch Changes

- [#262](https://github.com/hirokisakabe/pom/pull/262) [`6de8e08`](https://github.com/hirokisakabe/pom/commit/6de8e08fa931eea206e66716838fd32f28dac283) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - Ul/Ol の高さ計算をフォントメトリクスベースに修正し、バレットインデント分の幅を考慮するように改善

## 3.0.0

### Major Changes

- [#247](https://github.com/hirokisakabe/pom/pull/247) [`805fc92`](https://github.com/hirokisakabe/pom/commit/805fc92ea74bf048193c54af5242158e7be841cc) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - Ul/Ol/Li ノードを追加し、Text.bullet を廃止
  - `<Ul>` + `<Li>` で箇条書きリスト、`<Ol>` + `<Li>` で番号付きリストを記述可能に
  - Li ごとに個別のテキストスタイル（bold, italic, color, fontPx 等）を指定可能
  - Ol は numberType（alphaLcPeriod 等）と numberStartAt をサポート
  - Text ノードの bullet 属性を削除（破壊的変更）

### Minor Changes

- [#239](https://github.com/hirokisakabe/pom/pull/239) [`db614e5`](https://github.com/hirokisakabe/pom/commit/db614e5da89df38d047d6964f0e60311baec166e) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - ShapeNodeのテキストスタイルプロパティを拡張（fontFamily, lineSpacingMultiple を追加）

- [#245](https://github.com/hirokisakabe/pom/pull/245) [`36adf73`](https://github.com/hirokisakabe/pom/commit/36adf732d762cc5ae3b66c589263ea42544b9fb1) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - コンポジットノード（Tree, ProcessArrow, Timeline, Matrix, Flow）の Scale to Fit 対応。親コンテナより大きい場合に等比縮小して描画されるようになった。

## 2.0.0

### Major Changes

- [#215](https://github.com/hirokisakabe/pom/pull/215) [`3e14f52`](https://github.com/hirokisakabe/pom/commit/3e14f52dad4930ee83db6774d9b78d3b60ff8974) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - コンポーネント機能を削除: defineComponent, expandComponents, expandComponentSlides, Theme, mergeTheme, ComponentRegistry を削除。parseXml で未知タグはエラーをスローするよう変更。

- [#218](https://github.com/hirokisakabe/pom/pull/218) [`3ea9400`](https://github.com/hirokisakabe/pom/commit/3ea94002e33f38df6b0a1fc54cf7e93b1862dd52) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - buildPptx APIの入力をPOMNode[]からXML文字列に変更。parseXml、inputPomNodeSchema、POMNode型を公開APIから削除し内部に降格。./schemaエクスポートパスを削除。

### Minor Changes

- [#225](https://github.com/hirokisakabe/pom/pull/225) [`d2953f8`](https://github.com/hirokisakabe/pom/commit/d2953f840e783f1858d4f94ef0a05d8ca48b7d2b) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - parseXmlのバリデーション・エラーメッセージを改善。未知の属性名検出（Did you mean?提案付き）、Zodスキーマによるセマンティックバリデーション（enum値、数値範囲、必須属性）、リーフノードへの不正な子要素検出、複数エラーの一括報告に対応。ParseXmlErrorクラスを新規exportし、プログラム的なエラーハンドリングが可能に。

- [#212](https://github.com/hirokisakabe/pom/pull/212) [`eb345fd`](https://github.com/hirokisakabe/pom/commit/eb345fd6888a8c630600b4f63535468078aea095) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - feat: XML子要素記法のサポートを追加（Chart, Table, Flow, Tree, Timeline, Matrix, ProcessArrow）

### Patch Changes

- [#224](https://github.com/hirokisakabe/pom/pull/224) [`b5ab195`](https://github.com/hirokisakabe/pom/commit/b5ab195f7837f6529e44f41a203fd1fd6abe7ea3) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - LLM 向けコンパクト XML リファレンス（docs/llm-xml-reference.md）を追加

- [#226](https://github.com/hirokisakabe/pom/pull/226) [`17d7810`](https://github.com/hirokisakabe/pom/commit/17d781003ee0f0026d121aa078e7aa7585f737cc) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - ドキュメント・サンプルを XML ベースに書き直し、llm-integration.md を XML リファレンスに一本化

## 1.4.0

### Minor Changes

- [#198](https://github.com/hirokisakabe/pom/pull/198) [`21e8464`](https://github.com/hirokisakabe/pom/commit/21e8464971ca61380f4925aec8d8a68b0651d822) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - XML形式での入力サポートを追加。`parseXml()` 関数でXML文字列をPOMNode配列に変換可能に。

## 1.3.0

### Minor Changes

- [#194](https://github.com/hirokisakabe/pom/pull/194) [`8d42f09`](https://github.com/hirokisakabe/pom/commit/8d42f09e4d8a80b485f1b1b70ae92ffd743063cb) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - feat: スライドマスターおよび全ノードに背景画像（backgroundImage）をサポート

- [#192](https://github.com/hirokisakabe/pom/pull/192) [`16b4055`](https://github.com/hirokisakabe/pom/commit/16b4055d71b89760aa462415ad4eed652803e758) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - Box, Image ノードに shadow（ドロップシャドウ）プロパティを追加

- [#191](https://github.com/hirokisakabe/pom/pull/191) [`5e321eb`](https://github.com/hirokisakabe/pom/commit/5e321eb00326752d56eecf4344c513ce34484be2) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - feat: 透過（opacity）をサポート

## 1.2.0

### Minor Changes

- [#183](https://github.com/hirokisakabe/pom/pull/183) [`55a2950`](https://github.com/hirokisakabe/pom/commit/55a295092e9519b501cc26ab3b81b817eb08d93a) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - feat: 画像に sizing 機能（contain/cover/crop）を追加

- [#181](https://github.com/hirokisakabe/pom/pull/181) [`c6f4b37`](https://github.com/hirokisakabe/pom/commit/c6f4b3747d28bf955736d61a12f1e8c0fe9c2c71) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - feat: テキストに italic、underline、strike、highlight プロパティを追加

  TextNode、TableCell、ShapeNode、ProcessArrowNode、MasterTextObject でテキストスタイルの装飾が可能に。

- [#185](https://github.com/hirokisakabe/pom/pull/185) [`75eb6a0`](https://github.com/hirokisakabe/pom/commit/75eb6a0356eb78f33bd9acfd505f48ff4cc66e97) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - feat: コンポーネント/テンプレート機構を追加（defineComponent, Theme, mergeTheme）

### Patch Changes

- [#184](https://github.com/hirokisakabe/pom/pull/184) [`dd1e0cd`](https://github.com/hirokisakabe/pom/commit/dd1e0cda340abf8ebfc1a76f67c0a4ce0824bfd5) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - fix: HStack内のテーブルで幅が正しく計算されない問題を修正

  HStackの子要素に対する均等分割（flexGrow: 1, flexBasis: 0）がテーブルノードにも適用されていた問題を修正。テーブルはsetMeasureFuncでカラム幅合計を返すため、均等分割の対象から除外。

## 1.1.3

### Patch Changes

- [#179](https://github.com/hirokisakabe/pom/pull/179) [`d3b8428`](https://github.com/hirokisakabe/pom/commit/d3b8428e833ead6b01eeb1f9d60e594fcec511ea) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - chore: zod を 4.1.12 から 4.3.6 にアップデート

## 1.1.2

### Patch Changes

- [#177](https://github.com/hirokisakabe/pom/pull/177) [`1350df4`](https://github.com/hirokisakabe/pom/commit/1350df4fc4953bd5839313a668a5c845105feecf) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - fix: schema.ts に不足していたノードスキーマのエクスポートを追加

  以下のスキーマと型を `@hirokisakabe/pom/schema` からエクスポートするように修正:
  - inputTimelineNodeSchema / InputTimelineNode
  - inputMatrixNodeSchema / InputMatrixNode
  - inputTreeNodeSchema / InputTreeNode
  - inputFlowNodeSchema / InputFlowNode
  - inputProcessArrowNodeSchema / InputProcessArrowNode
  - inputLineNodeSchema / InputLineNode
  - inputLayerNodeSchema / InputLayerNode

## 1.1.1

### Patch Changes

- [#175](https://github.com/hirokisakabe/pom/pull/175) [`21f31a5`](https://github.com/hirokisakabe/pom/commit/21f31a55f984d9a65c16c95b710d92a4a14e5941) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - fix: ESM 環境での import 拡張子問題を修正
  - TypeScript の `moduleResolution: NodeNext` と `rewriteRelativeImportExtensions` を使用して、ビルド時に相対 import に `.js` 拡張子を自動追加
  - これにより `@hirokisakabe/pom/schema` を ESM 環境でインポートした際に発生していた `ERR_MODULE_NOT_FOUND` エラーを解消

## 1.1.0

### Minor Changes

- [#171](https://github.com/hirokisakabe/pom/pull/171) [`ad7cd40`](https://github.com/hirokisakabe/pom/commit/ad7cd400794ee4b7c48947e187bc046dd505702e) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - feat: `layer` ノードの追加（絶対配置コンテナ）

  子要素を絶対座標（x, y）で配置できる `layer` ノードを追加しました。
  - 子要素は `x`, `y` を必須プロパティとして持つ
  - 描画順序は配列の順序（後の要素が上に来る）
  - layer は VStack/HStack 内に配置可能（layer 自体のサイズは Flexbox で決まる）
  - layer 内に layer をネスト可能
  - layer 内に VStack/HStack を配置可能

- [#168](https://github.com/hirokisakabe/pom/pull/168) [`9885a29`](https://github.com/hirokisakabe/pom/commit/9885a29076a9d355acfa0c7d1548fc94314d9de8) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - feat: line ノードの追加

  接続線・矢印を描画するための `line` ノードを追加しました。
  - 絶対座標（x1, y1, x2, y2）で始点・終点を指定
  - 線の色（color）、太さ（lineWidth）、破線パターン（dashType）をサポート
  - 矢印オプション（beginArrow, endArrow）をサポート
  - 矢印タイプ（none, arrow, triangle, diamond, oval, stealth）を指定可能

## 1.0.0

### Major Changes

- [#161](https://github.com/hirokisakabe/pom/pull/161) [`f926577`](https://github.com/hirokisakabe/pom/commit/f92657708da4f9daaf48e83387c1226a5bff8349) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - BREAKING CHANGE: Replace MasterSlideOptions with SlideMasterOptions

  This release replaces the pseudo master slide implementation with pptxgenjs's native `defineSlideMaster` API, creating true PowerPoint master slides that are editable in PowerPoint.

  ### Breaking Changes
  - **Removed**: `MasterSlideOptions` type
  - **Removed**: `composePage` and `replacePlaceholders` internal functions
  - **Removed**: Dynamic placeholders (`{{page}}`, `{{totalPages}}`, `{{date}}`)
  - **Removed**: `header` and `footer` options (use `objects` instead)
  - **Removed**: `pageNumber.position` option (use `slideNumber` instead)

  ### New API

  The new `SlideMasterOptions` type provides:
  - `title`: Master slide name (optional, auto-generated if omitted)
  - `background`: Slide background (`{ color }`, `{ path }`, or `{ data }`)
  - `margin`: Content margins in pixels
  - `objects`: Array of static objects (`text`, `image`, `rect`, `line`) with absolute coordinates
  - `slideNumber`: Page number configuration using pptxgenjs built-in feature

  ### Migration Guide

  Before:

  ```typescript
  {
    master: {
      header: { type: "hstack", ... },
      footer: { type: "hstack", ... },
      pageNumber: { position: "right" },
      date: { value: "2025/01/01" },
    }
  }
  ```

  After:

  ```typescript
  {
    master: {
      title: "MY_MASTER",
      objects: [
        { type: "rect", x: 0, y: 0, w: 1280, h: 40, fill: { color: "0F172A" } },
        { type: "text", text: "Header", x: 48, y: 12, w: 200, h: 28, fontPx: 14 },
        { type: "text", text: "2025/01/01", x: 1032, y: 12, w: 200, h: 28, fontPx: 12 },
      ],
      slideNumber: { x: 1100, y: 680, fontPx: 10 },
    }
  }
  ```

## 0.3.0

### Minor Changes

- [#159](https://github.com/hirokisakabe/pom/pull/159) [`a0b8407`](https://github.com/hirokisakabe/pom/commit/a0b84072e7107ca0422bdaf65b66d193c9b39be7) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - feat: ブラウザ互換性対応 - canvas を opentype.js に置き換え
  - `canvas` パッケージを `opentype.js` に置き換え
  - Noto Sans JP フォントをライブラリにバンドル（Base64）
  - Node.js とブラウザ両方で動作するテキスト計測を実現
  - `TextMeasurementMode` の値を `"canvas"` から `"opentype"` に変更

  BREAKING CHANGE: `textMeasurement` オプションの `"canvas"` 値は `"opentype"` に変更されました

### Patch Changes

- [#157](https://github.com/hirokisakabe/pom/pull/157) [`459217e`](https://github.com/hirokisakabe/pom/commit/459217ea4c411ba94762ab991c4c7688e1a303e4) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - refactor: measureText.ts の重複コード排除
  - measureTextCanvas と measureTextFallback の折り返しロジックを wrapText 関数に抽出
  - 結果計算ロジックを calculateResult 関数に抽出
  - 約50行の削減

- [#158](https://github.com/hirokisakabe/pom/pull/158) [`eb3c332`](https://github.com/hirokisakabe/pom/commit/eb3c332d94f3cb1c8e1bf46f11620a833323c684) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - refactor: calcYogaLayout.ts の Flex 処理を統合

- [#155](https://github.com/hirokisakabe/pom/pull/155) [`597912f`](https://github.com/hirokisakabe/pom/commit/597912f7b127dc303dad67db6801a973b32a334f) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - refactor: renderPptx.ts をノードタイプ別に分割
  - renderPptx.ts を 1,171行から 110行に削減
  - ノードタイプごとにレンダラー関数を分離（nodes/配下）
  - 共通ユーティリティを utils/ に抽出（backgroundBorder, shapeDrawing, textDrawing）

## 0.2.0

### Minor Changes

- [#151](https://github.com/hirokisakabe/pom/pull/151) [`0537eee`](https://github.com/hirokisakabe/pom/commit/0537eeed1f20c34e99300548d4c93d7a461f7332) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - ProcessArrowNode を追加
