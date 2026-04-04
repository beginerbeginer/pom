# Markdown Syntax

pom-md converts standard Markdown into pom XML. This page describes the supported syntax and how each element maps to pom nodes.

## Slide Separator

Use `---` (horizontal rule) to separate slides. Each section between separators becomes a separate slide.

```markdown
# Slide 1

Content for slide 1

---

# Slide 2

Content for slide 2
```

## Frontmatter

Specify global settings in the frontmatter block at the top of the file:

```markdown
---
size: 16:9
backgroundColor: "#f0f0f0"
masterPptx: ./template.pptx
---
```

| Key               | Description                                                 |
| ----------------- | ----------------------------------------------------------- |
| `size`            | Slide size preset (see below)                               |
| `backgroundColor` | Default background color for all slides (applied to VStack) |
| `masterPptx`      | Path to an existing PPTX file to use as master template     |

Supported sizes:

| Value  | Resolution         |
| ------ | ------------------ |
| `16:9` | 1280×720 (default) |
| `4:3`  | 1024×768           |

If no frontmatter is provided, the default size is `16:9`.

## Comment Directive

Use HTML comments in Marp-style to set per-slide properties. Place them at the top of a slide section.

```markdown
<!-- backgroundColor: red -->

# This slide has a red background
```

| Directive         | Description                                                     |
| ----------------- | --------------------------------------------------------------- |
| `backgroundColor` | Background color for this slide (overrides frontmatter default) |

Comment directives override frontmatter defaults for the slide they appear in. Slides without a directive inherit the frontmatter default.

## Markdown to pom XML Mapping

| Markdown           | pom Node                                          |
| ------------------ | ------------------------------------------------- |
| `# Heading`        | `<Text fontSize="28" bold="true">`                |
| `## Heading`       | `<Text fontSize="24" bold="true">`                |
| `### Heading`      | `<Text fontSize="20" bold="true">`                |
| Paragraph text     | `<Text>`                                          |
| `- List item`      | `<Ul><Li>`                                        |
| `1. Numbered item` | `<Ol><Li>`                                        |
| `**bold**`         | `<B>bold</B>` (inside Text/Li/Td)                 |
| `*italic*`         | `<I>italic</I>` (inside Text/Li/Td)               |
| `![](img.png)`     | `<Image src="img.png">`                           |
| Table syntax       | `<Table>` (header: bold + background, cellBorder) |
| ` ```pomxml `      | XML passthrough                                   |

## Headings

Headings are converted to bold `<Text>` nodes with different font sizes:

```markdown
# Heading 1 → fontSize="28"

## Heading 2 → fontSize="24"

### Heading 3 → fontSize="20"
```

## Lists

Both unordered and ordered lists are supported:

```markdown
- Item A
- Item B
  - Nested item

1. First
2. Second
```

## Inline Formatting

Bold and italic formatting is preserved inside text, list items, and table cells:

```markdown
This is **bold** and _italic_ text.
```

## Images

Images are converted to `<Image>` nodes:

```markdown
![alt text](path/to/image.png)
```

## Tables

Markdown tables are converted to `<Table>` nodes. The header row (from `thead`) is automatically styled with `bold="true"` and `backgroundColor="F1F5F9"`, and all cells get a light border (`cellBorder`):

```markdown
| Name  | Value |
| ----- | ----- |
| Alpha | 100   |
| Beta  | 200   |
```
