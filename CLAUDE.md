# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

pom (PowerPoint Object Model) は、TypeScript で PowerPoint プレゼンテーションを宣言的に記述するためのライブラリ。Flexbox スタイルのレイアウトを yoga-layout で計算し、pptxgenjs で PPTX を生成する。

## コマンド

```bash
npm run build             # TypeScriptコンパイル
npm run lint              # ESLint
npm run fmt               # Prettierフォーマット
npm run fmt:check         # フォーマットチェック
npm run typecheck         # 型チェック
npm run test:run          # テスト実行
npm run test              # テスト（watchモード）
npx tsx main.ts           # サンプル実行（sample.pptx生成）
npm run vrt:docker        # VRT実行（Docker環境）
npm run vrt:docker:update # VRTベースライン更新（Docker環境）
npm run preview:docker    # プレビュー（main.tsのPPTXをPNG化）
```

## ディレクトリ構造

```
src/
├── index.ts              # 公開API
├── types.ts              # 型定義
├── inputSchema.ts        # 入力スキーマ（Zod、内部用）
├── parseXml.ts           # XML入力パーサー（fast-xml-parser、内部用）
├── buildPptx.ts          # メイン処理（XML → parseXml → レイアウト → PPTX）
├── calcYogaLayout/       # レイアウト計算（yoga-layout）
├── toPositioned/         # 絶対座標変換
├── renderPptx/           # PPTX描画（pptxgenjs）
└── table/                # テーブルユーティリティ

vrt/                      # Visual Regression Test
preview/                  # プレビュー基盤（Claude Code用）
```

## アーキテクチャ

PPTX 生成は3段階のパイプライン:

1. **calcYogaLayout** (`src/calcYogaLayout/`) - POMNode ツリーを走査し、yoga-layout でレイアウト計算。各ノードに `yogaNode` をセット
2. **toPositioned** (`src/toPositioned/`) - 計算済みレイアウトから絶対座標を持つ PositionedNode ツリーを生成
3. **renderPptx** (`src/renderPptx/`) - PositionedNode を pptxgenjs API に変換してスライド描画

### 公開API

- `buildPptx(xml: string, slideSize, options?)` - XML 文字列を受け取り PPTX を生成するメイン関数
- `TextMeasurementMode` - テキスト計測モード（`"opentype"` | `"fallback"` | `"auto"`）
- `SlideMasterOptions` - スライドマスター設定（title, background, margin, objects, slideNumber）

### 主要な内部型

- `POMNode` - 入力ノード型（内部型。Text, Image, Table, Shape, Chart, Timeline, Matrix, Tree, Flow, ProcessArrow, Line, Layer, Box, VStack, HStack）
- `PositionedNode` - 位置情報付きノード（x, y, w, h を持つ）
- `parseXml` - XML 文字列を POMNode 配列に変換する内部関数（タグ名は PascalCase、属性値は Zod スキーマで型変換、未知タグはエラー）

### 単位変換

- ユーザー入力: ピクセル（px）
- 内部レイアウト: ピクセル（yoga-layout）
- PPTX 出力: インチ（`pxToIn` で変換、96 DPI 基準）

### テキスト計測

テキストの幅計測には `opentype.js` を使用。Noto Sans JP フォントをライブラリにバンドルしており、Node.js とブラウザの両方で動作する。

- `src/calcYogaLayout/measureText.ts` - テキスト計測ロジック
- `src/calcYogaLayout/fontLoader.ts` - フォント読み込み（opentype.js）
- `src/calcYogaLayout/fonts/` - バンドルされたフォント（Base64）
- `buildPptx` の `textMeasurement` オプションで計測方法を明示的に指定可能
  - `"opentype"`: 常に opentype.js で計測（デフォルト）
  - `"fallback"`: 常にフォールバック計算（CJK文字=1em、英数字=0.5em）
  - `"auto"`: opentype.js で計測（デフォルト）

## 機能追加時のチェックリスト

新しいプロパティや機能を追加する際は、以下のファイルを更新すること：

1. **型定義**: `src/types.ts` - 新しい型やプロパティを追加
2. **入力スキーマ**: `src/inputSchema.ts` - Zod スキーマを追加（内部バリデーション用）
3. **XMLパーサー**: `src/parseXml.ts` - XML タグ/属性の変換処理を追加
4. **描画処理**: `src/renderPptx/` 配下 - pptxgenjs への変換処理を実装
5. **VRT テストデータ**: `vrt/lib/generatePptx.ts` - 新機能のテストケースを追加
6. **VRT ベースライン更新**: `npm run vrt:docker:update` を実行
7. **ドキュメント更新**:
   - `README.md` - ユーザー向けドキュメント
   - `docs/nodes.md` - ノードリファレンス
   - `docs/llm-integration.md` - LLM 向け XML リファレンス（プロンプト用）
   - `CLAUDE.md` - 主要な型セクションに追加
8. **changeset 追加**: PR 作成前に `npx changeset add` を実行

## プレビューワークフロー（Claude Code用）

main.ts を修正して PPTX の出力を確認する際は、以下の手順で行う:

1. main.ts を編集（必要に応じて src/ 配下のロジックも修正）
2. `npm run preview:docker` を実行して PNG を生成
3. `preview/output/sample.png` を Read ツールで視覚的に確認
4. レイアウトに問題があれば修正して 2 に戻る
5. 問題なければコミット

### 出力ファイル

- `preview/output/sample.pptx` - 生成された PPTX
- `preview/output/sample.png` - PNG 化された画像（レイアウト確認用）
