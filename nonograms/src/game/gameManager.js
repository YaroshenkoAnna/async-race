import { GameField } from "../components/gameField.js";

export class GameManager {
  constructor(wrapper, timer, storage) {
    this.wrapper = wrapper;
    this.timer = timer;
    this.storage = storage;
    this.currentGameField = null;
  }

  startNewGame(levelData) {
    if (Array.isArray(levelData)) {
      levelData = levelData[0];
    }
    if (this.currentGameField) {
      this.wrapper.removeChild(this.currentGameField.getNode());
    }

    this.timer.reset();
    this.currentGameField = new GameField(levelData, this.timer);
    
    this.wrapper.append(this.currentGameField);
  }

  getCurrentGameField() {
    return this.currentGameField;
  }
}
