import eslintConfigPrettier from "eslint-config-prettier";
import * as typescriptPlugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typescriptConfig = {
  parser: parser,
  parserOptions: {
    project: "./tsconfig.json", 
    tsconfigRootDir: __dirname, 
  },

  plugins: {
    "@typescript-eslint": typescriptPlugin,
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
  },
};

export default [
  typescriptConfig,
  eslintConfigPrettier, 
];
