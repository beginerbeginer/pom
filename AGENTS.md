# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

pom (PowerPoint Object Model) is a library for declaratively describing PowerPoint presentations in TypeScript. It calculates Flexbox-style layouts with yoga-layout and generates PPTX files with pptxgenjs.

## Commands

```bash
npm run build             # TypeScript compilation
npm run lint              # ESLint
npm run fmt               # Prettier formatting
npm run fmt:check         # Format check
npm run typecheck         # Type checking
npm run knip              # Detect unused code
npm run test:run          # Run tests
npm run test              # Tests (watch mode)
npm run test:ui           # Tests (UI mode)
npx tsx main.ts           # Run sample (generates sample.pptx)
npm run vrt                     # Run VRT (local)
npm run vrt:update              # Update VRT baseline (local)
npm run vrt:docker              # Run VRT (Docker environment)
npm run vrt:docker:update       # Update VRT baseline (Docker environment)
npm run preview                 # Preview (local)
npm run preview:docker          # Preview (convert main.ts PPTX to PNG, Docker)
npm run docs:images             # Generate documentation node images (local)
npm run docs:images:docker        # Generate documentation node images (Docker environment)
npm run docs:images:docker:update # Rebuild & generate documentation node images
npm run docs:images:vrt           # Check documentation images (local)
npm run docs:images:vrt:docker    # Check documentation images (Docker)
```

## Directory Structure

```
src/
├── index.ts              # Public API
├── types.ts              # Type definitions
├── buildPptx.ts          # Main processing (XML → parseXml → layout → PPTX)
├── buildContext.ts        # Build context (caches, measurement mode)
├── autoFit/              # Slide overflow auto-fit engine
│   ├── autoFit.ts        # Auto-fit logic
│   └── strategies/       # Adjustment strategies (font size, gap, table row height, uniform scale)
├── registry/             # Node registry system
│   ├── nodeRegistry.ts   # Node definition registration & management
│   ├── types.ts          # Registry types
│   └── definitions/      # Node type definitions (text, list, image, table, shape, chart, icon, etc.)
├── icons/                # Icon feature
│   ├── renderIcon.ts     # SVG icon rasterization
│   └── iconData.ts       # Icon preset library data
├── shared/               # Shared code used across multiple pipeline stages
│   ├── measureImage.ts   # Image size measurement & caching
│   ├── tableUtils.ts     # Table size calculation utilities
│   ├── freeYogaTree.ts   # Yoga node tree cleanup
│   ├── processArrowConstants.ts # ProcessArrow constants
│   └── walkTree.ts       # Tree traversal utility
├── parseXml/             # XML input parser (fast-xml-parser, internal)
│   ├── parseXml.ts       # XML parser core
│   └── inputSchema.ts    # Input schema (Zod, internal)
├── calcYogaLayout/       # Layout calculation (yoga-layout)
├── toPositioned/         # Absolute coordinate conversion
└── renderPptx/           # PPTX rendering (pptxgenjs)

vrt/                      # Visual Regression Test
preview/                  # Preview infrastructure (for Claude Code)

docs/                             # Documentation (Single Source of Truth, symlinked from website/content)
├── nodes.md                    # Nodes (with images)
├── index.mdx                   # Introduction page
├── master-slide.md             # Master slide documentation
├── text-measurement.md         # Text measurement documentation
└── images/                     # Sample images per node type (auto-generated)

scripts/docs-images/              # Documentation image generation scripts
├── generateNodeImages.ts       # Main execution script
├── config.ts                   # Node type list & output settings
└── sampleNodes.ts              # Sample XML for each node
```

## Architecture

PPTX generation follows a 3-stage pipeline:

1. **calcYogaLayout** (`src/calcYogaLayout/`) - Traverses the POMNode tree and calculates layout with yoga-layout. Sets `yogaNode` on each node
2. **toPositioned** (`src/toPositioned/`) - Generates a PositionedNode tree with absolute coordinates from the calculated layout
3. **renderPptx** (`src/renderPptx/`) - Converts PositionedNodes to pptxgenjs API calls for slide rendering

