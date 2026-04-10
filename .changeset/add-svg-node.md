---
"@hirokisakabe/pom": minor
---

feat: Svg ノードを追加し、インラインSVGの発見可能性を向上

- `<Svg>` ノードでインラインSVGを描画可能に（`width`, `height`, `color` 属性）
- `Icon` ノードから `<svg>` 子要素によるインラインSVG機能を廃止（破壊的変更）
- `Icon` ノードの `rasterizeSvgContent` を内部で共有し、実装の重複なし
