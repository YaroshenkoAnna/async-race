import { GameField } from "../components/gameField.js";

export class GameManager {
  constructor(wrapper, timer, storage, difficulty, level) {
    this.wrapper = wrapper;
    this.timer = timer;
    this.storage = storage;
    this.currentGameField = null;
    this.difficulty = difficulty;
    this.level = level;
  }

  startNewGame(levelData) {
    if (Array.isArray(levelData)) {
      levelData = levelData[0];
    }
    if (this.currentGameField) {
      this.wrapper.removeChild(this.currentGameField);
    }

    this.timer.reset();
    this.currentGameField = new GameField(levelData, this.timer);

    this.wrapper.append(this.currentGameField);
  }

  getCurrentGameField() {
    return this.currentGameField;
  }

  loadGame(data) {
    console.log(data);
    this.difficulty.setValue(data.difficulty);
    this.updateGameSelector(data.difficulty);
    this.level.setValue(data.name);
    this.startNewGame(data.field);
    this.timer.setTime(data.time);

    data.filled.map((row, i) => {
      row.map((el, j) => {
        if (el) {
          this.currentGameField.cellsMap[i][j].toggleCellFill();
        }
      });
    });

    data.crosses.map((row, i) => {
      row.map((el, j) => {
        if (el) {
          this.currentGameField.cellsMap[i][j].toggleCross();
        }
      });
    });
  }

  updateGameSelector(difficulty) {
    this.level.updateOptions(difficulty);
  }
}
