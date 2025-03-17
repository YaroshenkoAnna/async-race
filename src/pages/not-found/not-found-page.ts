import { BaseElement } from "../../utils/base-element";
import { Button } from "../../components/button/button";
import styles from "./not-found.module.scss";

export class NotFoundPage extends BaseElement<"main"> {
  constructor() {
    super({ tag: "main", classNames: [styles.main] });

    const title = new BaseElement<"h1">({
      tag: "h1",
      text: "The page was not found",
    });
    const button = new Button({
      text: "Go back",
      callback: (): void => {
        globalThis.location.hash = "/";
      },
    });
    this.appendChildren(title, button);
  }
}
