---
paths:
  - packages/pom/main.ts
---

## Preview Workflow (for Claude Code)

When modifying main.ts to verify PPTX output, follow these steps:

1. Edit `packages/pom/main.ts` (and modify logic under `packages/pom/src/` as needed)
2. Run `pnpm run preview:docker` from `packages/pom/`
3. Visually verify `packages/pom/preview/output/sample.png` using the Read tool
4. If there are layout issues, fix and return to step 2
5. If everything looks good, commit

### Output Files

- `packages/pom/preview/output/sample.pptx` - Generated PPTX
- `packages/pom/preview/output/sample.png` - PNG image (for layout verification)
