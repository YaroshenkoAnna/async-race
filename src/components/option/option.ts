import styles from "./option.module.scss";
import { BaseElement } from "../../utils/base-element";
import { Input } from "../input/input";
import { Button } from "../button/button";
import { optionStore } from "../../store/option-store";
import type { OptionData } from "../../types";

export class Option extends BaseElement<"li"> {
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private lastValue: string | number = "";
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

    const handleInputChange = (field: keyof Omit<OptionData, "id">) => {
      return (newValue: string | number): void => {
        if (newValue === this.lastValue) {
          return;
        }

        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => {
          optionStore.updateOption(optionData.id, { [field]: newValue });
          this.lastValue = newValue;
        }, 200);
      };
    };

    titleInput.addListener("input", () => {
      const newTitle = titleInput.getValue();
      if (optionData.title !== newTitle) {
        handleInputChange("title")(newTitle);
      }
    });

    const weightInput = new Input({
      type: "number",
      name: "weight",
      attributes: { placeholder: "Weight", min: "0" },
    });
    if (optionData.weight !== undefined) {
      weightInput.setValue(optionData.weight.toString());
    }

    weightInput.addListener("input", () => {
      const newWeight = Number(weightInput.getValue());
      if (optionData.weight !== newWeight) {
        handleInputChange("weight")(newWeight);
      }
    });

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
