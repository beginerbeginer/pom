---
paths:
  - .changeset/**
---

## Release Flow (Changesets)

`@hirokisakabe/pom`, `@hirokisakabe/pom-md`, and `pom-vscode` use [Changesets](https://github.com/changesets/changesets) for versioning. The unified workflow (`release.yml`) handles all packages.

1. Add a changeset: `pnpm exec changeset add`
2. Push to main → GitHub Actions creates a Release PR (version bump + CHANGELOG)
3. Merge the Release PR → `changeset publish` publishes pom/pom-md to npm, then detects pom-vscode version change → `vsce publish` to VS Code Marketplace + Git tag + GitHub Release
