import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  // tsconfig keeps jsx: "preserve" for Next.js; Vite's oxc transformer must still
  // compile JSX for the tests.
  oxc: { jsx: { runtime: "automatic" } },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.{ts,tsx}"],
    setupFiles: ["tests/setup.ts"],
    // CSS modules are imported by a few helpers; map them to plain objects.
    css: { modules: { classNameStrategy: "non-scoped" } },
  },
});
