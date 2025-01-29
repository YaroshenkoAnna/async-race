import { BaseElement } from "../components/baseElement.js";
import { Button } from "../components/button.js";
import styles from "../styles/gameControls.module.scss";

export class GameControls extends BaseElement {
  constructor(gameManager) {
    super({ tag: "div", classes: [styles.gameControls] });
    this.gameManager = gameManager;
    this.render();
    this.storage = gameManager.storage;
  }

  render() {
    const randomGameButton = new Button({
      classes: [styles.button],
      text: "Random Game",
      callback: () => {
        this.gameManager.loadRandom();
      },
    });
    const resetButton = new Button({
      classes: [styles.button],
      text: "Reset Game",
      callback: () => {
        this.gameManager.currentGameField.reset();
      },
    });
    const saveGameButton = new Button({
      classes: [styles.button],
      text: "Save Game",
      callback: () => {
        if (!this.gameManager.currentGameField) {
          return;
        }
        this.storage.saveGame({
          filled: this.gameManager.currentGameField.cellsMap.map((row) =>
            row.map((cell) => (cell.isFilled ? 1 : 0)),
          ),
          crosses: this.gameManager.currentGameField.cellsMap.map((row) =>
            row.map((cell) => (cell.hasCross ? 1 : 0)),
          ),
          time: this.gameManager.timer.getCurrentTime(),
          difficulty: this.gameManager.currentGameField.dataObj.difficulty,
          name: this.gameManager.currentGameField.dataObj.name,
          field: this.gameManager.currentGameField.dataObj,
        });
      },
    });
    const loadGameButton = new Button({
      classes: [styles.button],
      text: "Continue Last Game",
      callback: () => {
        const savedData = this.storage.loadGame();
        if (!savedData) {
          return;
        }

        this.gameManager.loadGame(savedData);
      },
    });

    const showScores = new Button({
      classes: [styles.button],
      text: "Show Score",
    });
    const themeButton = new Button({
      classes: [styles.button],
      text: "Theme: LIGHT",
    });
    const soundButton = new Button({
      classes: [styles.button],
      text: "Sound: ON",
    });

    this.append(
      randomGameButton,
      resetButton,
      saveGameButton,
      loadGameButton,
      showScores,
      themeButton,
      soundButton,
    );
  }
}
