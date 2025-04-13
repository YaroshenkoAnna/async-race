import eslint from "@eslint/js";
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
      parser,
    },

    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
    rules: {
      "@typescript-eslint/consistent-type-assertions": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/member-ordering": "error",
      "unicorn/better-regex": "warn",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-event-target": "off",
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            acc: true,
            env: true,
            i: true,
            j: true,
            props: true,
            Props: true,
          },
        },
      ],
    },
  },
  eslintConfigPrettier,
);
