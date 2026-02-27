# Nodes Reference

This document provides a complete reference for all node types available in pom.

## Common Properties

Layout attributes that all nodes can have.

```typescript
{
  w?: number | "max" | `${number}%`;
  h?: number | "max" | `${number}%`;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  padding?: number;
  backgroundColor?: string;
  backgroundImage?: {
    src: string;
    sizing?: "cover" | "contain";
  };
  border?: {
    color?: string;
    width?: number;
    dashType?: "solid" | "dash" | "dashDot" | "lgDash" | "lgDashDot" | "lgDashDotDot" | "sysDash" | "sysDot";
  };
  borderRadius?: number;
  opacity?: number;
}
```

- `backgroundColor` applies a fill to the entire node (e.g., `"F8F9FA"`).
- `backgroundImage` sets a background image on the node. `src` accepts a URL or local file path. `sizing` controls how the image fits: `"cover"` (default) fills the area, `"contain"` fits within the area.
- `border.width` is specified in px and can be combined with color and `dashType` to control the border.
- `borderRadius` specifies the corner radius in px. When specified, the background/border shape becomes a rounded rectangle.
- `opacity` specifies the transparency of the background color (0 = fully transparent, 1 = fully opaque). Useful for semi-transparent overlays with Layer nodes.

## Node List

### 1. Text

A node for displaying text.

![Text Node Example](./images/text.png)

```typescript
{
  type: "text";
  text: string;
  fontPx?: number;
  color?: string;
  alignText?: "left" | "center" | "right";
  bold?: boolean;
  italic?: boolean;
  underline?: boolean | { style?: UnderlineStyle; color?: string };
  strike?: boolean;
  highlight?: string;
  fontFamily?: string;
  lineSpacingMultiple?: number;
  bullet?: boolean | BulletOptions;

  // Common properties
  w?: number | "max" | `${number}%`;
  h?: number | "max" | `${number}%`;
  ...
}
```

- `color` specifies the text color as a hex color code (e.g., `"FF0000"`).
- `bold` enables bold text.
- `italic` enables italic text.
- `underline` enables underline. Use `true` for single underline, or an object for detailed settings (e.g., `{ style: "wavy", color: "FF0000" }`).
- `strike` enables strikethrough text.
- `highlight` specifies the text highlight color as a hex color code (e.g., `"FFFF00"` for yellow).
- `fontFamily` specifies the font family (default: `"Noto Sans JP"`).
- `lineSpacingMultiple` specifies the line spacing multiplier (default: `1.3`).
- `bullet` enables bullet points. Use `true` for default bullets, or an object for detailed settings.

**UnderlineStyle:**

`"dash"` | `"dashHeavy"` | `"dashLong"` | `"dashLongHeavy"` | `"dbl"` | `"dotDash"` | `"dotDotDash"` | `"dotted"` | `"dottedHeavy"` | `"heavy"` | `"none"` | `"sng"` | `"wavy"` | `"wavyDbl"` | `"wavyHeavy"`

**BulletOptions:**

```typescript
{
  type?: "bullet" | "number";  // "bullet": symbol, "number": numbered
  indent?: number;             // Indent level
  numberType?: "alphaLcParenBoth" | "alphaLcParenR" | "alphaLcPeriod" |
               "alphaUcParenBoth" | "alphaUcParenR" | "alphaUcPeriod" |
               "arabicParenBoth" | "arabicParenR" | "arabicPeriod" | "arabicPlain" |
               "romanLcParenBoth" | "romanLcParenR" | "romanLcPeriod" |
               "romanUcParenBoth" | "romanUcParenR" | "romanUcPeriod";
  numberStartAt?: number;      // Starting number
}
```

**Usage Examples:**

```xml
<!-- Simple bullet list -->
<Text bullet="true">Item 1
Item 2
Item 3</Text>

<!-- Numbered list -->
<Text bullet='{"type":"number"}'>Step 1
Step 2
Step 3</Text>

<!-- Lowercase alphabet (a. b. c.) -->
<Text bullet='{"type":"number","numberType":"alphaLcPeriod"}'>Item A
Item B
Item C</Text>

<!-- Numbered list starting from 5 -->
<Text bullet='{"type":"number","numberStartAt":5}'>Fifth
Sixth
Seventh</Text>
```

### 2. Image

A node for displaying images.

![Image Node Example](./images/image.png)

