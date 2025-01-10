import { BaseElement } from "./baseElement";
import styles from "../utilits/utilits.module.css";
import keyboardStyles from "../keyboard/keyboard.module.css";

export class Button extends BaseElement {
  constructor(classes, attributes = {}, text = "", callback) {
    super("button", [...classes, styles.button], attributes, text);
    this.addEventListener("click", callback);
  }
}

export class KeyboardButton extends BaseElement {
  constructor(classes, attributes = {}, text = "", callback) {
    super("button", [...classes, keyboardStyles.button], attributes, text);
    this.addEventListener("click", callback);
  }
}
