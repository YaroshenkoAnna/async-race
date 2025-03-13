import styles from "./modal.module.scss";
import { BaseElement } from "../../utils/base-element";

export class Modal extends BaseElement<"dialog"> {
  constructor() {
    super({ tag: "dialog", classNames: [styles.modal] });
  }

  public open(): void {
    document.body.append(this.node);
    this.node.showModal();
    console.log("Modal opened");
  }

  public close(): void {
    this.node.close();
    this.deleteElement();
    console.log("Modal closed");
  }

  public render(): BaseElement<"div"> {
    const container = new BaseElement<"div">({
      tag: "div",
      classNames: [styles.container],
    });
    this.appendChildren(container);
    return container;
  }
}
