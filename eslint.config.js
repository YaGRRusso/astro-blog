import js from "@eslint/js"
import eslintPluginAstro from "eslint-plugin-astro"
import importPlugin from "eslint-plugin-import"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import unusedImports from "eslint-plugin-unused-imports"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended, ...eslintPluginAstro.configs.recommended],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    import: importPlugin,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    "unused-imports": unusedImports,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": ["warn", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
    "import/order": [
      "warn",
      {
        groups: ["index", "sibling", "parent", "internal", "external", "builtin", "object", "type"],
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "always",
      },
    ],
  },
})
