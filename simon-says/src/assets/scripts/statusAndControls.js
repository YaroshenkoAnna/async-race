import styles from "../styles/components/statusAndControls.module.css";
import { BaseElement } from "./baseElement.js";
import { generateKeyboard } from "./keyboard.js";

// classes

class Button extends BaseElement {
  constructor(classes, attributes = {}, text = "", callback) {
    super("button", [...classes, styles.button], attributes, text);
    this.addEventListener("click", callback);
  }
}

// layout

export const InfoPanel = new BaseElement("div", [styles.container]);

const RoundIndicator = new BaseElement(
  "div",
  [styles.button, styles.info, styles.hidden, styles.inactive],
  {},
  `Round: 0`
);

export const InputDisplay = new BaseElement(
  "div",
  [styles.input, styles.hidden],
  {},
  ""
);

const DifficultyIndicator = new BaseElement("div", [
  styles.button,
  styles.info,
  styles.hidden,
  styles.inactive,
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
  DifficultyIndicator.appendChildren(Icon);
}

const EasyDifficulty = new Button(
  [styles.info, styles.difficulty, styles.active],
  {},
  "Easy",
  () => {
    generateKeyboard("easy");
    EasyDifficulty.addClasses([styles.active]);
    changeDifficultyIndicator("easy");
  }
);
const MediumDifficulty = new Button(
  [styles.info, styles.difficulty],
  {},
  "Medium",
  () => {
    generateKeyboard("medium");
    MediumDifficulty.addClasses([styles.active]);
    changeDifficultyIndicator("medium");
  }
);

const HardDifficulty = new Button(
  [styles.info, styles.difficulty],
  {},
  "Hard",
  () => {
    generateKeyboard("hard");
    HardDifficulty.addClasses([styles.active]);
    changeDifficultyIndicator("hard");
  }
);

InfoPanel.appendChildren(
  RoundIndicator,
  InputDisplay,
  DifficultyIndicator,
  EasyDifficulty,
  MediumDifficulty,
  HardDifficulty
);

export const GameButtons = new BaseElement("div", [
  styles.container,
  styles.gameButtons,
]);

const PlayButton = new Button([], {}, "Start");

const RepeatButton = new Button([styles.hidden], {}, "Repeat the sequence");
const NewGameButton = new Button([styles.hidden], {}, "New game");
const NextButton = new Button([styles.hidden], {}, "Next");
GameButtons.appendChildren(PlayButton, NewGameButton, RepeatButton, NextButton);

// interaction with controls

function changeDifficultyIndicator(difficulty) {}

function showStartScreen() {}
