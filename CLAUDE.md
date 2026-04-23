AGENTS.md

---

## Fork 運用ルール（beginerbeginer/pom 専用）

このリポジトリは [hirokisakabe/pom](https://github.com/hirokisakabe/pom) の fork。
upstream に一切迷惑をかけないため、以下のルールを厳守する。

### upstream リモート

```bash
git remote add upstream https://github.com/hirokisakabe/pom.git
git fetch upstream
git merge upstream/main   # 定期的に実施してupstreamを追従
```

### 変更禁止ゾーン（upstream 追従専用）

以下のディレクトリは **編集禁止**。upstream の変更を取り込むだけ。
Claude Code は絶対にここを変更しない。

- `packages/pom/`
- `packages/pom-md/`
- `packages/pom-vscode/`
- `apps/website/`

upstream にマージできる汎用的なバグ修正を発見した場合は、
fork 専用ブランチとは別に `fix/upstream-xxx` ブランチを切って上流に PR する。

### 開発ゾーン（fork 専用）

すべての新機能実装は以下のみ:

- `packages/pom-react/` — React JSX で PPTX を生成するレイヤー

`@hirokisakabe/pom` は peer dependency として参照し、内部実装には依存しない。

### パッケージ名ルール

| パッケージ | スコープ | 理由 |
|-----------|---------|------|
| `@hirokisakabe/pom` | upstream 管理 | 変更禁止 |
| `@hirokisakabe/pom-md` | upstream 管理 | 変更禁止 |
| `@miyabi/pom-react` | fork 専用 | npm 公開する場合もスコープを必ず変える |

### issue / PR ルール

- upstream の issue tracker (`hirokisakabe/pom`) には **一切書き込まない**
- このリポジトリ専用のラベル: `react-layer`

### ブランチ運用

```
feat/react-xxx   # pom-react の新機能
fix/react-xxx    # pom-react のバグ修正
chore/upstream-sync  # upstream マージ専用
```

---

## pom-react パッケージ（packages/pom-react/）

React JSX で宣言的に PPTX を作成するレイヤー。

### アーキテクチャ

```
React JSX → JSX Element Tree → POMNode[] → (buildPptx経由) → PPTX
```

カスタム JSX ファクトリ (`jsx-runtime.ts`) が React Element を `POMNode` に変換する。
下流パイプライン（calcYogaLayout / toPositioned / renderPptx）は `@hirokisakabe/pom` の
`buildPptx()` を呼ぶことで再利用する。

### パイプライン詳細

```
JSX
 └─ jsx() / jsxs()         # jsx-runtime.ts — JSX Element → POMElement
     └─ renderToPOMNodes()  # renderer.ts — POMElement[] → POMNode[]
         └─ serializeToXml() # serializer.ts — POMNode[] → XML string
             └─ buildPptx()  # @hirokisakabe/pom — XML → PPTX
```

### ディレクトリ構造

```
packages/pom-react/
├── src/
│   ├── index.ts             # public API: buildPptxFromReact()
│   ├── jsx-runtime.ts       # カスタムJSXファクトリ
│   ├── renderer.ts          # POMElement[] → POMNode[]
│   ├── serializer.ts        # POMNode[] → XML string
│   ├── types.ts             # POMElementProps 型定義
│   └── components/
│       └── index.ts         # VStack, HStack, Text, ... の型エクスポート
├── package.json
└── tsconfig.json
```

### コマンド（packages/pom-react/ から）

```bash
pnpm run build       # TypeScript コンパイル
pnpm run lint        # ESLint
pnpm run fmt         # Prettier
pnpm run typecheck   # 型チェック
pnpm run test:run    # テスト実行
```

Root: `pnpm --filter @miyabi/pom-react run <script>`

### Feature Addition Checklist（pom-react）

新しいコンポーネントや機能を追加する際は以下を確認:

1. `src/types.ts` — Props 型を追加（`@hirokisakabe/pom` の POMNode 型から導出）
2. `src/jsx-runtime.ts` — タグ名マッピングを追加
3. `src/serializer.ts` — XML シリアライズロジックを追加（必要な場合）
4. `src/components/index.ts` — 型エクスポートを追加
5. テストケースを追加
