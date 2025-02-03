import { BaseElement } from "./baseElement.js";
import styles from "../styles/hints.module.scss";

export class Hints extends BaseElement {
  constructor(dataObj, className) {
    super({ tag: "div", classes: [styles.hints] });
    this.dataObj = dataObj;
    this.className = className;
    this.addClasses([styles[className]]);
    this.calculateHints();
  }

  calculateHints() {
    const solution = this.dataObj.solution;
    const isVertical = this.className === "vertical";

    for (let i = 0; i < solution.length; i++) {
      const hintArr = [];
      let counter = 0;

      for (let j = 0; j < solution.length; j++) {
        const cell = isVertical ? solution[i][j] : solution[j][i];

        if (cell) {
          counter++;
        }
        if ((!cell && counter) || (j === solution.length - 1 && cell)) {
          hintArr.push(counter);
          counter = 0;
        }
      }

      this.createHints(hintArr);
    }
  }

  createHints(arr) {
    const hintRow = new BaseElement({ tag: "div", classes: [styles.row] });
    this.append(hintRow);
    arr.forEach((el) => {
      const hint = new BaseElement({
        tag: "div",
        classes: [styles.hint],
        text: el,
      });
      hint.addClasses([styles[`h${this.dataObj.size}`]])

      hintRow.append(hint);
    });
  }
}
