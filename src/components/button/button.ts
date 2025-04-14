import { BaseElement } from "../../utils/base-element";
import { BaseElementOptions } from "../../utils/base-element";

export interface ButtonOptions extends BaseElementOptions {
  callback: (event: Event) => void;
}

export class Button extends BaseElement<"button"> {
  constructor(options: ButtonOptions) {
    super({
      tag: "button",
      //   classNames: [...(options.classNames ?? []), styles.button],
      text: options.text,
      classNames: options.classNames,
      attributes: options.attributes,
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
