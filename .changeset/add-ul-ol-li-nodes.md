---
"@hirokisakabe/pom": major
---

Ul/Ol/Li ノードを追加し、Text.bullet を廃止

- `<Ul>` + `<Li>` で箇条書きリスト、`<Ol>` + `<Li>` で番号付きリストを記述可能に
- Li ごとに個別のテキストスタイル（bold, italic, color, fontPx 等）を指定可能
- Ol は numberType（alphaLcPeriod 等）と numberStartAt をサポート
- Text ノードの bullet 属性を削除（破壊的変更）
