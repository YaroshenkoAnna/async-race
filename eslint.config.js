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
    ignores: [
      "./node_modules",
      "./dist",
      "./declarations.d.ts",
      "./vite.config.ts",
    ],
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
      noInlineConfig: true,
      reportUnusedDisableDirectives: "warn",
    },
    rules: {
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { accessibility: "explicit", overrides: { constructors: "off" } },
      ],
      "@typescript-eslint/member-ordering": "error",
      "class-methods-use-this": "error",
      "unicorn/better-regex": "warn",
      "unicorn/prefer-event-target": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/prefer-dom-node-remove": "off",
      "unicorn/no-null": "off",
      "max-lines-per-function": "off",
    },
  },
  eslintConfigPrettier,
);
