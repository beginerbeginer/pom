# API Reference

## buildPptx

The main function that takes an XML string and generates a PowerPoint presentation.

### Signature

```typescript
async function buildPptx(
  xml: string,
  slideSize: { w: number; h: number },
  options?: {
    master?: SlideMasterOptions;
    textMeasurement?: TextMeasurementMode;
    autoFit?: boolean;
  },
): Promise<PptxGenJS>;
```

### Parameters

#### `xml` (required)

An XML string describing the slide content. Each root-level element represents one slide. See [Nodes](./nodes.md) for available node types and [LLM Integration](./llm-integration.md) for the complete XML reference.

```typescript
const xml = `
<VStack w="100%" h="max" padding="48">
  <Text fontSize="32" bold="true">Slide 1</Text>
</VStack>
<VStack w="100%" h="max" padding="48">
  <Text fontSize="24">Slide 2</Text>
</VStack>
`;
```

#### `slideSize` (required)

The slide dimensions in pixels. Internally converted to inches at 96 DPI.

```typescript
// 16:9 (recommended)
{ w: 1280, h: 720 }

// 4:3
{ w: 960, h: 720 }
```

#### `options` (optional)

| Property          | Type                  | Default     | Description                               |
| ----------------- | --------------------- | ----------- | ----------------------------------------- |
| `master`          | `SlideMasterOptions`  | `undefined` | Slide master settings                     |
| `textMeasurement` | `TextMeasurementMode` | `"auto"`    | Text width measurement method             |
| `autoFit`         | `boolean`             | `true`      | Auto-fit content when it overflows slides |

### Return Value

Returns a [pptxgenjs](https://github.com/gitbrent/PptxGenJS) instance. Use `.writeFile()` or `.write()` to output the PPTX file.

```typescript
const pptx = await buildPptx(xml, { w: 1280, h: 720 });

// Save to file (Node.js)
await pptx.writeFile({ fileName: "output.pptx" });

// Get as base64 string
const base64 = await pptx.write({ outputType: "base64" });

// Get as ArrayBuffer
const buffer = await pptx.write({ outputType: "arraybuffer" });
```

### Errors

- **`ParseXmlError`** — Thrown when the XML string is invalid or contains unknown tags/attributes.

```typescript
import { buildPptx, ParseXmlError } from "@hirokisakabe/pom";

try {
  const pptx = await buildPptx(xml, { w: 1280, h: 720 });
} catch (e) {
  if (e instanceof ParseXmlError) {
    console.error("Invalid XML:", e.message);
  }
}
```

---

## Options

### master

Defines a slide master with static objects and page numbers applied to all slides. See [Master Slide](./master-slide.md) for full documentation.

```typescript
const pptx = await buildPptx(
  xml,
  { w: 1280, h: 720 },
  {
    master: {
      title: "MY_MASTER",
      background: { color: "F8FAFC" },
      objects: [
        {
          type: "text",
          text: "Header",
          x: 48,
          y: 12,
          w: 200,
          h: 28,
          fontSize: 14,
        },
      ],
      slideNumber: { x: 1100, y: 690, fontSize: 10 },
    },
  },
);
```

### textMeasurement

Controls how text width is measured for line breaking and layout. See [Text Measurement](./text-measurement.md) for full documentation.

| Value        | Description                                                |
| ------------ | ---------------------------------------------------------- |
| `"opentype"` | Always use opentype.js for measurement                     |
| `"fallback"` | Use fallback calculation (CJK = 1em, alphanumeric = 0.5em) |
| `"auto"`     | Use opentype.js (same as `"opentype"`) — default           |

```typescript
const pptx = await buildPptx(
  xml,
  { w: 1280, h: 720 },
  {
    textMeasurement: "fallback",
  },
);
```

### autoFit

When enabled (default), content that exceeds the slide height is automatically adjusted to fit. Adjustments are applied in priority order:

1. Reduce table row heights
2. Reduce text font sizes
3. Reduce gap / padding
4. Uniform scaling (fallback)

```typescript
// Disable auto-fit
const pptx = await buildPptx(
  xml,
  { w: 1280, h: 720 },
  {
    autoFit: false,
  },
);
```

---

## Exported Types

```typescript
import type {
  TextMeasurementMode,
  SlideMasterOptions,
  SlideMasterBackground,
  SlideMasterMargin,
  MasterObject,
  MasterTextObject,
  MasterImageObject,
  MasterRectObject,
  MasterLineObject,
  SlideNumberOptions,
} from "@hirokisakabe/pom";
```
