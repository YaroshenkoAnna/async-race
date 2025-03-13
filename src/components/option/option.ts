import styles from "./option.module.scss";
import { BaseElement } from "../../utils/base-element";
import { Input } from "../input/input";
import { Button } from "../button/button";

export class Option extends BaseElement<"li"> {
  public titleInput: Input;
  public weightInput: Input;

  constructor(idNumber: number) {
    super({
      tag: "li",
      classNames: [styles.option],
    });

    const { titleInput, weightInput } = this.render(idNumber);
    this.titleInput = titleInput;
    this.weightInput = weightInput;
  }

  private render(id: number): { titleInput: Input; weightInput: Input } {
    const titleInput = new Input({
      type: "text",
      name: "title",
      attributes: { placeholder: "Title" },
      idNumber: id,
    });

    const label = titleInput.createLabel();

    const weightInput = new Input({
      type: "number",
      name: "weight",
      attributes: { placeholder: "Weight", min: "0" },
    });

    const deleteButton = new Button({
      text: "Delete",
      callback: (): void => {
        this.deleteElement();
      },
    });

    if (label) this.appendChildren(label);
    this.appendChildren(titleInput, weightInput, deleteButton);

    return { titleInput, weightInput };
  }
}
