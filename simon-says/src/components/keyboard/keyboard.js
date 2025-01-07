import styles from "./keyboard.module.css";
import { BaseElement } from "../common/baseElement.js";
import { keyboards } from "../../data/keyboards.js";
import { sequence, Input, GameButtons } from "../utilits/utilits.js";

export const Keyboard = new BaseElement("div", [
  styles.keyboard,
  styles.easy,
  styles.inactive,
]);
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

    Button.addEventListener("click", checkSequence);
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
    }
  }
  if (clickCounter == sequence.length) {
    blockInput();
    clearData();
  }
}

function blockInput() {
  window.removeEventListener("keydown", checkSequence);
  Keyboard.addClasses([styles.inactive]);
}

function unblockInput() {
  window.addEventListener("keydown", checkSequence);
  Keyboard.removeClass(styles.inactive);
}

function blockButtons() {
  GameButtons.addClasses([styles.inactive]);
}

function unblockButtons() {
  GameButtons.removeClass([styles.inactive]);
}

function clearData() {
  clickCounter = 0;
  enteredSymbols = "";
}
