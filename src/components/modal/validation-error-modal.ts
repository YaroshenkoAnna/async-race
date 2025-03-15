import styles from "./modal.module.scss";
import { BaseElement } from "../../utils/base-element";
import { Modal } from "./modal";
import { Button } from "../button/button";
import { ERROR_MESSAGE } from "../../constants/texts";


export class ValidationErrorModal extends Modal {
  constructor() {
    super();
    this.renderContent();
  }

  private renderContent(): void {
    const p = new BaseElement({
      tag: "p",
      text: ERROR_MESSAGE,
      classNames: [styles.warning],
    });

    const button = new Button({
      classNames: [styles.button],
      text: "Close",
      callback: (): void => {

        this.close();
      },
    });

    const container = this.render();
    container.appendChildren(p, button);
  }
}
