import styles from "./modal.module.scss";
import { BaseElement } from "../../utils/base-element";
import { Modal } from "./modal";
import { Button } from "../button/button";

export class ValidationErrorModal extends Modal {
  constructor(parent: HTMLElement) {
    super(parent);
    this.renderContent();
  }

  private renderContent(): void {
    const p1 = new BaseElement({
      tag: "p",
      text: "Please add at least 2 valid options.",
      classNames: [styles.warning],
    });

    const p2 = new BaseElement({
      tag: "p",
      text: "An option is considered valid if its title is not empty and its weight is greater than 0",
      classNames: [styles.warning],
    });

    const button = new Button({
      classNames: [styles.button],
      text: "Close",
      callback: (): void => {
        this.node.close();
      },
    });

    const container = this.render();
    container.appendChildren(p1, p2, button);
  }
}
