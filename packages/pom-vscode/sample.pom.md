---
size: 16:9
backgroundColor: "#F0F4F8"
---

# pom-md Feature Showcase

This is a **paragraph** demonstrating inline formatting: **bold**, _italic_, and **_bold italic_** text.

You can also add [links](https://github.com/hirokisakabe/pom) inline.

---

<!-- backgroundColor: "#E0F2FE" -->

## Lists

- Unordered list item 1
- Unordered list item 2
- Unordered list item 3

1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3

---

<!-- backgroundColor: "#FEF3C7" -->

## Table

| Feature       | Status | Description        |
| ------------- | ------ | ------------------ |
| Live preview  | OK     | Real-time updates  |
| Debounce      | OK     | Smooth editing     |
| Error display | OK     | Inline diagnostics |

---

<!-- backgroundColor: "#F0FDF4" -->

## pomxml Code Fence

```pomxml
<HStack gap="24" alignItems="center">
  <Chart chartType="pie" w="300" h="200">
    <ChartSeries name="Usage">
      <ChartDataPoint label="TypeScript" value="60" />
      <ChartDataPoint label="XML" value="25" />
      <ChartDataPoint label="Other" value="15" />
    </ChartSeries>
  </Chart>
  <Flow direction="vertical" w="350" h="200" connectorStyle.color="1E293B" connectorStyle.width="2">
    <FlowNode id="edit" shape="flowChartProcess" text="Edit .pom.md" color="1D4ED8" textColor="FFFFFF" />
    <FlowNode id="preview" shape="flowChartProcess" text="Live Preview" color="16A34A" textColor="FFFFFF" />
    <FlowNode id="export" shape="flowChartTerminator" text="Export PPTX" color="DC2626" textColor="FFFFFF" />
    <FlowConnection from="edit" to="preview" />
    <FlowConnection from="preview" to="export" />
  </Flow>
</HStack>
```
