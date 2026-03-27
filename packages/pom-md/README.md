# @hirokisakabe/pom-md

Markdown wrapper for [pom](https://github.com/hirokisakabe/pom) — write slides in Markdown with `pomxml` code fences for complex diagrams.

## Install

```bash
npm install @hirokisakabe/pom-md @hirokisakabe/pom
```

## Usage

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

---

## Process

```pomxml
<Flow>
  <Step>Plan</Step>
  <Step>Develop</Step>
  <Step>Release</Step>
</Flow>
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

## Markdown Syntax

### Slide Separator

Use `---` (horizontal rule) to separate slides.

### Frontmatter

Specify slide size in the frontmatter block:

```markdown
---
size: 16:9
---
```

Supported sizes:

- `16:9` — 1280×720 (default)
- `4:3` — 1024×768

### Markdown → pom XML Mapping

| Markdown           | pom Node                                   |
| ------------------ | ------------------------------------------ |
| `# Heading`        | `<Text fontSize="28" bold="true">`         |
| `## Heading`       | `<Text fontSize="24" bold="true">`         |
| `### Heading`      | `<Text fontSize="20" bold="true">`         |
| Paragraph text     | `<Text>`                                   |
| `- List item`      | `<Ul><Li>`                                 |
| `1. Numbered item` | `<Ol><Li>`                                 |
| `**bold**`         | `<B>bold</B>` (inside Text/Li/TableCell)   |
| `*italic*`         | `<I>italic</I>` (inside Text/Li/TableCell) |
| `![](img.png)`     | `<Image src="img.png">`                    |
| Table syntax       | `<Table>`                                  |
| ` ```pomxml `      | XML passthrough                            |

### `pomxml` Code Fence

For complex diagrams that Markdown cannot express, embed pom XML directly:

````markdown
```pomxml
<Chart type="bar" labels="Q1,Q2,Q3,Q4" values="100,80,120,150" />
```
````

The content inside `pomxml` fences is passed through to the output as-is.

## API

### `parseMd(markdown: string): string`

Converts a Markdown string into a pom XML string. The returned XML can be passed directly to `buildPptx()` from `@hirokisakabe/pom`.

## License

MIT
