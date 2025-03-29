import styles from "./button.module.scss";
import { BaseElement } from "../../utils/base-element";
import type { BaseElementOptions } from "../../utils/base-element";

export type ButtonOptions = {
  callback: () => void;
};

export class Button extends BaseElement<"button"> {
  constructor(options: BaseElementOptions & ButtonOptions) {
    super({
      tag: "button",
      classNames: [styles.button],
      text: options.text,
    });
    this.addListener("click", options.callback);
  }
}
