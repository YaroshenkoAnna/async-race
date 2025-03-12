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
      classNames: [styles.button],
    });
    this.setText(options.text);
    this.addClasses([styles.button]);
    this.addListener("click", options.callback);
  }
}
