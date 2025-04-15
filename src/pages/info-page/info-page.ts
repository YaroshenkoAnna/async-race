import { Button } from "../../components/button/button";
import { BaseElement } from "../../utils/base-element";
import styles from "./info-page.module.scss";

export class InfoPage extends BaseElement<"main"> {
  private defaultRoute: string;

  constructor(defaultRoute: string) {
    super({
      tag: "main",
      classNames: [styles.main],
    });

    this.defaultRoute = defaultRoute;

    this.render();
  }

  private render(): void {
    const title = new BaseElement({
      tag: "h1",
      classNames: [styles.title],
      text: "Fun Chat",
    });
    const paragraph = new BaseElement({
      tag: "p",
      classNames: [styles.paragraph],
      text: "Fun Chat is a chat application that allows you to communicate with your friends and family in real-time.",
    });
    const link = new BaseElement({
      tag: "a",
      classNames: [styles.link],
      text: "Author Anna Yaroshenko",
      attributes: { href: "https://github.com/YaroshenkoAnna" },
    });
    const button = new Button({
      text: "Return",
      classNames: [styles.button],
      callback: () => {
        globalThis.location.hash = this.defaultRoute;
      },
    });

    this.appendChildren(title, paragraph, link, button);
  }
}
