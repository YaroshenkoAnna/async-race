import { GameField } from "../components/gameField.js";
import { LevelSelector } from "../components/levelSelector.js";
import { puzzleData } from "../data/puzzleData.js";

export class GameManager {
  constructor(wrapper, timer, storage, selectors, difficultySelector, level) {
    this.wrapper = wrapper;
    this.timer = timer;
    this.storage = storage;
    this.selectors = selectors;
    this.currentGameField = null;
    this.difficultySelector = difficultySelector;
    this.level = level;
  }

  startNewGame(levelData) {
    if (this.currentGameField) {
      this.wrapper.removeChild(this.currentGameField);
    }

    this.timer.reset();
    console.log(levelData);
    this.currentGameField = new GameField(levelData, this.timer);
    this.wrapper.append(this.currentGameField);
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
      console.log(this.getCurrentData(newGameSelector));
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
