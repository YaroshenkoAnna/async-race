import styles from "./input.module.scss";
import { BaseElement } from "../../utils/base-element";
import type { BaseElementOptions } from "../../utils/base-element";

type InputOptions = {
  type: string;
  name: string;
  counter?: number;
};

export class Input extends BaseElement<"input"> {
  constructor(options: InputOptions & BaseElementOptions) {
    super({
      tag: "input",
      classNames: [styles.input],
    });
    this.setType(options.type);
    this.setName(options.name);
    if (options.counter) {
      this.setAttribute("id", `#${options.counter}`);
    }
  }

  public setType(type: string): void {
    this._element.setAttribute("type", type);
  }

  public getValue(): string {
    return this._element.value;
  }

  public setValue(value: string): void {
    this._element.value = value;
  }

  public getName(): string {
    return this._element.name;
  }

  public setName(name: string): void {
    this._element.setAttribute("name", name);
  }

  public createLabel(): HTMLElement | undefined {
    if (!this.getAttribute("id")) return;
    const id: string = this.getAttribute("id") || "";
    const label = new BaseElement<"label">({
      tag: "label",
      classNames: [styles.label],
      attributes: { for: id },
    });
    label.setText(id);
    return label.node;
  }
}
