import styles from "./title.module.scss";
import { BaseElement } from "../../utils/base-element";

export class Title extends BaseElement<"h1"> {
  constructor() {
    super({
      tag: "h1",
      classNames: [styles.title],
      text: "Decision Making Tool",
    });
  }
}
