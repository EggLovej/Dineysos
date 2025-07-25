import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  {
    ignores: ["node_modules", ".next", "dist", "public"],
  },

  // Base Next.js + TS config
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Additional rules
  {
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Import order
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // Prettier as ESLint rule (forces formatting)
      "prettier/prettier": "warn",

      // Quotes
      quotes: ["warn", "double", { avoidEscape: true }],

      // Consistent semicolons
      semi: ["warn", "always"],

      // Consistent spacing
      "object-curly-spacing": ["warn", "always"],

      // JSX props sort order (custom rule, optional)
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: "last",
          noSortAlphabetically: false,
          reservedFirst: ["key"],
        },
      ],
    },
  },
];
