import { BaseElement } from "../../utils/base-element";
import styles from "./contact.module.scss";

export enum Status {
  Online = "Online",
  Offline = "Offline",
}
enum StatusColor {
  Online = "green",
  Offline = "red",
}

export class Contact extends BaseElement<"li"> {
  constructor(login: string, status: Status) {
    super({
      tag: "li",
      classNames: [styles.contact],
    });
    this.render(login, status);
  }

  private render(login: string, status: Status): void {
    const loginElement = new BaseElement({
      tag: "label",
      classNames: [styles.login],
      text: login,
    });

    const container = new BaseElement({
      tag: "div",
      classNames: [styles.container],
    });

    const statusIndicator = new BaseElement({
      tag: "span",
      classNames: [styles.status],
      attributes: {
        style: `background-color: ${StatusColor[status]}`,
      },
    });
    const messageIndicator = new BaseElement({
      tag: "span",
      classNames: [styles.message],
      text: "1", //from server
    });
    this.appendChildren(container, messageIndicator);
    container.appendChildren(statusIndicator, loginElement);

    this.addListener("click", () => {}); //rendering dialogBody
  }
}
