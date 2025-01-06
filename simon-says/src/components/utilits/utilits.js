import styles from "./utilits.module.css";
import { BaseElement } from "../common/baseElement.js";
import { generateSequence } from "../logic/logic.js";
import { playSequence } from "../keyboard/keyboard.js";

let numberOfRound = 0;

//Layout
export const Info = new BaseElement("div", [styles.container]);
const RoundButton = new BaseElement(
  "div",
  [styles.button, styles.info],
  {},
  `Round: ${numberOfRound}`
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

  if (i === 2) {
    Icon.addClasses([styles.active]);
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
}

Info.appendChildren(RoundButton, DifficultyButton);

export const GameButtons = new BaseElement("div", [styles.container]);
const PlayButton = new BaseElement("div", [styles.button], {}, "Play");

const RepeatButton = new BaseElement(
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
GameButtons.appendChildren(PlayButton, NewGameButton, RepeatButton);

// Interaction with Buttons
export let sequence;

PlayButton.addEventListener("click", () => {
  showHideButtons(PlayButton, RepeatButton, NewGameButton);
  numberOfRound++;
  RoundButton.setInnerHTML(`Round: ${numberOfRound}`);
  DifficultyButton.addClasses([styles.inactive]);
  sequence = generateSequence(numberOfRound * 2);
  blockMouseAndKeyboard(window);
  setTimeout(() => {
    unblockMouseAndKeyboard(window);
  }, sequence.length * 800 + 1500);
  playSequence(sequence);
});

NewGameButton.addEventListener("click", () => {
  showHideButtons(PlayButton, RepeatButton, NewGameButton);
  DifficultyButton.removeClass([styles.inactive]);
  numberOfRound = 0;
  RoundButton.setInnerHTML(`Round: ${numberOfRound}`);
});

function showHideButtons() {
  const buttons = [...arguments];
  buttons.forEach((button) => {
    button.toggleClass(styles.hidden);
  });
}

RepeatButton.addEventListener("click", () => {
  blockMouseAndKeyboard(window);
  setTimeout(() => {
    unblockMouseAndKeyboard(window);
  }, sequence.length * 800 + 1500);
  playSequence(sequence);
});

function blockMouseAndKeyboard(elem) {
  elem.addEventListener("mousedown", preventDefault, true);
  elem.addEventListener("mouseup", preventDefault, true);
  elem.addEventListener("click", preventDefault, true);
  elem.addEventListener("keydown", preventDefault, true);
  elem.addEventListener("keyup", preventDefault, true);
}

function unblockMouseAndKeyboard(elem) {
  elem.removeEventListener("mousedown", preventDefault, true);
  elem.removeEventListener("mouseup", preventDefault, true);
  elem.removeEventListener("click", preventDefault, true);
  elem.removeEventListener("keydown", preventDefault, true);
  elem.removeEventListener("keyup", preventDefault, true);
}

function preventDefault(event) {
  event.preventDefault();
  event.stopPropagation();
}
