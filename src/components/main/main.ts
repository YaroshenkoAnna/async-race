import styles from "./main.module.scss";
import { BaseElement } from "../../utils/base-element";

export class Main extends BaseElement<"main"> {
  constructor() {
    super({
      tag: "main",
      classNames: [styles.main],
    });
  }
}
