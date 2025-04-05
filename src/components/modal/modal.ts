import { BaseElement } from "../../utils/base-element";
import styles from "./modal.module.scss";

export class Modal extends BaseElement<"div"> {
  constructor(name: string, time: number) {
    super({ tag: "div" });
    this.addClasses([styles.modal]);
    this.setText(`${name} is the winner! Time: ${time.toFixed(2)}s`);
    globalThis.addEventListener("click", (event) => {
      if (event.target !== this.node) {
        this.deleteElement();
      }
    });
  }
}
