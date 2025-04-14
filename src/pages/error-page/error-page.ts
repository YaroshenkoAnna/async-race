import { BaseElement } from "../../utils/base-element";
import styles from "./error-page.module.scss";

export class ErrorPage extends BaseElement<"main"> {
  constructor() {
    super({
      tag: "main",
    });
    this.render();
  }
  private render(): void {
    const image = new BaseElement({
      tag: "img",
      classNames: [styles.image],
      attributes: {
        src: "./error.png",
        alt: "error image",
      },
    });
    this.appendChildren(image);
  }
}

