# Roadmap

## Direction

pom core is stable — focus shifts to **developer experience tools** that make pom easy to adopt.

**Primary target**: engineers who want a "marp for PPTX" — write markup, get slides.

## Priorities

| Priority | Item               | Description                                                                                  |
| -------- | ------------------ | -------------------------------------------------------------------------------------------- |
| **P1**   | Monorepo (#431)    | Consolidate pom-cli and pom-glimpse into `packages/` for unified releases and type sharing   |
| **P2**   | pom-cli (#432)     | `pom build input.xml -o output.pptx` — casual entry point, CI-friendly                       |
| **P2**   | pom-md (#435)      | Markdown wrapper with `pomxml` code fences — write slides fast                               |
| **P3**   | pom-jsx (#435)     | JSX/TSX authoring — type-safe, programmable, template-friendly                               |
| **P4**   | pom-glimpse (#433) | Direct PNG/SVG renderer from pom XML (bypass PPTX). Revisit if pptx-glimpse path is too slow |

## Repositories

### Active

| Repository           | Role                        | Notes                                                 |
| -------------------- | --------------------------- | ----------------------------------------------------- |
| **pom**              | Core library                | Stable. Layout engine + PPTX generation               |
| **prompt2pptx**      | AI slide generation app     | Primary AI application — actively developed           |
| **pptx-glimpse**     | PPTX → SVG/PNG renderer     | Used for preview and VRT                              |
| **pom-vscode**       | VS Code extension           | Stays as a separate repo (VS Code-specific CI/CD)     |
| **pom-ai**           | AI chat playground          | Lightweight playground — no further feature expansion |
| **mcp-pptx-preview** | MCP server for PPTX preview | PPTX preview via MCP                                  |

### Archive candidates (#434)

| Repository         | Reason                                              |
| ------------------ | --------------------------------------------------- |
| **pptx-ai-studio** | Development stopped. Superseded by prompt2pptx      |
| **pptx-ai-editor** | Development stopped. Python-based, unrelated to pom |
| **pptx-forge**     | Python version of pom — no longer needed            |
| **pptx-ai**        | Nearly empty (first commit only)                    |

### Already archived

- **pom-playground** — replaced by pom-ai
- **pptxify** — archived