- If `w` and `h` are not specified, the actual image size is automatically used
- If size is specified, the image is displayed at that size (aspect ratio is not preserved)
- Use `sizing` to control how the image fits within its bounds:
  - `contain`: Maintains aspect ratio, fits within the specified size
  - `cover`: Maintains aspect ratio, covers the entire specified size
  - `crop`: Crops the image to the specified region

```typescript
{
  type: "image";
  src: string;  // Image path (local path, URL, or base64 data)
  sizing?: {
    type: "contain" | "cover" | "crop";
    w?: number;   // Sizing width (defaults to node width)
    h?: number;   // Sizing height (defaults to node height)
    x?: number;   // Crop X offset (crop only)
    y?: number;   // Crop Y offset (crop only)
  };
  shadow?: {
    type: "outer" | "inner";
    opacity?: number;
    blur?: number;
    angle?: number;
    offset?: number;
    color?: string;
  };

  // Common properties
  w?: number | "max" | `${number}%`;
  h?: number | "max" | `${number}%`;
  ...
}
```

### 3. Table

A node for drawing tables. Column widths and row heights are declared in px, with fine-grained control over cell decoration.

![Table Node Example](./images/table.png)

```typescript
{
  type: "table";
  columns: { width?: number }[];
  rows: {
    height?: number;
    cells: {
      text: string;
      fontPx?: number;
      color?: string;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean | { style?: UnderlineStyle; color?: string };
      strike?: boolean;
      highlight?: string;
      alignText?: "left" | "center" | "right";
      backgroundColor?: string;
    }[];
  }[];
  defaultRowHeight?: number;

  // Common properties
  w?: number | "max" | `${number}%`;
  h?: number | "max" | `${number}%`;
  ...
}
```

- If `columns[].width` is omitted, columns are evenly distributed across the table width.
- The sum of `columns` becomes the natural width of the table (can be overridden with `w` if needed).
- If `rows` `height` is omitted, `defaultRowHeight` is applied (32px if unspecified).
- Cell background and font decoration can be specified individually for each element in `cells`.

**XML Child Element Notation:**

```xml
<Table>
  <Column width="200" />
  <Column width="100" />
  <Row>
    <Cell bold="true">Name</Cell>
    <Cell bold="true">Score</Cell>
  </Row>
  <Row>
    <Cell>Alice</Cell>
    <Cell>95</Cell>
  </Row>
</Table>
```

### 4. Shape

A node for drawing shapes. Different representations are possible with or without text, supporting complex visual effects.

![Shape Node Example](./images/shape.png)

```typescript
{
  type: "shape";
  shapeType: PptxGenJS.SHAPE_NAME;  // e.g., "roundRect", "ellipse", "cloud", "star5"
  text?: string;                     // Text to display inside the shape (optional)
  fill?: {
    color?: string;
    transparency?: number;
  };
  line?: {
    color?: string;
    width?: number;
    dashType?: "solid" | "dash" | "dashDot" | "lgDash" | "lgDashDot" | "lgDashDotDot" | "sysDash" | "sysDot";
  };
  shadow?: {
    type: "outer" | "inner";
    opacity?: number;
    blur?: number;
    angle?: number;
    offset?: number;
    color?: string;
  };
  fontPx?: number;
  color?: string;
  alignText?: "left" | "center" | "right";
  bold?: boolean;
  italic?: boolean;
  underline?: boolean | { style?: UnderlineStyle; color?: string };
  strike?: boolean;
  highlight?: string;

  // Common properties
  w?: number | "max" | `${number}%`;
  h?: number | "max" | `${number}%`;
  ...
}
```

**Common Shape Types:**

- `roundRect`: Rounded rectangle (title boxes, category displays)
- `ellipse`: Ellipse/circle (step numbers, badges)
- `cloud`: Cloud shape (comments, key points)
- `wedgeRectCallout`: Callout with arrow (annotations)
- `cloudCallout`: Cloud callout (comments)
- `star5`: 5-pointed star (emphasis, decoration)
- `downArrow`: Down arrow (flow diagrams)

### 5. Box

A generic container that wraps a single child element.

![Box Node Example](./images/box.png)

- Only **one** child element
- Used for grouping with padding or fixed size

```typescript
{
  type: "box";
  children: POMNode;
  shadow?: {
    type: "outer" | "inner";
    opacity?: number;
    blur?: number;
    angle?: number;
    offset?: number;
    color?: string;
  };

  // Common properties
  w?: number | "max" | `${number}%`;
  h?: number | "max" | `${number}%`;
  ...
}
```

