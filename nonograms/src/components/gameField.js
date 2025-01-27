import { BaseElement } from "./baseElement.js";
import { Cell } from "./cell.js";
import styles from "../styles/field.module.scss";
import { Hints } from "./hints.js";

export class GameField extends BaseElement {
  constructor(dataObj) {
    super({ tag: "div", classes: [styles.field] });
    this.dataObj = dataObj;
    this.container = new BaseElement({ tag: "div", classes: [styles.field] });
    this.append(this.container);
    this.generateRows(dataObj.size);
    this.generateHints();
    this.addListener("contextmenu", (e) => e.preventDefault());
  }

  generateRows(length) {
    for (let i = 0; i < length; i++) {
      const row = new BaseElement({ tag: "div", classes: [styles.row] });
      this.container.append(row);
      this.generateCells(row, length, i);
    }
  }

  generateCells(parent, length, rowNumber) {
    for (let i = 0; i < length; i++) {
      const cell = new Cell(i, rowNumber, length);
      parent.append(cell);
    }
  }

  generateHints() {
    const verticalHints = new Hints(this.dataObj, "vertical");
    const horizontalHints = new Hints(this.dataObj, "horizontal");
    this.append(verticalHints, horizontalHints);
  }
}
