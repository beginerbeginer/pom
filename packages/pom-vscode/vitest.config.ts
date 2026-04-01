import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    exclude: ["src/test/**", "dist/test/**", "node_modules/**"],
    coverage: {
      include: ["src/**/*.ts"],
      reporter: ["text", "html", "json", "json-summary"],
    },
  },
});
