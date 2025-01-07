import styles from "./keyboard.module.css";
import commonStyles from "../utilits/utilits.module.css";
import { BaseElement } from "../common/baseElement.js";
import { keyboards } from "../../data/keyboards.js";
import {
  sequence,
  Input,
  GameButtons,
  RepeatButton,
  NextButton,
} from "../utilits/utilits.js";

export const Keyboard = new BaseElement("div", [
  styles.keyboard,
  styles.easy,
  commonStyles.inactive,
]);
export let typeOfKeyboard = "easy";
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

    Button.addEventListener("click", checkSequence);
    Keyboard.appendChildren(Button);
    keyboardMap.push(Button);
  });
}

// Changing of Keyboard

export function changeKeyboard(el) {
  typeOfKeyboard = el.typeKeyboard;
  Keyboard._elem.replaceChildren();
  keyboardMap = [];
  createKeys(el.typeKeyboard);
  Keyboard.removeClass(styles.easy);
  Keyboard.removeClass(styles.medium);
  Keyboard.removeClass(styles.hard);
  Keyboard.addClasses([styles[el.typeKeyboard]]);
}

function toggleActiveButton(button, toggledClass) {
  button.classList.add(styles[toggledClass]);
  setTimeout(() => {
    button.classList.remove(styles[toggledClass]);
  }, 600);
}

//Playback sequence

export function playSequence(sequence) {
  blockInput();
  blockButtons();
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
  const totalDuration = sequence.length * 800 + 1500;
  setTimeout(() => {
    unblockInput();
    unblockButtons();
  }, totalDuration);
}

//Keyboard events
export let enteredSymbols = "";

function checkSequence(event) {
  let currentButton = keyboardMap[sequence[clickCounter]];

  const regex = /(?<=Key|Digit)\w+/;
  if (
    event.type == "click" ||
    keyboards[typeOfKeyboard].includes(event.code.match(regex)[0])
  ) {
    clickCounter++;
    const symbol =
      event.type == "keydown"
        ? event.code.match(regex)[0]
        : event.target.textContent;
    enteredSymbols += symbol;
    Input.setText(enteredSymbols);

    if (symbol == currentButton.getText()) {
      toggleActiveButton(currentButton._elem, "active");
    } else {
      const clickedButton =
        event.type == "click"
          ? event.target
          : document.getElementById(event.code.match(regex)[0]);
      clearData();
      toggleActiveButton(clickedButton, "wrong");
      blockInput();
      return;
    }
  }
  if (clickCounter == sequence.length) {
    blockInput();
    clearData();
    RepeatButton.addClasses([commonStyles.hidden]);
    NextButton.removeClass(commonStyles.hidden);
  }
}

function blockInput() {
  window.removeEventListener("keydown", checkSequence);
  Keyboard.addClasses([commonStyles.inactive]);
}

function unblockInput() {
  window.addEventListener("keydown", checkSequence);
  Keyboard.removeClass(commonStyles.inactive);
}

function blockButtons() {
  GameButtons.addClasses([commonStyles.inactive]);
}

function unblockButtons() {
  GameButtons.removeClass([commonStyles.inactive]);
}

function clearData() {
  clickCounter = 0;
  enteredSymbols = "";
}
