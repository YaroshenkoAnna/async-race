import { BaseElement } from "./baseElement";
import styles from "../styles/components/keyboard.module.css";
import controlsStyles from "../styles/components/statusAndControls.module.css";
import { Main } from "./layoutContainers.js";

class KeyboardElement extends BaseElement {
  constructor(classes = [], difficulty) {
    super("div", [...classes, styles.keyboard, controlsStyles.inactive]);
    this.difficulty = difficulty;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  generateKeyboard("easy");
});

export function generateKeyboard(difficulty) {
  const Keyboard = new KeyboardElement([styles[difficulty]], difficulty);

  if (Main.children().length === 3) {
    Main._elem.removeChild(Main._elem.lastChild);
  }
  Main.appendChildren(Keyboard);
}
