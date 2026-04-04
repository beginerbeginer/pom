---
paths:
  - packages/pom-md/**
---

## pom-md (`packages/pom-md/`)

Markdown → pom XML converter. Converts Markdown with `pomxml` code fences into pom XML strings.

```bash
pnpm --filter @hirokisakabe/pom-md run build       # TypeScript compilation
pnpm --filter @hirokisakabe/pom-md run lint         # ESLint
pnpm --filter @hirokisakabe/pom-md run fmt          # Prettier formatting
pnpm --filter @hirokisakabe/pom-md run fmt:check    # Format check
pnpm --filter @hirokisakabe/pom-md run typecheck    # Type checking
pnpm --filter @hirokisakabe/pom-md run knip         # Detect unused code
pnpm --filter @hirokisakabe/pom-md run test:run     # Run tests
```

Pipeline: `Markdown → parseMd() → pom XML string → buildPptx() (core)`