Additionally, **autoFit** (`src/autoFit/`) adjusts slides when content overflows vertically, applying strategies such as font size reduction, gap reduction, table row height reduction, and uniform scaling.

### Public API

- `buildPptx(xml: string, slideSize, options?)` - Main function that takes an XML string and generates PPTX
- `ParseXmlError` - Error class thrown on XML parse failure
- `TextMeasurementMode` - Text measurement mode (`"opentype"` | `"fallback"` | `"auto"`)
- `SlideMasterOptions` - Slide master settings (title, background, margin, objects, slideNumber)

### Key Internal Types

- `POMNode` - Input node type (internal. Text, Ul, Ol, Image, Table, Shape, Chart, Timeline, Matrix, Tree, Flow, ProcessArrow, Pyramid, Line, Layer, Box, VStack, HStack, Icon)
- `PositionedNode` - Node with position info (has x, y, w, h)
- `parseXml` - Internal function that converts XML strings to POMNode arrays (tag names are PascalCase, attribute values are type-converted via Zod schema, unknown tags produce errors)

### Unit Conversion

- User input: pixels (px)
- Internal layout: pixels (yoga-layout)
- PPTX output: inches (converted via `pxToIn`, 96 DPI basis)

### Text Measurement

Text width measurement uses `opentype.js`. The Noto Sans JP font is bundled with the library and works in both Node.js and browser environments.

- `src/calcYogaLayout/measureText.ts` - Text measurement logic
- `src/calcYogaLayout/fontLoader.ts` - Font loading (opentype.js)
- `src/calcYogaLayout/fonts/` - Bundled fonts (Base64)
- The `textMeasurement` option in `buildPptx` allows explicit specification of the measurement method
  - `"opentype"`: Always measure with opentype.js (default)
  - `"fallback"`: Always use fallback calculation (CJK characters = 1em, alphanumeric = 0.5em)
  - `"auto"`: Measure with opentype.js (default)

## Feature Addition Checklist

When adding new properties or features, update the following files:

1. **Type definitions**: `src/types.ts` - Add new types or properties
2. **Input schema**: `src/parseXml/inputSchema.ts` - Add Zod schema (for internal validation)
3. **XML parser**: `src/parseXml/parseXml.ts` - Add XML tag/attribute conversion logic
4. **Node registry**: `src/registry/definitions/` - Add node definition to the registry
5. **Rendering**: Under `src/renderPptx/` - Implement pptxgenjs conversion
6. **VRT test data**: `vrt/lib/generatePptx.ts` - Add test cases for the new feature
7. **Update VRT baseline**: Run `npm run vrt:docker:update`
8. **Documentation updates**:
   - `README.md` - User-facing documentation
   - `docs/nodes.md` - Nodes
   - `website/public/llm.txt` - XML reference for LLMs (for prompts)
   - `CLAUDE.md` - Add to Key Internal Types section
9. **Documentation image updates** (when adding new node types):
   - Add to `NODE_TYPES` in `scripts/docs-images/config.ts`
   - Define sample XML in `scripts/docs-images/sampleNodes.ts`
   - Run `npm run docs:images:docker:update`
10. **Add changeset**: Run `npx changeset add` before creating a PR

## Preview Workflow (for Claude Code)

When modifying main.ts to verify PPTX output, follow these steps:

1. Edit main.ts (and modify logic under src/ as needed)
2. Run `npm run preview:docker` to generate PNG
3. Visually verify `preview/output/sample.png` using the Read tool
4. If there are layout issues, fix and return to step 2
5. If everything looks good, commit

### Output Files

- `preview/output/sample.pptx` - Generated PPTX
- `preview/output/sample.png` - PNG image (for layout verification)

## Language Rules

- Documentation and UI text: English
- Source code comments: Japanese is acceptable
