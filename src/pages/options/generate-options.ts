import type { Tags, BaseElement } from "../../utils/base-element";
import type { ParsedOptions } from "../../types/index";
import { counter } from "../../utils/counter";
import { Option } from "../../components/option/option";

export function generateOptions(
  parent: BaseElement<Tags>,
  optionsArray?: ParsedOptions[],
): void {
  if (optionsArray) {
    for (const [title, weight] of optionsArray) {
      const option = addOptionToParent(parent);
      option.titleInput.setValue(title);
      option.weightInput.setValue(String(weight));
    }
  } else {
    addOptionToParent(parent);
  }
}

function addOptionToParent(parent: BaseElement<Tags>): Option {
  const option = new Option(counter.next());
  parent.appendChildren(option);
  return option;
}
