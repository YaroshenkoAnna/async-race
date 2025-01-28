import { BaseElement } from "./src/components/baseElement.js";
import { GameField } from "./src/components/gameField.js";
import { LevelSelector } from "./src/components/levelSelector.js";
import { puzzleData } from "./src/data/puzzleData.js";
import { Timer } from "./src/components/timer.js";

const wrapper = new BaseElement({ tag: "div", classes: ["wrapper"] });
document.body.appendChild(wrapper.getNode());

const selectors = new BaseElement({ tag: "div", classes: ["selectors"] });
const timer = new Timer();
wrapper.append(selectors, timer);

const difficultySelector = new LevelSelector(puzzleData, "difficulty", () => {
  handleSelectorChange();
});

const gameSelector = generateGameSelector(difficultySelector);
selectors.append(difficultySelector, gameSelector);
wrapper.append(generateGameField(gameSelector));

function handleSelectorChange() {
  const gameSelector = generateGameSelector(difficultySelector);
  selectors.replaceChild(gameSelector);
  wrapper.replaceChild(generateGameField(gameSelector));
}

function generateGameSelector(obj) {
  timer.reset();
  const currentData = getCurrentData(obj);
  const gameSelector = new LevelSelector(currentData, "name", () => {
    wrapper.replaceChild(generateGameField(gameSelector));
  });
  return gameSelector;
}

function getCurrentData(obj) {
  return obj.createFilterData()[obj.getCurrentValueIndex()];
}

function generateGameField(selector) {
  return new GameField(getCurrentData(selector)[0], timer);
}
