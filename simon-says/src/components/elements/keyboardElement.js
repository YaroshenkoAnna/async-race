import { BaseElement } from "./baseElement";
import styles from "../keyboard/keyboard.module.css";
import commonStyles from "../utilits/utilits.module.css";

export class Keyboard extends BaseElement {
  constructor(classes = [], attributes = {}, text = "", isSVG = false) {
    super("div", [...classes, styles.keyboard, commonStyles.inactive]);
  }
}
