---
paths:
  - packages/pom-react/**
---

## pom-react (`packages/pom-react/`)

React JSX で宣言的に PPTX を生成するレイヤー。**fork 専用パッケージ**。

### 変換パイプライン

```
JSX
 └─ jsx() / jsxs()         # jsx-runtime.ts — JSXタグ → POMElement
     └─ renderToPOMNodes()  # renderer.ts — POMElement[] → SerializableNode[]
         └─ serializeToXml() # serializer.ts — SerializableNode[] → XML string
             └─ buildPptx()  # @hirokisakabe/pom — XML → PPTX
```

### コマンド（packages/pom-react/ から）

```bash
pnpm run build       # TypeScript コンパイル
pnpm run typecheck   # 型チェック
pnpm run lint        # ESLint
pnpm run fmt         # Prettier
pnpm run test:run    # テスト実行
```

Root: `pnpm --filter @miyabi/pom-react run <script>`

### Feature Addition Checklist

新コンポーネント・機能を追加する際は以下をすべて更新:

1. **`src/types.ts`** — 新しいProps型を追加
2. **`src/jsx-runtime.ts`** — 必要であればタグ処理を更新
3. **`src/renderer.ts`** — `VALID_TAGS` にタグ名を追加
4. **`src/serializer.ts`** — 特殊なシリアライズが必要な場合のみ更新
5. **`src/components/index.ts`** — Props型をエクスポートに追加
6. **`src/index.ts`** — Props型をエクスポートに追加
7. **テスト追加** — `src/*.test.ts` に基本動作テストを追加

### 制約

- `@hirokisakabe/pom` からは `buildPptx()` と公開型のみインポートする
- 内部API（`calcYogaLayout`, `toPositioned`, `renderPptx` など）を直接使わない
- `packages/pom/` など変更禁止ゾーンは絶対に変更しない
