import styles from "./utilits.module.css";
import { BaseElement } from "../common/baseElement.js";
import { generateSequence } from "../logic/logic.js";
import { playSequence, changeKeyboard } from "../keyboard/keyboard.js";

let numberOfRound = 0;

//Layout
export const Info = new BaseElement("div", [styles.container]);
const RoundButton = new BaseElement(
  "div",
  [styles.button, styles.info],
  {},
  `Round: ${numberOfRound}`
);

export const Input = new BaseElement(
  "div",
  [styles.input, styles.hidden],
  {},
  ""
);

const DifficultyButton = new BaseElement("div", [styles.button, styles.info]);
for (let i = 0; i < 3; i++) {
  const Icon = new BaseElement(
    "svg",
    [styles.icon],
    { width: 30, height: 30 },
    "",
    true
  );
  if (i === 0) {
    Icon.typeKeyboard = "hard";
  } else if (i === 1) {
    Icon.typeKeyboard = "medium";
  } else {
    Icon.addClasses([styles.active]);
    Icon.typeKeyboard = "easy";
  }

  const Use = new BaseElement(
    "use",
    [],
    { href: "src/assets/img/sprite.svg#icon" },
    "",
    true
  );
  Icon.appendChildren(Use);
  DifficultyButton.appendChildren(Icon);

  Icon.addEventListener("click", () => changeKeyboard(Icon));
}

Info.appendChildren(RoundButton, Input, DifficultyButton);

export const GameButtons = new BaseElement("div", [styles.container]);
const PlayButton = new BaseElement("div", [styles.button], {}, "Play");

export const RepeatButton = new BaseElement(
  "div",
  [styles.button, styles.hidden],
  {},
  "Repeat"
);
const NewGameButton = new BaseElement(
  "div",
  [styles.button, styles.hidden],
  {},
  "New game"
);
export const NextButton = new BaseElement(
  "div",
  [styles.button, styles.hidden],
  {},
  "Next"
);
GameButtons.appendChildren(PlayButton, NewGameButton, RepeatButton, NextButton);

// Interaction with Buttons
export let sequence;

PlayButton.addEventListener("click", () => {
  showHideButtons(PlayButton, RepeatButton, NewGameButton, Input);
  playNextRound();
});

NewGameButton.addEventListener("click", () => {
  showHideButtons(PlayButton, NewGameButton, Input);
  RepeatButton.addClasses([styles.hidden]);
  DifficultyButton.removeClass([styles.inactive]);
  RepeatButton.removeClass(styles.blocked);
  NextButton.addClasses([styles.hidden]);

  numberOfRound = 0;
  RoundButton.setText(`Round: ${numberOfRound}`);
  clearInput();
});

NextButton.addEventListener("click", () => {
  RepeatButton.removeClass(styles.hidden);
  RepeatButton.removeClass(styles.blocked);
  NextButton.addClasses([styles.hidden]);
  clearInput();
  playNextRound();
});

function showHideButtons() {
  const buttons = [...arguments];
  buttons.forEach((button) => {
    button.toggleClass(styles.hidden);
  });
}

RepeatButton.addEventListener("click", repeatSequence);

function clearInput() {
  Input.setText("");
}

function repeatSequence() {
  clearInput();
  setTimeout(() => {}, sequence.length * 800 + 1500);
  playSequence(sequence);
  RepeatButton.addClasses([styles.blocked]);
}

function playNextRound() {
  numberOfRound++;
  RoundButton.setText(`Round: ${numberOfRound}`);
  DifficultyButton.addClasses([styles.inactive]);
  sequence = generateSequence(numberOfRound * 2);

  setTimeout(() => {}, sequence.length * 800 + 1500);
  playSequence(sequence);
}
