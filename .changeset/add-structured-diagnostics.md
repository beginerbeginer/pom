---
"@hirokisakabe/pom": minor
---

Add structured diagnostics for warnings and fallbacks. `buildPptx()` now returns `{ pptx, diagnostics }` instead of just the pptx instance. A new `strict` option throws `DiagnosticsError` when diagnostics are collected.
