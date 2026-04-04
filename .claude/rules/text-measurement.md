---
paths:
  - packages/pom/src/calcYogaLayout/**
---

## Text Measurement

Text width measurement uses `opentype.js`. The Noto Sans JP font is bundled with the library and works in both Node.js and browser environments.

- `packages/pom/src/calcYogaLayout/measureText.ts` - Text measurement logic
- `packages/pom/src/calcYogaLayout/fontLoader.ts` - Font loading (opentype.js)
- `packages/pom/src/calcYogaLayout/fonts/` - Bundled fonts (Base64)
- The `textMeasurement` option in `buildPptx` allows explicit specification of the measurement method
  - `"opentype"`: Always measure with opentype.js (default)
  - `"fallback"`: Always use fallback calculation (CJK characters = 1em, alphanumeric = 0.5em)
  - `"auto"`: Measure with opentype.js (default)

## Unit Conversion

- User input: pixels (px)
- Internal layout: pixels (yoga-layout)
- PPTX output: inches (converted via `pxToIn`, 96 DPI basis)
