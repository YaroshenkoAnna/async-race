import type { OptionData } from "../../types/index";

export function guard(options: OptionData[] | []): boolean {
  const NumberOfValidOptions = options.filter(
    (option) => option.title !== "" && option.weight !== 0,
  ).length;
  return NumberOfValidOptions > 1;
}
