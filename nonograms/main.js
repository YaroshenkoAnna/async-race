import { BaseElement } from "./src/components/baseElement.js";
import { LevelSelector } from "./src/components/levelSelector.js";
import { puzzleData } from "./src/data/puzzleData.js";
import { Timer } from "./src/components/timer.js";
import { GameControls } from "./src/game/gameControls.js";
import { StorageManager } from "./src/game/storageManager.js";
import { GameManager } from "./src/game/gameManager.js";
import { SoundManager } from "./src/game/audioManager.js";
import { Modal } from "./src/components/modal.js";
import styles from "./src/styles/main.module.scss";
import { BurgerMenu } from "./src/components/burgerMenu.js";

const uniqueKey = "nonograms345567";
const container = new BaseElement({ tag: "div", classes: [styles.container] });
document.body.appendChild(container.getNode());
const title = new BaseElement({
  tag: "h1",
  classes: [styles.title],
  text: "Nonograms",
});
const wrapper = new BaseElement({ tag: "div", classes: [styles.wrapper] });
container.append(title, wrapper);

const storageManager = new StorageManager(uniqueKey);
const soundManager = new SoundManager();
const timer = new Timer();
const modal = new Modal();

const selectors = new BaseElement({ tag: "div", classes: [styles.selectors] });

wrapper.append(selectors, timer, modal);

const difficultySelector = new LevelSelector(puzzleData, "difficulty", () => {
  updateGameSelector();
});

let gameSelector = createGameSelector(difficultySelector);

selectors.append(difficultySelector, gameSelector);
const gameManager = new GameManager(
  wrapper,
  timer,
  storageManager,
  selectors,
  difficultySelector,
  gameSelector,
  soundManager,
  modal,
);
gameManager.startNewGame(getCurrentData(gameSelector)[0]);

const gameControls = new GameControls(gameManager);
const burgerMenu = new BurgerMenu(gameControls);

wrapper.append(burgerMenu, gameControls);

function updateGameSelector() {
  gameSelector = createGameSelector(difficultySelector);
  selectors.replaceChild(gameSelector);
  gameManager.startNewGame(getCurrentData(gameSelector)[0]);
}

function createGameSelector(obj) {
  const currentData = getCurrentData(obj);

  return new LevelSelector(currentData, "name", () => {
    gameManager.startNewGame(getCurrentData(gameSelector)[0]);
  });
}

function getCurrentData(obj) {
  return obj.createFilterData()[obj.getCurrentValueIndex()];
}
