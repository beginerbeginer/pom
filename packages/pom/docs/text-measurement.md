# Text Measurement

pom uses `opentype.js` with bundled Noto Sans JP fonts to measure text width and determine line break positions. This approach works consistently across all Node.js environments, including serverless platforms like Vercel or AWS Lambda.

## textMeasurement Option

You can specify the text measurement method using the `textMeasurement` option if needed:

```typescript
const { pptx } = await buildPptx(
  xml,
  { w: 1280, h: 720 },
  {
    textMeasurement: "auto", // "opentype" | "fallback" | "auto"
  },
);
```

| Value        | Description                                                                            |
| ------------ | -------------------------------------------------------------------------------------- |
| `"opentype"` | Always use opentype.js for text width measurement (default)                            |
| `"fallback"` | Always use fallback calculation (CJK characters = 1em, alphanumeric = 0.5em estimated) |
| `"auto"`     | Use opentype.js (same as "opentype", default)                                          |

## Font Resolution Rules

pom resolves the measurement method based on the `fontFamily` specified on each node:

1. **Bundled font (`Noto Sans JP`)**: Uses opentype.js for accurate glyph-level measurement. This is the default when no `fontFamily` is specified.
2. **Non-bundled fonts** (e.g., `Arial`, `Meiryo`): Automatically falls back to heuristic estimation (CJK characters = 1em, alphanumeric = 0.5em). This ensures layout does not use mismatched font metrics.
3. **`textMeasurement: "fallback"`**: Forces heuristic estimation regardless of font family.

### Why this matters

Previously, layout measurement always used Noto Sans JP metrics even when a different `fontFamily` was specified for rendering. This caused layout misalignment because the measured widths did not match the rendered widths. Now, when a non-bundled font is specified, pom uses a font-independent heuristic instead, reducing the mismatch.

### Supported nodes

Font resolution applies consistently to all text-bearing nodes: `Text`, `Ul`, `Ol`, and `Shape`.

## Recommended Settings

- **All environments**: Default (`"auto"`) works fine - bundled fonts ensure consistent results
- **Reduced bundle size**: Use `"fallback"` if you want to avoid loading bundled fonts (less accurate but smaller bundle)
- **Custom fonts**: When using `fontFamily` other than `Noto Sans JP`, pom automatically uses fallback measurement to avoid metric mismatch
