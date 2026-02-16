---
"@hirokisakabe/pom": patch
---

fix: HStack内のテーブルで幅が正しく計算されない問題を修正

HStackの子要素に対する均等分割（flexGrow: 1, flexBasis: 0）がテーブルノードにも適用されていた問題を修正。テーブルはsetMeasureFuncでカラム幅合計を返すため、均等分割の対象から除外。
