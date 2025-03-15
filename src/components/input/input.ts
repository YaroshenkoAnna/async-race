import styles from "./input.module.scss";
import { BaseElement } from "../../utils/base-element";
import type { BaseElementOptions } from "../../utils/base-element";

type InputOptions = {
  type: string;
  name: string;
  id?: string;
};

export class Input extends BaseElement<"input"> {
  constructor(options: InputOptions & BaseElementOptions) {
    super({
      tag: "input",
      classNames: [styles.input],
    });
    this.setType(options.type);
    this.setName(options.name);
    this.setAttributes(options.attributes);
    if (options.id) {
      this.setAttributes({ id: options.id });
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
}
