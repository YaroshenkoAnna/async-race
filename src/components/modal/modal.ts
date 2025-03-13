import styles from "./modal.module.scss";
import { BaseElement } from "../../utils/base-element";

export class Modal extends BaseElement<"dialog"> {
  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    super({ tag: "dialog", classNames: [styles.modal] });
    this.parent = parent;
  }

  public open(): void {
    this.parent.append(this.node);
    this.node.showModal();
  }

  public close(): void {
    this.node.close();
    this.deleteElement();
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
