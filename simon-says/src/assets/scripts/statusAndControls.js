import styles from "../styles/components/statusAndControls.module.css";
import { BaseElement } from "./baseElement.js";
import { generateKeyboard } from "./keyboard.js";
import { game } from "./game.js";

// classes

export class Button extends BaseElement {
  constructor(classes, attributes = {}, text = "", callback) {
    super("button", [...classes, styles.button], attributes, text);
    this.addEventListener("click", callback);
  }
}

// layout

export const InfoPanel = new BaseElement("div", [styles.container]);

export const RoundIndicator = new BaseElement(
  "div",
  [styles.button, styles.info, styles.hidden, styles.inactive],
  {},
  `Round: 1`
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
    { href: "./sprite.svg#icon" },
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

export const RepeatButton = new Button(
  [styles.hidden],
  {},
  "Repeat the sequence",
  () => {
    game.repeatSequence();
    RepeatButton.disabled;
    RepeatButton.addClasses([styles.blocked]);
  }
);
const NewGameButton = new Button([styles.hidden], {}, "New game", startNewGame);
const NextButton = new Button([styles.hidden], {}, "Next", () => {
  game.startNextRound();
  RepeatButton.removeClasses([styles.blocked]);
  RepeatButton.undisabled;
  RoundIndicator.setText(`Round: ${game.round}`);
});
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
  NextButton,
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
  game.keyboard.addClasses([styles.inactive]);
  gameScreenElem.forEach((obj) => obj.addClasses([styles.hidden]));
}

function showGameScreen() {
  startScreenElem.forEach((obj) => obj.addClasses([styles.hidden]));
  RepeatButton.undisabled;
  RepeatButton.removeClasses([styles.blocked]);
  gameScreenElem.forEach((obj) => {
    if (obj === NextButton) {
      return;
    }
    obj.removeClasses([styles.hidden]);
  });
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
  showStartScreen();
}

export function toggleRepeatNext() {
  [RepeatButton, NextButton].forEach((button) =>
    button.toggleClass(styles.hidden)
  );
}