### 6. VStack

Arranges child elements **vertically**.

![VStack Node Example](./images/vstack.png)

```typescript
{
  type: "vstack";
  children: POMNode[];
  alignItems: "start" | "center" | "end" | "stretch";
  justifyContent: "start" | "center" | "end" | "spaceBetween";
  gap?: number;

  // Common properties
  w?: number | "max" | `${number}%`;
  h?: number | "max" | `${number}%`;
  ...
}
```

### 7. HStack

Arranges child elements **horizontally**.

![HStack Node Example](./images/hstack.png)

```typescript
{
  type: "hstack";
  children: POMNode[];
  alignItems: "start" | "center" | "end" | "stretch";
  justifyContent: "start" | "center" | "end" | "spaceBetween";
  gap?: number;

  // Common properties
  w?: number | "max" | `${number}%`;
  h?: number | "max" | `${number}%`;
  ...
}
```

### 8. Chart

A node for drawing charts. Supports bar charts, line charts, pie charts, area charts, doughnut charts, and radar charts.

![Chart Node Example](./images/chart.png)

```typescript
{
  type: "chart";
  chartType: "bar" | "line" | "pie" | "area" | "doughnut" | "radar";
  data: {
    name?: string;           // Series name
    labels: string[];        // Category labels
    values: number[];        // Values
  }[];
  showLegend?: boolean;      // Show legend (default: false)
  showTitle?: boolean;       // Show title (default: false)
  title?: string;            // Title string
  chartColors?: string[];    // Data color array (hex color codes)
  radarStyle?: "standard" | "marker" | "filled";  // Radar-only: chart style

  // Common properties
  w?: number | "max" | `${number}%`;
  h?: number | "max" | `${number}%`;
  ...
}
```

**Usage Examples:**

```xml
<!-- Bar chart -->
<Chart chartType="bar" w="600" h="400" showLegend="true" showTitle="true"
  title="Monthly Sales &amp; Profit" chartColors='["0088CC","00AA00"]'>
  <Series name="Sales">
    <DataPoint label="Jan" value="100" />
    <DataPoint label="Feb" value="200" />
    <DataPoint label="Mar" value="150" />
    <DataPoint label="Apr" value="300" />
  </Series>
  <Series name="Profit">
    <DataPoint label="Jan" value="30" />
    <DataPoint label="Feb" value="60" />
    <DataPoint label="Mar" value="45" />
    <DataPoint label="Apr" value="90" />
  </Series>
</Chart>

<!-- Pie chart -->
<Chart chartType="pie" w="400" h="300" showLegend="true"
  chartColors='["0088CC","00AA00","FF6600","888888"]'>
  <Series name="Market Share">
    <DataPoint label="Product A" value="40" />
    <DataPoint label="Product B" value="30" />
    <DataPoint label="Product C" value="20" />
    <DataPoint label="Others" value="10" />
  </Series>
</Chart>

<!-- Radar chart -->
<Chart chartType="radar" w="400" h="300" showLegend="true"
  radarStyle="filled" chartColors='["0088CC"]'>
  <Series name="Skill Assessment">
    <DataPoint label="Technical" value="80" />
    <DataPoint label="Design" value="60" />
    <DataPoint label="PM" value="70" />
    <DataPoint label="Sales" value="50" />
    <DataPoint label="Support" value="90" />
  </Series>
</Chart>
```

**XML Child Element Notation:**

```xml
<Chart chartType="bar" w="600" h="400" showLegend="true">
  <Series name="Sales">
    <DataPoint label="Jan" value="100" />
    <DataPoint label="Feb" value="200" />
    <DataPoint label="Mar" value="150" />
  </Series>
  <Series name="Profit">
    <DataPoint label="Jan" value="30" />
    <DataPoint label="Feb" value="60" />
    <DataPoint label="Mar" value="45" />
  </Series>
</Chart>
```

### 9. Timeline

A node for creating timeline/roadmap visualizations. Supports horizontal and vertical layouts.

![Timeline Node Example](./images/timeline.png)

```typescript
{
  type: "timeline";
  direction?: "horizontal" | "vertical";  // Default: "horizontal"
  items: {
    date: string;           // Date/period label
    title: string;          // Item title
    description?: string;   // Optional description
    color?: string;         // Node color (hex, default: "1D4ED8")
  }[];

  // Common properties
  w?: number | "max" | `${number}%`;
  h?: number | "max" | `${number}%`;
  ...
}
```

