# @hirokisakabe/pom-md

## 0.4.0

### Minor Changes

- [#600](https://github.com/hirokisakabe/pom/pull/600) [`b79338b`](https://github.com/hirokisakabe/pom/commit/b79338be26be3f38982cf8fff6dd4655cd2ac85e) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - テーブル変換時にヘッダー行のスタイル（bold, backgroundColor）と cellBorder をデフォルト付与

## 0.3.0

### Minor Changes

- [#567](https://github.com/hirokisakabe/pom/pull/567) [`89b844d`](https://github.com/hirokisakabe/pom/commit/89b844df5802787adf7aa0a5c80e763cfc53aa03) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - リンク（ハイパーリンク）のサポートを追加
  - pom core: `<A href="...">` タグによるインラインハイパーリンクをサポート。TextRun に `href` プロパティを追加し、pptxgenjs の `hyperlink` 機能と連携
  - pom-md: Markdown のリンク記法 `[text](url)` を `<A href="...">` タグに変換

## 0.2.0

### Minor Changes

- [#560](https://github.com/hirokisakabe/pom/pull/560) [`9ed325f`](https://github.com/hirokisakabe/pom/commit/9ed325f6240b6a54926ab94c85a6cb99af7fd667) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - Text, Li, TableCell ノード内で `<B>`/`<I>` タグによる部分的な太字・斜体をサポート。pom-md で Markdown の `**bold**` / `*italic*` が反映されるようになった。

## 0.1.1

### Patch Changes

- [#539](https://github.com/hirokisakabe/pom/pull/539) [`7a51188`](https://github.com/hirokisakabe/pom/commit/7a511883a976508b256ac5df769974b97fb1633b) Thanks [@hirokisakabe](https://github.com/hirokisakabe)! - TypeScript を 6.0.2 に統一し、ルート package.json に巻き上げ
