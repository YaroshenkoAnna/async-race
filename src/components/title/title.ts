import styles from "./title.module.scss";
import { BaseElement } from "../../utils/base-element";

export const title = new BaseElement<"h1">({
  tag: "h1",
  classNames: [styles.title],
  text: "Hello, World!",
});
