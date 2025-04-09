import { BaseElement } from "../../utils/base-element";
import { Button } from "../button/button";
import { Input } from "../input/input";
import styles from "./form.module.scss";

type FormOptions = {
  buttonText: string;
  callback: (name: string, color: string) => Promise<void>;
};

export class Form extends BaseElement<"form"> {
  public textInput: Input;
  public colorInput: Input;
  private options: FormOptions;

  constructor(options: FormOptions) {
    super({ tag: "form", classNames: [styles.form] });
    this.options = options;
    this.textInput = new Input({ type: "text" });
    this.colorInput = new Input({ type: "color" });
    this.render();
  }

  public disable(): void {
    this.children.forEach((child) => {
      if (child instanceof Button || child instanceof Input) child.disable();
    });
  }

  public enable(): void {
    this.children.forEach((child) => {
      if (child instanceof Button || child instanceof Input) child.enable();
    });
  }

  public clear(): void {
    this.textInput.value = "";
    this.colorInput.value = "#000000";
  }

  private render() {
    const button = new Button({
      text: this.options.buttonText,
      classNames: [styles.button],
      callback: (event: Event) => {
        event.preventDefault();
        this.options
          .callback(this.textInput.value, this.colorInput.value)
          .catch((error) => {
            console.error("Error in callback:", error);
          });
      },
    });

    this.appendChildren(this.textInput, this.colorInput, button);
  }
}
