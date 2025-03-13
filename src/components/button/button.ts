import styles from "./button.module.scss";
import { BaseElement } from "../../utils/base-element";
import type { BaseElementOptions } from "../../utils/base-element";

type ButtonOptions = {
  callback: () => void;
};

export class Button extends BaseElement<"button"> {
  constructor(options: BaseElementOptions & ButtonOptions) {
    super({
      tag: "button",
      classNames: [styles.button, ...(options.classNames ?? [])],
    });
    this.setText(options.text);
    this.addListener("click", options.callback);
  }
}
