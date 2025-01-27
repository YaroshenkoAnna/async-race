import { BaseElement } from "./baseElement";
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
    if (this.className === "vertical") {
      for (let i = 0; i < solution.length; i++) {
        const hintArr = [];
        let counter = 0;
        for (let j = 0; j < solution.length; j++) {
          if (solution[i][j]) {
            counter++;
          }
          if (
            (!solution[i][j] && counter) ||
            (j === solution.length - 1 && solution[i][j])
          ) {
            hintArr.push(counter);
            counter = 0;
          }
        }
        this.createHints(hintArr);
      }
    }
    if (this.className === "horizontal") {
      for (let i = 0; i < solution.length; i++) {
        const hintArr = [];
        let counter = 0;
        for (let j = 0; j < solution.length; j++) {
          if (solution[j][i]) {
            counter++;
          }
          if (
            (!solution[j][i] && counter) ||
            (j === solution.length - 1 && solution[j][i])
          ) {
            hintArr.push(counter);
            counter = 0;
          }
        }
        this.createHints(hintArr);
      }
    }
  }

  createHints(arr) {
    console.log("1");
    const hintRow = new BaseElement({ tag: "div", classes: [styles.row] });
    this.append(hintRow);
    arr.forEach((el) => {
      const hint = new BaseElement({
        tag: "div",
        classes: [styles.hint],
        text: el,
      });
      hintRow.append(hint);
    });
  }
}
