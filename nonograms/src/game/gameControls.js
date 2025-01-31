import { BaseElement } from "../components/baseElement.js";
import { Button } from "../components/button.js";
import styles from "../styles/gameControls.module.scss";

export class GameControls extends BaseElement {
  isMute = false;
  theme = "LIGHT";
  constructor(gameManager) {
    super({ tag: "div", classes: [styles.gameControls] });
    this.gameManager = gameManager;
    this.render();
    this.storage = gameManager.storage;
    this.modal = gameManager.modal;
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
      callback: () => {
        const results = this.storage.loadLeaderboard();
        this.modal.createRating(results);
      },
    });

    const themeButton = new Button({
      classes: [styles.button],
      text: "Theme: LIGHT",
      callback: () => {
        if (this.theme === "LIGHT") {
          this.theme = "DARK";
        } else {
          this.theme = "LIGHT";
        }
        // сохранять в сторедж
        themeButton.setText(`Theme: ${this.theme}`);
      },
    });
    const soundButton = new Button({
      classes: [styles.button],
      text: "Sound: ON",
      callback: () => {
        this.gameManager.soundManager.toggleMute();
 // сохранять в сторедж
        if (this.isMute) {
          soundButton.setText("Sound: ON");
          this.isMute = false;
        } else {
          soundButton.setText("Sound: OFF");
          this.isMute = true;
        }
      },
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
