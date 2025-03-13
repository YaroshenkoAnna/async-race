import styles from "./option.scss";
import { BaseElement } from "../../utils/base-element";
import { Input } from "../input/input";
import { Button } from "../button/button";

export class Option extends BaseElement<"li"> {
  constructor(idNumber: number) {
    super({
      tag: "li",
      classNames: [styles.option],
    });

    this.render(idNumber);
  }

  private render(id: number): void {
    const textInput = new Input({
      type: "text",
      name: "title",
      attributes: { placeholder: "Title" },
      idNumber: id,
    });

    const label = textInput.createLabel();

    const numberInput = new Input({
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

    if (label) this.appendChildren([label]);
    this.appendChildren([textInput.node, numberInput.node, deleteButton.node]);
  }
}
