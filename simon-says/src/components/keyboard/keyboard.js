import styles from "./keyboard.module.css";
import commonStyles from "../../assets/styles/common.module.css";
import { keyboards } from "../../data/keyboards.js";
import { Keyboard as KeyboardElement } from "../elements/keyboardElement.js";
import {
  sequence,
  Input,
  GameButtons,
  RepeatButton,
  NextButton,
  Info,
  DifficultyButton,
} from "../utilits/utilits.js";
import { KeyboardButton } from "../elements/buttonElement.js";

export const Keyboard = new KeyboardElement([styles.easy]);
export let typeOfKeyboard = "easy";
let keyboardMap = [];
let clickCounter = 0;

createKeys(typeOfKeyboard);

function createKeys(keys) {
  keyboards[keys].forEach((key) => {
    const Button = new KeyboardButton(
      [],
      { id: `${key}` },
      `${key}`,
      checkSequence
    );
    Keyboard.appendChildren(Button);
    keyboardMap.push(Button);
  });
}

// Changing of Keyboard

export function changeKeyboard(difficulty) {
  typeOfKeyboard = difficulty;
  Keyboard._elem.replaceChildren();
  keyboardMap = [];
  createKeys(typeOfKeyboard);
  Keyboard.removeClasses([styles.easy, styles.medium, styles.hard]);
  Keyboard.addClasses([styles[typeOfKeyboard]]);
  [...Info._elem.children].forEach((child) =>
    child.classList.remove(commonStyles.active)
  );
  [...DifficultyButton._elem.children].forEach((child, index) => {
    if (index) {
      child.classList.remove(commonStyles.active);
    }

    if (typeOfKeyboard == "medium" || typeOfKeyboard == "hard") {
      if (index == 1) {
        child.classList.add(commonStyles.active);
      }
    }

    if (typeOfKeyboard == "hard")
      if (index == 2) {
        child.classList.add(commonStyles.active);
      }
  });
}

function toggleActiveButton(button, toggledClass) {
  button.classList.add(styles[toggledClass]);
  setTimeout(() => {
    button.classList.remove(styles[toggledClass]);
  }, 300);
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
          keyboardMap[num].removeClasses([styles.active]);
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
  const regex = /(?<=Key|Digit)\w+/;
  /*  if (event.type == "keydown" && !event.code.match(regex)) {
    console.log(event.code.match(regex));
    return;
  } */
  let currentButton = keyboardMap[sequence[clickCounter]];

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
      Input.addClasses([commonStyles.wrong]);
      blockInput();
      return;
    }
  }
  if (clickCounter == sequence.length) {
    blockInput();
    clearData();
    RepeatButton.addClasses([commonStyles.hidden]);
    NextButton.removeClasses([commonStyles.hidden]);
  }
}

function blockInput() {
  window.removeEventListener("keydown", checkSequence);
  Keyboard.addClasses([commonStyles.inactive]);
}

function unblockInput() {
  window.addEventListener("keydown", checkSequence);
  Keyboard.removeClasses([commonStyles.inactive]);
}

function blockButtons() {
  GameButtons.addClasses([commonStyles.inactive]);
}

function unblockButtons() {
  GameButtons.removeClasses([commonStyles.inactive]);
}

function clearData() {
  clickCounter = 0;
  enteredSymbols = "";
}
