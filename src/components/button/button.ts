import styles from "./button.module.scss";
import { BaseElement } from "../../utils/base-element";

type ButtonOptions = {
  text?: string;
  classes: string[];
  callback: () => void;
};

export class Button extends BaseElement<"button"> {
  constructor(options: ButtonOptions) {
    super({
      tag: "button",
      classNames: [styles.button],
    });
    this.setText(options.text);
    this.addClasses(options.classes);
    this.addListener("click", options.callback);
  }
}
