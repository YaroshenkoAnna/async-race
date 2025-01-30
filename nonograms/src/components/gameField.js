import { BaseElement } from "./baseElement.js";
import { Cell } from "./cell.js";
import styles from "../styles/field.module.scss";
import { Hints } from "./hints.js";
import { Button } from "./button.js";
import { SoundManager } from "../game/audioManager.js";

export class GameField extends BaseElement {
  constructor(dataObj, timer) {
    super({ tag: "div", classes: [styles.field] });
    this.dataObj = dataObj;
    this.cells = new BaseElement({
      tag: "div",
      classes: [styles.cells],
    });
    this.cellsMap = [];
    this.append(this.generateSolutionSection(), this.cells);
    this.generateRows(dataObj.size);
    this.generateHints();
    this.addListener("contextmenu", (e) => e.preventDefault());
    this.timer = timer;
    this.isFirstClick = true;
  }

  generateRows(length) {
    for (let i = 0; i < length; i++) {
      const row = new BaseElement({ tag: "div", classes: [styles.row] });
      this.cells.append(row);
      this.cellsMap.push([]);
      this.generateCells(row, length, i);
    }
  }

  generateCells(parent, length, rowNumber) {
    for (let i = 0; i < length; i++) {
      const cell = new Cell(i, rowNumber, length, this);

      this.cellsMap[rowNumber].push(cell);
      parent.append(cell);
    }
  }

  generateHints() {
    const verticalHints = new Hints(this.dataObj, "vertical");
    const horizontalHints = new Hints(this.dataObj, "horizontal");
    this.append(verticalHints, horizontalHints);
  }

  generateSolutionSection() {
    const solution = new Button({
      text: "Show solution",
      classes: [styles.solution],
      callback: this.showSolution.bind(this),
    });
    return solution;
  }

  checkVictory() {
    const isCorrect = this.dataObj.solution.every((row, rowIndex) =>
      row.every(
        (cell, colIndex) => cell == this.cellsMap[rowIndex][colIndex].isFilled,
      ),
    );

    if (isCorrect) {
      this.handleVictory();
    }
  }

  handleVictory() {
    console.log("Victory!");
    //block events in the field
    this.timer.stop();
    //save to rating
    //modal window
    SoundManager.play("win");
  }

  showSolution() {
    this.reset();
    const flatCellsMap = this.cellsMap.flat();
    this.dataObj.solution.flat().forEach((cell, index) => {
      if (cell) {
        flatCellsMap[index].toggleCellFill();
      }
    });

    //block events in the field
    this.timer.stop();
    //don't check for victory
  }

  reset() {
    this.cellsMap.flat().forEach((cell) => cell.clearData());
    this.timer.reset();
    // unblock events
  }
}
