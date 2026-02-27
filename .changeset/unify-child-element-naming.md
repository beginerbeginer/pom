---
"@hirokisakabe/pom": major
---

複合ノードの子要素XMLタグ名をプレフィックス方式に統一

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
