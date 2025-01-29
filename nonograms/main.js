import { BaseElement } from "./src/components/baseElement.js";
import { LevelSelector } from "./src/components/levelSelector.js";
import { puzzleData } from "./src/data/puzzleData.js";
import { Timer } from "./src/components/timer.js";
import { GameControls } from "./src/game/gameControls.js";
import { StorageManager } from "./src/game/storageManager.js";
import { GameManager } from "./src/game/gameManager.js";

const wrapper = new BaseElement({ tag: "div", classes: ["wrapper"] });
document.body.appendChild(wrapper.getNode());

const storageManager = new StorageManager("nonograms345567");
const timer = new Timer();

const selectors = new BaseElement({ tag: "div", classes: ["selectors"] });
wrapper.append(selectors, timer);

const difficultySelector = new LevelSelector(puzzleData, "difficulty", () => {
  updateGameSelector();
});

let gameSelector = createGameSelector(difficultySelector);

selectors.append(difficultySelector, gameSelector);
const gameManager = new GameManager(
  wrapper,
  timer,
  storageManager,
  difficultySelector,
  gameSelector,
);
gameManager.startNewGame(getCurrentData(gameSelector));

const gameControls = new GameControls(gameManager);
wrapper.append(gameControls);

function updateGameSelector() {
  gameSelector = createGameSelector(difficultySelector);
  selectors.replaceChild(gameSelector);
  gameManager.startNewGame(getCurrentData(gameSelector));
}

function createGameSelector(obj) {
  const currentData = getCurrentData(obj);
  return new LevelSelector(currentData, "name", () => {
    gameManager.startNewGame(getCurrentData(gameSelector));
  });
}

function getCurrentData(obj) {
  return obj.createFilterData()[obj.getCurrentValueIndex()];
}
