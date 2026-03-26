<h1 align="center">pom-docs</h1>
<p align="center">
  Documentation website for pom — <a href="https://pom.pptx.app">pom.pptx.app</a>
</p>

---

## Overview

**pom-docs** is the documentation website for the [pom](../../packages/pom/) library. Built with [Next.js](https://nextjs.org/) and [Nextra](https://nextra.site/), it includes API documentation, guides, and an interactive playground.

## Features

- **Documentation** — API reference, node documentation, and guides powered by Nextra.
- **Playground** — Interactive editor to try pom XML in the browser with live PPTX preview.
- **Content Symlink** — Documentation source lives in `packages/pom/docs/` and is symlinked to `content/`.

## Development

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) 10+

### Setup

```bash
# From the repository root
pnpm install
```

### Commands

```bash
pnpm --filter pom-docs run dev          # Start dev server (Turbopack)
pnpm --filter pom-docs run build        # Production build
pnpm --filter pom-docs run start        # Start production server
pnpm --filter pom-docs run lint         # ESLint
pnpm --filter pom-docs run fmt:check    # Format check
pnpm --filter pom-docs run typecheck    # Type checking
pnpm --filter pom-docs run test:run     # Run tests
```

## License

MIT
