import styles from "./modal.module.scss";
import { BaseElement } from "../../utils/base-element";

export class Modal extends BaseElement<"dialog"> {
  public blockScroll: () => void;
  public unblockScroll: () => void;
  constructor() {
    super({ tag: "dialog", classNames: [styles.modal] });
    this.blockScroll = (): void => {
      document.body.classList.add("no-scroll");
    };
    this.unblockScroll = (): void => {
      document.body.classList.remove("no-scroll");
    };
    this.addListener("click", (event) => {
      if (event.target === this.node) {
        this.close();
      }
    });
    this.addListener("keydown", (event) => {
      if ((event as KeyboardEvent).key === "Escape") {
        this.close();
      }
    });
  }

  public open(): void {
    document.body.append(this.node);
    this.blockScroll();
    this.node.showModal();
  }

  public close(): void {
    this.node.close();
    this.unblockScroll();
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
