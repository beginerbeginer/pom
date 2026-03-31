---
"@hirokisakabe/pom": minor
"@hirokisakabe/pom-md": minor
---

リンク（ハイパーリンク）のサポートを追加

- pom core: `<A href="...">` タグによるインラインハイパーリンクをサポート。TextRun に `href` プロパティを追加し、pptxgenjs の `hyperlink` 機能と連携
- pom-md: Markdown のリンク記法 `[text](url)` を `<A href="...">` タグに変換
