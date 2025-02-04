import { BaseElement } from "./baseElement";
import styles from "../styles/cell.module.scss";

export class Cell extends BaseElement {
  hasCross = false;
  isFilled = false;
  constructor(columnNumber, rowNumber, size, gameField) {
    super({ tag: "div", classes: [styles.cell] });
    this.columnNumber = columnNumber;
    this.rowNumber = rowNumber;
    this.gameField = gameField;

    this.addBoldBorders(columnNumber, rowNumber, size);
    this.addClasses([styles[`c${size}`]]);
    this.eventHandlers = {
      click: this.toggleCellFill.bind(this),
      contextmenu: this.toggleCross.bind(this),
    };

    this.addListener("click", this.eventHandlers.click);
    this.addListener("contextmenu", this.eventHandlers.contextmenu);
  }

  addBoldBorders(col, row) {
    const boldBorderEvery = 5;

    const addBorderClass = (condition, style) => {
      if (condition) this.addClasses([style]);
    };
    addBorderClass((col + 1) % boldBorderEvery === 0, styles.br2);
    addBorderClass(col % boldBorderEvery === 0, styles.bl2);

    addBorderClass((row + 1) % boldBorderEvery === 0, styles.bb2);
    addBorderClass(row % boldBorderEvery === 0, styles.bt2);
  }

  toggleCellFill(event) {
    if (this.gameField.isFirstClick) {
      this.gameField.timer.start();
      this.gameField.isFirstClick = false;
    }
    if (event) {
      if (this.isFilled) {
        this.gameField.soundManager.play("cancel");
      } else {
        this.gameField.soundManager.play("click");
      }
    }
    this.hasCross = false;
    this.setText("");
    this.isFilled = !this.isFilled;
    this.toggleClass(styles.filled);
    if (this.gameField.isSolutionShowed) return;
    this.gameField.checkVictory();
  }

  toggleCross(event) {
    if (event) {
      event.preventDefault();
      if (this.hasCross) {
        this.gameField.soundManager.play("cancel");
      } else {
        this.gameField.soundManager.play("cross");
      }
    }
    if (this.gameField.isFirstClick) {
      this.gameField.timer.start();
      this.gameField.isFirstClick = false;
    }
    this.isFilled = false;
    this.removeClasses([styles.filled]);

    if (this.hasCross) {
      this.hasCross = false;
      this.setText("");
    } else {
      this.hasCross = true;
      this.setText("×");
    }
    this.gameField.checkVictory();
  }

  clearData() {
    this.isFilled = false;
    this.hasCross = false;
    this.setText("");
    this.removeClasses([styles.filled]);
  }
}
