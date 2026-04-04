---
"@hirokisakabe/pom-md": major
---

feat: Directive 対応（frontmatter 拡張 + コメント directive）

### Breaking Change
- `parseMd()` の返り値を `string` から `{ xml: string; meta: ParseMdMeta }` に変更

### 新機能
- frontmatter に `masterPptx` と `backgroundColor` を追加
- コメント directive（`<!-- backgroundColor: value -->`）でスライド単位の背景色指定に対応
