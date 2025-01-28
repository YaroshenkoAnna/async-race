import { BaseElement } from "./baseElement";
import styles from "../styles/cell.module.scss";

export class Cell extends BaseElement {
  constructor(columnNumber, rowNumber, size, gameField) {
    super({ tag: "div", classes: [styles.cell] });
    this.columnNumber = columnNumber;
    this.rowNumber = rowNumber;
    this.gameField = gameField;
    this.isFilled = false;
    this.hasCross = false;

    this.addBoldBorders(columnNumber, rowNumber, size);

    this.addListener("click", this.toggleCellFill.bind(this));
    this.addListener("contextmenu", this.toggleCross.bind(this));
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

  toggleCellFill() {
    this.hasCross = false;
    this.setText("");
    this.isFilled = !this.isFilled;
    this.toggleClass(styles.filled);

    this.gameField.checkVictory();
  }

  toggleCross(event) {
    event.preventDefault();
    this.isFilled = false;
    this.removeClasses([styles.filled]);

    if (this.hasCross) {
      this.hasCross = false;
      this.setText("");
    } else {
      this.hasCross = true;
      this.setText("X");
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
