import type { ParsedOptions } from "../../types/index";
import { optionStore } from "../../store/option-store";

export function generateOptions(optionsArray: ParsedOptions[] = []): void {
  for (const [title, weight] of optionsArray) {
    optionStore.addOption({ title, weight });
  }
  console.log(optionsArray);
}
