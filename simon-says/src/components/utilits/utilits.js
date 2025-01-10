import styles from "./utilits.module.css";
import commonStyles from "../../assets/styles/common.module.css";
import { BaseElement } from "../elements/baseElement.js";
import { generateSequence } from "../../services/gameLogic.js";
import {
  playSequence,
  changeKeyboard,
  typeOfKeyboard,
} from "../keyboard/keyboard.js";
import { Button as ButtonElement } from "../elements/buttonElement.js";

//Layout
export const Info = new BaseElement("div", [styles.container]);
const RoundButton = new BaseElement(
  "div",
  [styles.button, styles.info, commonStyles.hidden, commonStyles.inactive],
  {},
  `Round: 0`
);

export const Input = new BaseElement(
  "div",
  [styles.input, commonStyles.hidden, commonStyles.inactive],
  {},
  ""
);

const Easy = new ButtonElement(
  [styles.info, styles.difficulty, commonStyles.active],
  {},
  "Easy",
  () => {
    changeKeyboard("easy");
    Easy.addClasses([commonStyles.active]);
  }
);
const Medium = new ButtonElement(
  [styles.info, styles.difficulty],
  {},
  "Medium",
  () => {
    changeKeyboard("medium");
    Medium.addClasses([commonStyles.active]);
  }
);

const Hard = new ButtonElement(
  [styles.info, styles.difficulty],
  {},
  "Hard",
  () => {
    changeKeyboard("hard");
    Hard.addClasses([commonStyles.active]);
  }
);

export const DifficultyButton = new BaseElement("div", [
  styles.button,
  styles.info,
  commonStyles.hidden,
  commonStyles.inactive,
]);
for (let i = 0; i < 3; i++) {
  const Icon = new BaseElement(
    "svg",
    [styles.icon],
    { width: 30, height: 30 },
    "",
    true
  );
  if (i === 0) {
    Icon.addClasses([commonStyles.active]);
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

Info.appendChildren(RoundButton, Input, DifficultyButton, Easy, Medium, Hard);

export const GameButtons = new BaseElement("div", [
  styles.container,
  styles.gameButtons,
]);
const PlayButton = new BaseElement("div", [styles.button], {}, "Start");

export const RepeatButton = new BaseElement(
  "div",
  [styles.button, commonStyles.hidden],
  {},
  "Repeat the sequence"
);
const NewGameButton = new BaseElement(
  "div",
  [styles.button, commonStyles.hidden],
  {},
  "New game"
);
export const NextButton = new BaseElement(
  "div",
  [styles.button, commonStyles.hidden],
  {},
  "Next"
);
GameButtons.appendChildren(PlayButton, NewGameButton, RepeatButton, NextButton);

// Interaction with Buttons
export let sequence;

PlayButton.addEventListener("click", () => {
  showHideButtons(
    PlayButton,
    RepeatButton,
    NewGameButton,
    Input,
    RoundButton,
    DifficultyButton,
    Easy,
    Medium,
    Hard
  );
  playNextRound();
});

NewGameButton.addEventListener("click", () => {
  showHideButtons(
    PlayButton,
    NewGameButton,
    Input,
    RoundButton,
    DifficultyButton,
    Easy,
    Medium,
    Hard
  );
  RepeatButton.addClasses([commonStyles.hidden]);
  Input.removeClasses([styles.wrong]);
  RepeatButton.removeClasses([styles.blocked]);
  NextButton.addClasses([commonStyles.hidden]);

  RoundButton.setText(`Round: 0`);
  clearInput();
});

NextButton.addEventListener("click", () => {
  RepeatButton.removeClasses([commonStyles.hidden, styles.blocked]);
  NextButton.addClasses([commonStyles.hidden]);
  clearInput();
  playNextRound();
});

function showHideButtons() {
  const buttons = [...arguments];
  buttons.forEach((button) => {
    button.toggleClass(commonStyles.hidden);
  });
}

RepeatButton.addEventListener("click", repeatSequence);

function clearInput() {
  Input.setText("");
}

function repeatSequence() {
  Input.removeClasses([styles.wrong]);
  clearInput();
  setTimeout(() => {}, sequence.length * 800 + 1500);
  playSequence(sequence);
  RepeatButton.addClasses([styles.blocked]);
}

function playNextRound() {
  let numberOfRound = RoundButton.getText().match(/\d/)[0];
  numberOfRound++;
  RoundButton.setText(`Round: ${numberOfRound}`);
  DifficultyButton.addClasses([commonStyles.inactive]);
  sequence = generateSequence(numberOfRound * 2, typeOfKeyboard);

  setTimeout(() => {}, sequence.length * 800 + 1500);
  playSequence(sequence);
}
