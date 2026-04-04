<h1 align="center">pom-vscode</h1>
<p align="center">
  VS Code extension for live preview of pom-md / pom XML presentations.
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=hirokisakabe.pom-vscode"><img src="https://img.shields.io/visual-studio-marketplace/v/hirokisakabe.pom-vscode.svg" alt="VS Marketplace version"></a>
  <a href="https://github.com/hirokisakabe/pom/blob/main/LICENSE"><img src="https://img.shields.io/github/license/hirokisakabe/pom.svg" alt="License"></a>
</p>

---

## Overview

**pom-vscode** is a VS Code extension that provides live preview for `.pom.md` and `.pom.xml` files. It converts content to SVG via [pptx-glimpse](https://github.com/nicokoenig/pptx-glimpse) and displays it in a webview panel.

Pipeline:

- `.pom.md → parseMd() → buildPptx() → pptx-glimpse (convertPptxToSvg) → Webview`
- `.pom.xml → buildPptx() → pptx-glimpse (convertPptxToSvg) → Webview`

## Features

- **Live Preview** — Real-time slide preview as you edit `.pom.md` or `.pom.xml` files.
- **Editor Integration** — Preview button appears in the editor title bar for `.pom.md` / `.pom.xml` files.
- **PPTX Export** — Export to PPTX via `pom: Export PPTX` command.
- **Command Palette** — Open preview via `pom: Open Preview` command.

## Getting Started

> Requires VS Code 1.85+

### Install from Marketplace

Search for **pom** in the VS Code Extensions view, or install from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=hirokisakabe.pom-vscode).

### Usage

1. Open a `.pom.md` or `.pom.xml` file in VS Code
2. Click the preview icon in the editor title bar, or run `pom: Open Preview` from the Command Palette

## License

MIT
