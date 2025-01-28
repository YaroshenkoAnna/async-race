import { BaseElement } from "../components/baseElement.js";
import { Button } from "../components/button.js";
import styles from "../styles/gameControls.module.scss";

export class GameControls extends BaseElement {
  constructor() {
    super({ tag: "div", classes: [styles.gameControls] });
    this.render();
  }

  render() {
    const randomGameButton = new Button({
      classes: [styles.button],
      text: "Random Game",
    });
    const resetButton = new Button({
      classes: [styles.button],
      text: "Reset Game",
    });
    const saveGameButton = new Button({
      classes: [styles.button],
      text: "Save Game",
    });
    const loadGameButton = new Button({
      classes: [styles.button],
      text: "Continue Last Game",
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
