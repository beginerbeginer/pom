import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["playground/**/*.test.{ts,tsx}"],
    coverage: {
      include: ["playground/**/*.{ts,tsx}"],
      reporter: ["text", "html", "json", "json-summary"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
