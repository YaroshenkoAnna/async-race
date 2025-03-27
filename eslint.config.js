import eslint from "@eslint/js";
import globals from "globals";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import parser from "@typescript-eslint/parser";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  eslintPluginUnicorn.configs.recommended,

  {
    ignores: ["./node_modules", "./dist", "./vite.config.ts"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: "readonly",
      },
      parser: parser,
      parserOptions: {
        project: "./tsconfig.json",
        projectService: true,
        allowDefaultProject: true,
      },
    },

    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
    rules: {
      "@typescript-eslint/consistent-type-assertions": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/member-ordering": "error",
      "unicorn/better-regex": "warn",
    },
  },
  eslintConfigPrettier,
);
