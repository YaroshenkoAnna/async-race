import { BaseElement } from "./baseElement.js";
import { Cell } from "./cell.js";
import styles from "../styles/field.module.scss";
import { Hints } from "./hints.js";
import { Button } from "./button.js";

export class GameField extends BaseElement {
  maximalResultsLength = 5;
  isSolutionShowed = false;

  constructor(dataObj, gameManager) {
    super({ tag: "div", classes: [styles.field] });
    this.dataObj = dataObj;
    this.cells = new BaseElement({
      tag: "div",
      classes: [styles.cells],
    });
    this.addClasses([styles[`f${dataObj.size}`]]);
    this.cells.addClasses([styles[`c${dataObj.size}`]]);
    this.cellsMap = [];
    this.append(this.generateSolutionSection(), this.cells);
    this.generateRows(dataObj.size);
    this.generateHints();
    this.addListener("contextmenu", (e) => e.preventDefault());
    this.timer = gameManager.timer;
    this.isFirstClick = true;
    this.gameManager = gameManager;
    this.soundManager = gameManager.soundManager;
    this.storage = gameManager.storage;
    this.modal = gameManager.modal;
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
    this.blockGameEvents();
    this.timer.stop();
    this.cellsMap.flat().forEach((cell) => cell.setText(""));

    const result = {
      time: this.timer.difference,
      name: this.dataObj.name,
      difficulty: this.dataObj.difficulty,
    };
    const results = this.storage.loadLeaderboard();
    if (results.length >= this.maximalResultsLength) {
      results.shift();
    }
    results.push(result);
    this.storage.saveLeaderboard(results);
    this.modal.createWinModal(this.timer.difference);
    this.soundManager.play("win");
    this.isSolutionShowed = true;
  }

  showSolution() {
    this.reset();
    this.isSolutionShowed = true;

    const flatCellsMap = this.cellsMap.flat();
    this.dataObj.solution.flat().forEach((cell, index) => {
      if (cell) {
        flatCellsMap[index].toggleCellFill();
      }
    });

    this.blockGameEvents();
    this.timer.stop();
  }

  reset() {
    this.cellsMap.flat().forEach((cell) => cell.clearData());
    this.timer.reset();
    this.isFirstClick = true;
    this.unblockGameEvents();
    this.isSolutionShowed = false;
  }

  blockGameEvents() {
    this.cellsMap.flat().forEach((cell) => {
      cell.removeListener("click", cell.eventHandlers.click);
      cell.removeListener("contextmenu", cell.eventHandlers.contextmenu);
    });
  }

  unblockGameEvents() {
    this.cellsMap.flat().forEach((cell) => {
      cell.addListener("click", cell.eventHandlers.click);
      cell.addListener("contextmenu", cell.eventHandlers.contextmenu);
    });
  }
}
