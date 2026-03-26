<h1 align="center">pom-vscode</h1>
<p align="center">
  VS Code extension for live preview of pom-md presentations.
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=hirokisakabe.pom-vscode"><img src="https://img.shields.io/visual-studio-marketplace/v/hirokisakabe.pom-vscode.svg" alt="VS Marketplace version"></a>
  <a href="https://github.com/hirokisakabe/pom/blob/main/LICENSE"><img src="https://img.shields.io/github/license/hirokisakabe/pom.svg" alt="License"></a>
</p>

---

## Overview

**pom-vscode** is a VS Code extension that provides live preview for `.pom.md` files. It converts pom-md content to SVG via [pptx-glimpse](https://github.com/nicokoenig/pptx-glimpse) and displays it in a webview panel.

Pipeline: `.pom.md → parseMd() → buildPptx() → pptx-glimpse (convertPptxToSvg) → Webview`

## Features

- **Live Preview** — Real-time slide preview as you edit `.pom.md` files.
- **Editor Integration** — Preview button appears in the editor title bar for `.pom.md` files.
- **Command Palette** — Open preview via `pom: Open Preview` command.

## Getting Started

> Requires VS Code 1.85+

### Install from Marketplace

Search for **pom** in the VS Code Extensions view, or install from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=hirokisakabe.pom-vscode).

### Usage

1. Open a `.pom.md` file in VS Code
2. Click the preview icon in the editor title bar, or run `pom: Open Preview` from the Command Palette

## Development

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/) 10+

### Setup

```bash
# From the repository root
pnpm install
```

### Commands

```bash
pnpm --filter pom-vscode run build       # esbuild bundle
pnpm --filter pom-vscode run watch       # esbuild watch mode
pnpm --filter pom-vscode run lint        # ESLint
pnpm --filter pom-vscode run fmt         # Prettier formatting
pnpm --filter pom-vscode run fmt:check   # Format check
pnpm --filter pom-vscode run typecheck   # Type checking
pnpm --filter pom-vscode run test:run   # Run unit tests
```

### Testing Locally

Open `packages/pom-vscode` in VS Code and press **F5** to launch the Extension Development Host.

## License

MIT
