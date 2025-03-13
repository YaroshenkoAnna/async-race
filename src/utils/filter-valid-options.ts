import type { ParsedOptions } from "../types/index";

export function filterValidOptions(array: string[]): ParsedOptions[] | [] {
  const optionsInputArray = array.map((string) => {
    const lastIndex = string.lastIndexOf(",");
    if (lastIndex === -1) return [string];
    return [string.slice(0, lastIndex), string.slice(lastIndex + 1)];
  });
  const arrayWithTwoValues = optionsInputArray.filter((item) =>
    isTupleOfTwoStrings(item),
  );
  return arrayWithTwoValues
    .map(
      ([title, weight]): ParsedOptions => [title.trim(), Number(weight.trim())],
    )
    .filter(([title, weight]) => {
      if (typeof weight === "number" && !Number.isNaN(weight) && weight > 0)
        return title && weight % 1 === 0;
      return false;
    });
}

function isTupleOfTwoStrings(array: string[]): array is [string, string] {
  return array.length === 2;
}
