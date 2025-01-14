import styles from "../styles/components/keyboard.module.css";
import controlsStyles from "../styles/components/statusAndControls.module.css";
import { BaseElement } from "./baseElement";
import { Main } from "./layoutContainers.js";
import { virtualKeyboardData } from "./virtualKeyboardData.js";
import { game } from "./game.js";

class KeyboardButton extends BaseElement {
  constructor(classes, attributes = {}, text = "", callback) {
    super("button", [...classes, styles.button], attributes, text);
    this.addEventListener("mousedown", callback);
  }
}

class KeyboardElement extends BaseElement {
  constructor(classes = [], difficulty) {
    super("div", [...classes, styles.keyboard, controlsStyles.inactive]);
    this.difficulty = difficulty;
    this._generateButtons(difficulty);
  }

  _generateButtons(difficulty) {
    const keyboardMap = {};
    keyboardMap.keys = [];
    virtualKeyboardData[difficulty].forEach((key) => {
      const Button = new KeyboardButton(
        [],
        { id: `${key}` },
        `${key}`,
        (event) => {
          game.checkSequence(event);
        }
      );
      this.appendChildren(Button);
      keyboardMap.keys.push(Button);
      keyboardMap.values = virtualKeyboardData[difficulty];
    });
    game.setKeyboardMap(keyboardMap);
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

  game.keyboard = Keyboard;
}

window.addEventListener("keydown", (event) => {
  game.checkSequence(event);
});
window.addEventListener("keyup", (event) => {
  game.checkSequence(event);
});

export function keyboardEvents(event) {
  game.checkSequence(event);
}
