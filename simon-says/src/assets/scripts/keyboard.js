import { BaseElement } from "./baseElement";
import styles from "../styles/keyboard.module.css";
import controlStyles from "../styles/statusAndControls.module.css";

class Keyboard extends BaseElement {
  constructor(classes = [], attributes = {}, text = "") {
    super("div", [...classes, styles.keyboard, commonStyles.inactive]);
  }
}