**Usage Examples:**

```xml
<!-- Horizontal roadmap -->
<Timeline direction="horizontal" w="1000" h="120">
  <TimelineItem date="2025/Q1" title="Phase 1" description="Foundation" color="4CAF50" />
  <TimelineItem date="2025/Q2" title="Phase 2" description="Development" color="2196F3" />
  <TimelineItem date="2025/Q3" title="Phase 3" description="Testing" color="FF9800" />
  <TimelineItem date="2025/Q4" title="Phase 4" description="Release" color="E91E63" />
</Timeline>

<!-- Vertical project plan -->
<Timeline direction="vertical" w="400" h="300">
  <TimelineItem date="Week 1" title="Planning" />
  <TimelineItem date="Week 2-3" title="Development" />
  <TimelineItem date="Week 4" title="Release" />
</Timeline>
```

**XML Child Element Notation:**

```xml
<Timeline direction="horizontal" w="1000" h="120">
  <TimelineItem date="2025/Q1" title="Phase 1" description="Foundation" color="4CAF50" />
  <TimelineItem date="2025/Q2" title="Phase 2" description="Development" color="2196F3" />
  <TimelineItem date="2025/Q3" title="Phase 3" description="Release" color="E91E63" />
</Timeline>
```

### 10. Matrix

A node for creating 2x2 matrix/positioning maps. Commonly used for cost-effectiveness analysis, impact-effort prioritization, etc.

![Matrix Node Example](./images/matrix.png)

```typescript
{
  type: "matrix";
  axes: {
    x: string;  // X-axis label (e.g., "Cost")
    y: string;  // Y-axis label (e.g., "Effect")
  };
  quadrants?: {
    topLeft: string;     // Top-left quadrant label
    topRight: string;    // Top-right quadrant label
    bottomLeft: string;  // Bottom-left quadrant label
    bottomRight: string; // Bottom-right quadrant label
  };
  items: {
    label: string;       // Item label
    x: number;           // X coordinate (0-1, relative)
    y: number;           // Y coordinate (0-1, relative)
    color?: string;      // Item color (hex, default: "1D4ED8")
  }[];

  // Common properties
  w?: number | "max" | `${number}%`;
  h?: number | "max" | `${number}%`;
  ...
}
```

**Note:** The coordinate system uses (0, 0) as bottom-left and (1, 1) as top-right (mathematical coordinate system).

**Usage Examples:**

```xml
<!-- Cost-Effectiveness Matrix -->
<Matrix w="600" h="500">
  <Axes x="Cost" y="Effect" />
  <Quadrants
    topLeft="Low Cost / High Effect (Priority)"
    topRight="High Cost / High Effect (Consider)"
    bottomLeft="Low Cost / Low Effect (Low Priority)"
    bottomRight="High Cost / Low Effect (Avoid)" />
  <MatrixItem label="Initiative A" x="0.2" y="0.8" color="4CAF50" />
  <MatrixItem label="Initiative B" x="0.7" y="0.6" color="2196F3" />
  <MatrixItem label="Initiative C" x="0.3" y="0.3" color="FF9800" />
  <MatrixItem label="Initiative D" x="0.8" y="0.2" color="E91E63" />
</Matrix>

<!-- Simple Impact-Effort Matrix (without quadrant labels) -->
<Matrix w="500" h="400">
  <Axes x="Effort" y="Impact" />
  <MatrixItem label="Quick Win" x="0.15" y="0.85" />
  <MatrixItem label="Major Project" x="0.75" y="0.75" />
  <MatrixItem label="Fill-In" x="0.25" y="0.25" />
  <MatrixItem label="Time Sink" x="0.85" y="0.15" />
</Matrix>
```

**XML Child Element Notation:**

```xml
<Matrix w="600" h="500">
  <Axes x="Cost" y="Effect" />
  <Quadrants topLeft="Low Cost / High Effect" topRight="High Cost / High Effect"
    bottomLeft="Low Cost / Low Effect" bottomRight="High Cost / Low Effect" />
  <MatrixItem label="Initiative A" x="0.2" y="0.8" color="4CAF50" />
  <MatrixItem label="Initiative B" x="0.7" y="0.6" color="2196F3" />
</Matrix>
```

### 11. Tree

A node for creating tree structures such as organization charts, decision trees, and hierarchical diagrams.

