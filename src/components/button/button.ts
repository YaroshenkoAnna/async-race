import styles from "./button.module.scss";
import { BaseElement } from "../../utils/base-element";
import type { BaseElementOptions } from "../../utils/base-element";

export type ButtonOptions = {
  callback: (event: Event) => void;
};

export class Button extends BaseElement<"button"> {
  constructor(options: BaseElementOptions & ButtonOptions) {
    super({
      tag: "button",
      classNames: [...(options.classNames ?? []), styles.button],
      text: options.text,
    });
    this.addListener("click", options.callback);
  }

  public disable(): void {
    this.setAttributes({ disabled: "true" });
  }

  public enable(): void {
    this.removeAttribute("disabled");
  }

  public setDisabled(state: boolean): void {
    if (state) {
      this.disable();
    } else {
      this.enable();
    }
  }
}
