import { puzzleData } from "../data/puzzleData.js";
import { BaseElement } from "./baseElement.js";

export class LevelSelector extends BaseElement {
  constructor(levels, key, callback) {
    super({ tag: "select", attributes: { name: key } });
    this.levels = levels;
    this.key = key;
    this.filterKeyArray = this.createFilterKeyArray(this.key);
    this.createOptions(this.filterKeyArray);
    this.addListener("change", callback);
  }

  createFilterKeyArray(key) {
    return Array.from(new Set(this.levels.map((el) => el[key])));
  }

  createOptions(filterKeyArray) {
    filterKeyArray.forEach((el) => {
      const option = new BaseElement({
        tag: "option",
        attributes: { value: el },
        text: el,
      });

      this.append(option);
    });
  }

  createFilterData() {
    return this.filterKeyArray.map((key) =>
      this.levels.filter((el) => el[this.key] === key),
    );
  }

  getCurrentValueIndex() {
    return this.getNode().selectedIndex;
  }

  setValue(value) {
    this.getNode().value = value;
  }

  getSelectedValue() {
    return this.getNode().value;
  }

  updateOptions(newDifficulty) {
    this.levels = puzzleData.filter((el) => el.difficulty === newDifficulty);
    this.levels = puzzleData;
    this.filterKeyArray = this.createFilterKeyArray(newDifficulty);
    this.createOptions(this.filterKeyArray);
  }
}
