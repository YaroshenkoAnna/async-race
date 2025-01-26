import { BaseElement } from "./baseElement";
import styles from "../styles/cell.module.scss";

export class Cell extends BaseElement {
  constructor(columnNumber, rowNumber, size) {
    super({ tag: "div", classes: [styles.cell] });
    this.columnNumber = columnNumber;
    this.rowNumber = rowNumber;
    this.addBoldBorder(columnNumber, rowNumber, size);
    this.addListener("click", this.toggleCellFill.bind(this));
    this.addListener("contextmenu", this.toggleCross.bind(this));
    this.isFilled = false;
    this.hasCross = false;
  }

  addBoldBorder(col, row, length) {
    const boldBorderEvery = 5;
    if (col === 0) {
      this.addClasses([styles.bl4]);
    } else if (col === length - 1) {
      this.addClasses([styles.br4]);
    } else if ((col + 1) % boldBorderEvery === 0) {
      this.addClasses([styles.br2]);
    } else if (col % boldBorderEvery === 0) {
      this.addClasses([styles.bl2]);
    }

    if (row === 0) {
      this.addClasses([styles.bt4]);
    } else if (row === length - 1) {
      this.addClasses([styles.bb4]);
    } else if ((row + 1) % boldBorderEvery === 0) {
      this.addClasses([styles.bb2]);
    } else if (row % boldBorderEvery === 0) {
      this.addClasses([styles.bt2]);
    }
  }

  toggleCellFill() {
    this.cross = false;
    this.setText("");
    if (this.isFilled) {
      this.isFilled = false;
    } else {
      this.isFilled = true;
    }
    this.toggleClass(styles.filled);
  }

  toggleCross() {
    this.isFilled = false;
    this.removeClasses([styles.filled]);
    if (this.hasCross) {
      this.hasCross = false;
      this.setText("");
    } else {
      this.hasCross = true;
      this.setText("X");
    }
  }
}
