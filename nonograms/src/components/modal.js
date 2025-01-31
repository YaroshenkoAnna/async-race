import { BaseElement } from "./baseElement";
import styles from "../styles/modal.module.scss";
import { Button } from "./button";
import { formatTime } from "../utils/formatTime";

export class Modal extends BaseElement {
  constructor() {
    super({ tag: "dialog", classes: [styles.modal] });
    this.addListener("close", () => {
      this.clearChildren();
    });
  }
  button = new Button({
    text: "ok",
    classes: [styles.button],
    callback: () => {
      this.getNode().close();
    },
  });

  createWinModal(time) {
    const winTime = Math.ceil(time / 1000);
    const p = new BaseElement({
      tag: "p",
      classes: [styles.message],
      text: `Great! You have solved the nonogram in ${winTime} seconds!`,
    });
    this.append(p, this.button);
    this.getNode().showModal();
  }

  createRating(results) {
    const container = new BaseElement({
      tag: "div",
      classes: [styles.container],
    });
    const title = new BaseElement({
      tag: "h2",
      classes: [styles.title],
      text: "Rating",
    });
    const table = new BaseElement({ tag: "table", classes: [styles.table] });
    const thead = new BaseElement({
      tag: "thead",
      classes: [styles.tableTitles],
    });
    const tr = new BaseElement({
      tag: "tr",
      classes: [styles.tableTitles],
    });
    thead.append(tr);
    ["#", "Time", "Puzzle", "Difficulty"].forEach((e) => {
      const th = new BaseElement({
        tag: "th",
        classes: [styles.tableTitles],
        text: e,
      });
      tr.append(th);
    });
    const tbody = new BaseElement({ tag: "tbody", classes: [styles.table] });
    table.append(thead, tbody);

    container.append(title, table, this.button);
    this.append(container);
    const sortResults = results.sort((a, b) => a.time - b.time);
    //обработать вариант, если массив пустой
    sortResults.forEach((res, index) => {
      const tr = new BaseElement({ tag: "tr", classes: [styles.item] });
      tbody.append(tr);
      [
        `${index + 1}`,
        `${formatTime(res.time)}`,
        `${res.name}`,
        `${res.difficulty}`,
      ].forEach((e) => {
        const th = new BaseElement({
          tag: "th",
          classes: [styles.item],
          text: e,
        });
        tr.append(th);
      });
    });
    this.getNode().showModal();
  }
}
