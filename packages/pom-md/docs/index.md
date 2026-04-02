# pom-md

Markdown wrapper for [pom](/) — write slides in Markdown with `pomxml` code fences for complex diagrams.

## Install

```bash
npm install @hirokisakabe/pom-md @hirokisakabe/pom
```

## Quick Start

Create a `.pom.md` file:

````markdown
---
size: 16:9
---

# Sales Report

- Q1 was strong
- Q2 had challenges

---

## Detailed Data

```pomxml
<Chart type="bar" labels="Q1,Q2,Q3,Q4" values="100,80,120,150" />
```
````

Then convert it to PPTX:

```ts
import { readFileSync } from "node:fs";
import { parseMd } from "@hirokisakabe/pom-md";
import { buildPptx } from "@hirokisakabe/pom";

const markdown = readFileSync("slides.pom.md", "utf-8");
const xml = parseMd(markdown);
const { pptx } = await buildPptx(xml, { w: 1280, h: 720 });
await pptx.writeFile({ fileName: "output.pptx" });
```

## API

### `parseMd(markdown: string): string`

Converts a Markdown string into a pom XML string. The returned XML can be passed directly to `buildPptx()` from `@hirokisakabe/pom`.
