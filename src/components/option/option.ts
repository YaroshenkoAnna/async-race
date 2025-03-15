import styles from "./option.module.scss";
import { BaseElement } from "../../utils/base-element";
import { Input } from "../input/input";
import { Button } from "../button/button";
import { optionStore } from "../../store/option-store";
import type { OptionData } from "../../types";

export class Option extends BaseElement<"li"> {
  constructor(optionData: OptionData) {
    super({
      tag: "li",
      classNames: [styles.option],
    });
    this.render(optionData);
  }

  private render(optionData: OptionData): void {
    const id = new BaseElement<"span">({
      tag: "span",
      classNames: [styles.id],
      text: optionData.id.toString(),
    });

    const titleInput = new Input({
      type: "text",
      name: "title",
      attributes: { placeholder: "Title" },
      id: optionData.id.toString(),
    });
    titleInput.setValue(optionData.title);

    const weightInput = new Input({
      type: "number",
      name: "weight",
      attributes: { placeholder: "Weight", min: "0" },
    });
    weightInput.setValue(optionData.weight.toString());

    const deleteButton = new Button({
      text: "Delete",
      callback: (): void => {
        this.deleteElement();
        optionStore.removeOption(optionData.id);
      },
    });

    this.appendChildren(id, titleInput, weightInput, deleteButton);
  }
}
