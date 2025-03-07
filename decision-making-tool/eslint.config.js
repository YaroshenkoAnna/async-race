import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import parser from "@typescript-eslint/parser";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";
import { dirname } from "path";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const __filename = String(fileURLToPath(import.meta.url));

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const __dirname = String(dirname(__filename));

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked, // Включаем правила с типовой проверкой
  {
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: "./tsconfig.json", // Указываем путь к tsconfig.json
        tsconfigRootDir: __dirname,
        projectService: true, // Разрешаем TypeScript анализировать файлы проекта
        allowDefaultProject: true,
      },
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
  },
  eslintConfigPrettier, // Подключаем Prettier как последнюю настройку
);
