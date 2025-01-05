import styles from "./utilits.module.css";
import { BaseElement } from "../common/baseElement.js";

export const Info = new BaseElement("div", [styles.container]);
const RoundButton = new BaseElement("div", [styles.button], {}, "Round: 0");
const DifficultyButton = new BaseElement("div", [styles.button]);

Info.appendChildren(RoundButton, DifficultyButton);

export const GameButtons = new BaseElement("div", [styles.container]);
const PlayButton = new BaseElement("div", [styles.button], {}, "Play");
const RepeatButton = new BaseElement("div", [styles.button], {}, "Repeat");
const NewGameButton = new BaseElement("div", [styles.button], {}, "New game");
GameButtons.appendChildren(PlayButton, NewGameButton, RepeatButton);
