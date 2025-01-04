import styles from "./keyboard.module.css";
import { BaseElement } from "../common/baseElement.js";
import { keyboards } from "../../data/keyboards.js";

export const Keyboard = new BaseElement("div", [styles.keyboard, styles.easy]);

keyboards.numerical.forEach((key) => {
  const Button = new BaseElement(
    "button",
    [styles.button],
    {},
    `${key.toUpperCase()}`
  );
  Button.addEventListener("keydown", function (event) {
    if (
      event.code === `Digit${key}` ||
      event.code === `Key${key.toUpperCase()}`
    ) {
      toggleActiveButton(event.target);
    }
  });
  Keyboard.appendChildren(Button);
});

function toggleActiveButton(button) {
  button.classList.add(styles.active);
  setTimeout(() => {
    button.classList.remove(styles.active);
  }, 1000);
}
