import styles from "./keyboard.module.css";
import { BaseElement } from "../common/baseElement.js";
import { keyboards } from "../../data/keyboards.js";
import { sequence } from "../utilits/utilits.js";

export const Keyboard = new BaseElement("div", [styles.keyboard, styles.easy]);
export let typeOfKeyboard = "numerical";
let keyboardMap = [];
let clickCounter = 0;

createKeys(typeOfKeyboard);

function createKeys(keys) {
  keyboards[keys].forEach((key) => {
    const Button = new BaseElement(
      "button",
      [styles.button],
      { id: `${key.toUpperCase()}` },
      `${key.toUpperCase()}`
    );

    Button.addEventListener("click", (event) => {
      toggleActiveButton(event.target);
    });
    Keyboard.appendChildren(Button);
    keyboardMap.push(Button);
  });
}

function toggleActiveButton(button, toggledClass) {
  button.classList.add(styles[toggledClass]);
  setTimeout(() => {
    button.classList.remove(styles[toggledClass]);
  }, 600);
}

//Playback sequence

export function playSequence(sequence) {
  setTimeout(() => {
    sequence.forEach((num, index) => {
      setTimeout(() => {
        keyboardMap[num].addClasses([styles.active]);
        setTimeout(() => {
          keyboardMap[num].removeClass(styles.active);
        }, 600);
      }, index * 800);
    });
  }, 1500);
}

//Keyboard events
window.addEventListener("keydown", (event) => {
  console.log(event.target);
  let currentButton = keyboardMap[sequence[clickCounter]];

  const regex = /(?<=Key|Digit)\w+/;
  if (keyboards[typeOfKeyboard].includes(event.code.match(regex)[0])) {
    clickCounter++;
    if (event.code.match(regex)[0] == currentButton.getInnerHTML()) {
      toggleActiveButton(currentButton._elem, "active");
    } else {
      const clickedButton = document.getElementById(event.code.match(regex)[0]);
      toggleActiveButton(clickedButton, "wrong");
    }
  }
});
