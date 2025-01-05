import styles from "./utilits.module.css";
import { BaseElement } from "../common/baseElement.js";
import { generateSequence } from "../logic/logic.js";

let numberOfRound = 0;

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
PlayButton.addEventListener("click", () => {
  //hide "play" button and  instead show "repeat" and "new game"
  [PlayButton, RepeatButton, NewGameButton].forEach((button) => {
    button.toggleClass(styles.hidden);
  });
  numberOfRound++;
  RoundButton.setInnerHTML(`Round: ${numberOfRound}`);
  DifficultyButton.addClasses([styles.inactive]);
  generateSequence(numberOfRound * 2);
});

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
