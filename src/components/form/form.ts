import { BaseElement } from "../../utils/base-element";
import { Button } from "../button/button";
import { Input } from "../input/input";

type FormOptions = {
  buttonText: string;
  callback: () => void;
};

export class Form extends BaseElement<"form"> {
  private options: FormOptions;
  constructor(options: FormOptions) {
    super({ tag: "form" });
    this.options = options;
    this.render();
  }

  private render() {
    const textInput = new Input({ type: "text" });
    const colorInput = new Input({ type: "color" });
    const button = new Button({
      text: this.options.buttonText,
      callback: this.options.callback,
    });

    this.appendChildren(textInput, colorInput, button);
  }
}