![Tree Node Example](./images/tree.png)

```typescript
{
  type: "tree";
  layout?: "vertical" | "horizontal";  // Tree direction (default: "vertical")
  nodeShape?: "rect" | "roundRect" | "ellipse";  // Node shape (default: "rect")
  data: {
    label: string;       // Node label
    color?: string;      // Node color (hex, default: "1D4ED8")
    children?: TreeDataItem[];  // Child nodes
  };
  connectorStyle?: {
    color?: string;      // Connector line color (default: "333333")
    width?: number;      // Connector line width (default: 2)
  };
  nodeWidth?: number;    // Node width in px (default: 120)
  nodeHeight?: number;   // Node height in px (default: 40)
  levelGap?: number;     // Gap between levels in px (default: 60)
  siblingGap?: number;   // Gap between siblings in px (default: 20)

  // Common properties
  w?: number | "max" | `${number}%`;
  h?: number | "max" | `${number}%`;
  ...
}
```

**Usage Examples:**

```xml
<!-- Vertical Organization Chart -->
<Tree layout="vertical" nodeShape="roundRect" w="600" h="400"
  connectorStyle='{"color":"333333","width":2}'>
  <TreeItem label="CEO" color="1D4ED8">
    <TreeItem label="CTO" color="0EA5E9">
      <TreeItem label="Engineer A" />
      <TreeItem label="Engineer B" />
    </TreeItem>
    <TreeItem label="CFO" color="16A34A">
      <TreeItem label="Accountant" />
    </TreeItem>
  </TreeItem>
</Tree>

<!-- Horizontal Decision Tree -->
<Tree layout="horizontal" nodeShape="rect" w="600" h="300">
  <TreeItem label="Start">
    <TreeItem label="Option A">
      <TreeItem label="Result 1" />
      <TreeItem label="Result 2" />
    </TreeItem>
    <TreeItem label="Option B">
      <TreeItem label="Result 3" />
    </TreeItem>
  </TreeItem>
</Tree>
```

**XML Child Element Notation:**

```xml
<Tree layout="vertical" nodeShape="roundRect" w="600" h="400">
  <TreeItem label="CEO" color="1D4ED8">
    <TreeItem label="CTO" color="0EA5E9">
      <TreeItem label="Engineer A" />
      <TreeItem label="Engineer B" />
    </TreeItem>
    <TreeItem label="CFO" color="16A34A">
      <TreeItem label="Accountant" />
    </TreeItem>
  </TreeItem>
</Tree>
```

Note: `<Tree>` must have exactly one `<TreeItem>` root child. `<TreeItem>` can be nested recursively.

### 12. Flow

A node for creating flowcharts. Supports various node shapes and automatic layout.

![Flow Node Example](./images/flow.png)

```typescript
{
  type: "flow";
  direction?: "TB" | "LR";  // TB: top-to-bottom, LR: left-to-right (default: "TB")
  nodes: {
    id: string;           // Unique node identifier
    label: string;        // Node label
    shape?: "rect" | "roundRect" | "diamond" | "ellipse" | "parallelogram";  // Node shape (default: "rect")
    color?: string;       // Node color (hex, default: "1D4ED8")
  }[];
  edges: {
    from: string;         // Source node ID
    to: string;           // Target node ID
    label?: string;       // Edge label
  }[];
  nodeWidth?: number;     // Node width in px (default: 120)
  nodeHeight?: number;    // Node height in px (default: 40)
  nodeGap?: number;       // Gap between nodes in px (default: 60)
  rankGap?: number;       // Gap between ranks in px (default: 80)

  // Common properties
  w?: number | "max" | `${number}%`;
  h?: number | "max" | `${number}%`;
  ...
}
```

**Usage Examples:**

```xml
<!-- Simple vertical flowchart -->
<Flow direction="vertical" w="400" h="300">
  <FlowNode id="start" shape="flowChartTerminator" text="Start" color="4CAF50" />
  <FlowNode id="process" shape="flowChartProcess" text="Process" />
  <FlowNode id="decision" shape="flowChartDecision" text="OK?" color="FF9800" />
  <FlowNode id="end" shape="flowChartTerminator" text="End" color="E91E63" />
  <Connection from="start" to="process" />
  <Connection from="process" to="decision" />
  <Connection from="decision" to="end" label="Yes" />
</Flow>

<!-- Horizontal flowchart -->
<Flow direction="horizontal" w="600" h="200">
  <FlowNode id="input" shape="flowChartInputOutput" text="Input" />
  <FlowNode id="validate" shape="flowChartProcess" text="Validate" />
  <FlowNode id="save" shape="flowChartProcess" text="Save" />
  <FlowNode id="output" shape="flowChartInputOutput" text="Output" />
  <Connection from="input" to="validate" />
  <Connection from="validate" to="save" />
  <Connection from="save" to="output" />
</Flow>
```

