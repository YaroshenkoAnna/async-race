import { GameField } from "../components/gameField.js";
import { LevelSelector } from "../components/levelSelector.js";
import { puzzleData } from "../data/puzzleData.js";
import { getRandomNumber } from "../utils/randomNumber.js";

export class GameManager {
  constructor(
    wrapper,
    timer,
    storage,
    selectors,
    difficultySelector,
    level,
    soundManager,
    modal,
  ) {
    this.wrapper = wrapper;
    this.timer = timer;
    this.storage = storage;
    this.selectors = selectors;
    this.currentGameField = null;
    this.difficultySelector = difficultySelector;
    this.level = level;
    this.soundManager = soundManager;
    this.modal = modal;
  }

  startNewGame(levelData) {
    if (this.currentGameField) {
      this.wrapper.removeChild(this.currentGameField);
    }

    this.timer.reset();
    this.currentGameField = new GameField(levelData, this);
    this.wrapper.append(this.currentGameField);
  }

  loadRandom() {
    const currentName = this.level.getValue();
    const difficulties = this.difficultySelector.filterKeyArray;
    const difficulty = difficulties[getRandomNumber(0, difficulties.length)];
    this.difficultySelector.setValue(difficulty);
    this.updateGameSelector(difficulty, () => {});
    const names = this.level.filterKeyArray;
    let name;
    do {
      name = names[getRandomNumber(0, names.length)];
    } while (name === currentName);

    this.level.setValue(name);
    this.startNewGame(this.getCurrentData(this.level));
  }

  loadGame(data) {
    this.difficultySelector.setValue(data.difficulty);
    this.updateGameSelector(data.difficulty, () => {
      this.level.setValue(data.name);

      this.startNewGame(data.field);
      this.timer.setTime(data.time);
      this.timer.savedTime = data.time;

      data.filled.forEach((row, i) => {
        row.forEach((el, j) => {
          if (el) {
            this.currentGameField.cellsMap[i][j].toggleCellFill();
          }
        });
      });

      data.crosses.forEach((row, i) => {
        row.forEach((el, j) => {
          if (el) {
            this.currentGameField.cellsMap[i][j].toggleCross();
          }
        });
      });
    });
  }

  updateGameSelector(difficulty, callback = null) {
    const filteredLevels = puzzleData.filter(
      (el) => el.difficulty === difficulty,
    );

    const newGameSelector = new LevelSelector(filteredLevels, "name", () => {
      this.startNewGame(this.getCurrentData(newGameSelector));
    });

    this.selectors.replaceChild(newGameSelector);
    this.level = newGameSelector;
    if (callback) callback();
  }

  getCurrentData(selector) {
    const data = selector.createFilterData()[selector.getCurrentValueIndex()];
    return Array.isArray(data) ? data[0] : data;
  }
}
