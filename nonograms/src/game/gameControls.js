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
      classes: [styles.button, styles.random],
      text: "Random Game",
      callback: () => {
        this.gameManager.loadRandom();
      },
    });

    const resetButton = new Button({
      classes: [styles.button, styles.reset],
      text: "Reset Game",
      callback: () => {
        this.gameManager.currentGameField.reset();
      },
    });

    const saveGameButton = new Button({
      classes: [styles.button, styles.save],
      text: "Save Game",
      callback: () => {
        if (
          !this.gameManager.currentGameField ||
          this.gameManager.currentGameField.isSolutionShowed
        ) {
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
      classes: [styles.button, styles.load],
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
      classes: [styles.button, styles.score],
      text: "Show Score",
      callback: () => {
        const results = this.storage.loadLeaderboard();
        this.modal.createRating(results);
      },
    });

    const themeButton = new Button({
      classes: [styles.button, styles.theme],
      text: "Theme: LIGHT",
      callback: () => {
        document.documentElement.setAttribute("data-theme", "light");

        if (this.theme === "LIGHT") {
          this.theme = "DARK";
        } else {
          this.theme = "LIGHT";
        }
        themeButton.setText(`Theme: ${this.theme}`);
        document.documentElement.setAttribute(
          "data-theme",
          this.theme === "LIGHT" ? "light" : "dark",
        );
      },
    });
    const soundButton = new Button({
      classes: [styles.button, styles.sound],
      text: "Sound: ON",
      callback: () => {
        this.gameManager.soundManager.toggleMute();
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