**XML Child Element Notation:**

```xml
<Flow direction="vertical" w="400" h="300">
  <FlowNode id="start" shape="flowChartTerminator" text="Start" color="4CAF50" />
  <FlowNode id="process" shape="flowChartProcess" text="Process" />
  <FlowNode id="decision" shape="flowChartDecision" text="OK?" color="FF9800" />
  <FlowNode id="end" shape="flowChartTerminator" text="End" color="E91E63" />
  <Connection from="start" to="process" />
  <Connection from="process" to="decision" />
  <Connection from="decision" to="end" label="Yes" />
</Flow>
```

### 13. ProcessArrow

A node for creating chevron-style process diagrams. Commonly used for visualizing sequential steps in a workflow.

![ProcessArrow Node Example](./images/processArrow.png)

```typescript
{
  type: "processArrow";
  direction?: "horizontal" | "vertical";  // Default: "horizontal"
  steps: {
    label: string;       // Step label
    color?: string;      // Step color (hex, default: "4472C4")
    textColor?: string;  // Text color (hex, default: "FFFFFF")
  }[];
  itemWidth?: number;    // Step width in px (default: 150)
  itemHeight?: number;   // Step height in px (default: 60)
  gap?: number;          // Gap between steps in px (default: -15, negative for overlap)
  fontPx?: number;       // Font size (default: 14)
  bold?: boolean;        // Bold text (default: false)
  italic?: boolean;      // Italic text (default: false)
  underline?: boolean | { style?: UnderlineStyle; color?: string };
  strike?: boolean;      // Strikethrough text (default: false)
  highlight?: string;    // Text highlight color (hex)

  // Common properties
  w?: number | "max" | `${number}%`;
  h?: number | "max" | `${number}%`;
  ...
}
```

**Usage Examples:**

```xml
<!-- Horizontal process arrow with colors -->
<ProcessArrow direction="horizontal" w="1000" h="80">
  <Step label="Planning" color="4472C4" />
  <Step label="Design" color="5B9BD5" />
  <Step label="Development" color="70AD47" />
  <Step label="Testing" color="FFC000" />
  <Step label="Release" color="ED7D31" />
</ProcessArrow>

<!-- Vertical process arrow -->
<ProcessArrow direction="vertical" w="200" h="250">
  <Step label="Phase 1" color="4CAF50" />
  <Step label="Phase 2" color="2196F3" />
  <Step label="Phase 3" color="9C27B0" />
</ProcessArrow>

<!-- Custom styling -->
<ProcessArrow direction="horizontal" w="600" h="80"
  itemWidth="180" itemHeight="70" fontPx="16" bold="true">
  <Step label="Input" color="2196F3" />
  <Step label="Process" color="00BCD4" />
  <Step label="Output" color="009688" />
</ProcessArrow>
```

**XML Child Element Notation:**

```xml
<ProcessArrow direction="horizontal" w="1000" h="80">
  <Step label="Planning" color="4472C4" />
  <Step label="Design" color="5B9BD5" />
  <Step label="Development" color="70AD47" />
  <Step label="Testing" color="FFC000" />
  <Step label="Release" color="ED7D31" />
</ProcessArrow>
```

### 14. Line

A node for drawing lines and arrows. Uses absolute coordinates (x1, y1, x2, y2) for start and end points.

![Line Node Example](./images/line.png)

```typescript
{
  type: "line";
  x1: number;      // Start point X (px)
  y1: number;      // Start point Y (px)
  x2: number;      // End point X (px)
  y2: number;      // End point Y (px)
  color?: string;  // Line color (hex, default: "000000")
  lineWidth?: number;  // Line width (px, default: 1)
  dashType?: "solid" | "dash" | "dashDot" | "lgDash" | "lgDashDot" | "lgDashDotDot" | "sysDash" | "sysDot";
  beginArrow?: boolean | ArrowOptions;  // Arrow at start point
  endArrow?: boolean | ArrowOptions;    // Arrow at end point

  // Common properties (optional, not typically used with line)
  w?: number | "max" | `${number}%`;
  h?: number | "max" | `${number}%`;
  ...
}
```

