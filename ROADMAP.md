# Roadmap

## Direction

pom core is stable — focus shifts to **developer experience tools** that make pom easy to adopt.

**Primary target**: engineers who want a "marp for PPTX" — write markup, get slides.

Prioritize **authoring formats** first. Execution tooling should support those workflows, not lead them.

## Priorities

| Priority | Item        | Description                                                                                     |
| -------- | ----------- | ----------------------------------------------------------------------------------------------- |
| **P1**   | Monorepo    | Consolidate ecosystem packages under `packages/` for unified releases and type sharing          |
| **P2**   | pom-md      | Markdown wrapper with `pomxml` code fences — write slides fast                                  |
| **P3**   | pom-jsx     | JSX/TSX authoring — type-safe, programmable, template-friendly                                  |
| **P4**   | pom-cli     | Shared execution layer for `pom-md` / `pom-jsx` and CI use cases; keep standalone scope minimal |
| **P5**   | pom-glimpse | Direct PNG/SVG renderer from pom XML (bypass PPTX). Revisit if pptx-glimpse path is too slow    |

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

### Archive candidates

| Repository         | Reason                                              |
| ------------------ | --------------------------------------------------- |
| **pptx-ai-studio** | Development stopped. Superseded by prompt2pptx      |
| **pptx-ai-editor** | Development stopped. Python-based, unrelated to pom |
| **pptx-forge**     | Python version of pom — no longer needed            |
| **pptx-ai**        | Nearly empty (first commit only)                    |

### Already archived

- **pom-playground** — replaced by pom-ai
- **pptxify** — archived
