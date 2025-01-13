import styles from "../styles/components/statusAndControls.module.css";
import { BaseElement } from "./baseElement.js";
import { generateKeyboard } from "./keyboard.js";
import { game } from "./game.js";

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
  (event) => changeDifficulty(event.target, "easy")
);
const MediumDifficulty = new Button(
  [styles.info, styles.difficulty],
  {},
  "Medium",
  (event) => changeDifficulty(event.target, "medium")
);

const HardDifficulty = new Button(
  [styles.info, styles.difficulty],
  {},
  "Hard",
  (event) => changeDifficulty(event.target, "hard")
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

const PlayButton = new Button([], {}, "Start", startGame);

const RepeatButton = new Button([styles.hidden], {}, "Repeat the sequence");
const NewGameButton = new Button([styles.hidden], {}, "New game", startNewGame);
const NextButton = new Button([styles.hidden], {}, "Next");
GameButtons.appendChildren(PlayButton, NewGameButton, RepeatButton, NextButton);

// interaction with controls

const DifficultyButtons = [
  EasyDifficulty._elem,
  MediumDifficulty._elem,
  HardDifficulty._elem,
];

const startScreenElem = [
  EasyDifficulty,
  MediumDifficulty,
  HardDifficulty,
  PlayButton,
];

const gameScreenElem = [
  DifficultyIndicator,
  RoundIndicator,
  InputDisplay,
  NewGameButton,
  RepeatButton,
];

function changeDifficultyIndicator(difficulty) {
  const children = Array.from(DifficultyIndicator.children());
  children.forEach((child) => child.classList.add(styles.active));
  if (difficulty == "medium") {
    children[children.length - 1].classList.remove(styles.active);
  }
  if (difficulty == "easy") {
    children
      .slice(-2)
      .forEach((child) => child.classList.remove(styles.active));
  }
}

function showStartScreen() {
  startScreenElem.forEach((obj) => obj.removeClasses([styles.hidden]));
  gameScreenElem.forEach((obj) => obj.addClasses([styles.hidden]));
}

function showGameScreen() {
  startScreenElem.forEach((obj) => obj.addClasses([styles.hidden]));
  gameScreenElem.forEach((obj) => obj.removeClasses([styles.hidden]));
}

function changeDifficulty(node, difficulty) {
  game.setDifficulty(difficulty);
  changeDifficultyIndicator(difficulty);
  node.classList.add(styles.active);
  DifficultyButtons.forEach((button) => {
    if (button !== node) {
      button.classList.remove(styles.active);
    }
  });
  generateKeyboard(difficulty);
}

function startGame() {
  showGameScreen();
  game.initGame();
}

function startNewGame() {
  if (game.isSequencePlay) {
    return;
  }
  showStartScreen();
}