**ArrowOptions:**

```typescript
{
  type?: "none" | "arrow" | "triangle" | "diamond" | "oval" | "stealth";
}
```

**Note:** Line nodes use absolute coordinates on the slide and are not affected by Yoga layout calculations. They are drawn at the exact positions specified by x1, y1, x2, y2.

**Usage Examples:**

```xml
<!-- Simple horizontal line -->
<Line x1="100" y1="100" x2="300" y2="100" color="333333" lineWidth="2" />

<!-- Arrow pointing right -->
<Line x1="100" y1="150" x2="300" y2="150" color="333333" lineWidth="2" endArrow="true" />

<!-- Bidirectional arrow -->
<Line x1="100" y1="200" x2="300" y2="200" color="333333" lineWidth="2" beginArrow="true" endArrow="true" />

<!-- Diagonal line with arrow (bottom-right direction) -->
<Line x1="100" y1="100" x2="250" y2="200" color="1D4ED8" lineWidth="2" endArrow="true" />

<!-- Dashed line -->
<Line x1="100" y1="250" x2="300" y2="250" color="333333" lineWidth="2" dashType="dash" />

<!-- Custom arrow type (diamond) -->
<Line x1="100" y1="300" x2="300" y2="300" color="1D4ED8" lineWidth="2" endArrow='{"type":"diamond"}' />
```

### 15. Layer

A container for absolute positioning of child elements. Child elements are positioned using `x` and `y` coordinates relative to the layer's top-left corner.

![Layer Node Example](./images/layer.png)

```typescript
{
  type: "layer";
  children: (POMNode & { x: number; y: number })[];

  // Common properties
  w?: number | "max" | `${number}%`;
  h?: number | "max" | `${number}%`;
  ...
}
```

- Child elements are positioned absolutely within the layer using `x` and `y` coordinates
- `x`, `y` are relative to the layer's top-left corner
- Drawing order follows array order (later elements are drawn on top)
- Layer itself participates in Flexbox layout (can be placed in VStack/HStack)
- Layers can be nested

**Usage Examples:**

```xml
<!-- Basic absolute positioning with overlapping shapes -->
<Layer w="600" h="400" backgroundColor="F0F4F8">
  <!-- Back shape (drawn first) -->
  <Shape shapeType="rect" x="50" y="50" w="120" h="100" fill='{"color":"1D4ED8"}' text="Back" color="FFFFFF" />
  <!-- Front shape (drawn on top) -->
  <Shape shapeType="rect" x="100" y="80" w="120" h="100" fill='{"color":"DC2626"}' text="Front" color="FFFFFF" />
</Layer>

<!-- Layer with VStack children for free-form layout -->
<Layer w="800" h="300" backgroundColor="F8FAFC">
  <VStack x="20" y="20" w="200" gap="8" padding="12" backgroundColor="FFFFFF">
    <Text fontPx="14" bold="true">Left Column</Text>
    <Text fontPx="12">Content A</Text>
  </VStack>
  <VStack x="300" y="20" w="200" gap="8" padding="12" backgroundColor="FFFFFF">
    <Text fontPx="14" bold="true">Right Column</Text>
    <Text fontPx="12">Content B</Text>
  </VStack>
</Layer>

<!-- Connection diagram with lines -->
<Layer w="800" h="200" backgroundColor="F8FAFC">
  <Shape shapeType="roundRect" x="50" y="60" w="150" h="80" fill='{"color":"1D4ED8"}' text="Service A" color="FFFFFF" />
  <Shape shapeType="roundRect" x="350" y="60" w="150" h="80" fill='{"color":"16A34A"}' text="Service B" color="FFFFFF" />
  <Line x1="200" y1="100" x2="350" y2="100" color="333333" lineWidth="2" endArrow="true" />
  <Text x="240" y="70" fontPx="10">API Call</Text>
</Layer>

<!-- Nested layers -->
<Layer w="600" h="150" backgroundColor="E3F2FD">
  <Text x="10" y="10" fontPx="12" bold="true">Outer Layer</Text>
  <Layer x="50" y="40" w="200" h="80" backgroundColor="FFF3E0">
    <Text x="10" y="30" fontPx="11">Inner Layer</Text>
  </Layer>
</Layer>
```
