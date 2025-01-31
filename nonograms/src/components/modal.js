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

  createButton() {
    return new Button({
      text: "OK",
      classes: [styles.button],
      callback: () => this.getNode().close(),
    });
  }

  createWinModal(time) {
    const winTime = Math.ceil(time / 1000);
    const message = new BaseElement({
      tag: "p",
      classes: [styles.message],
      text: `Great! You have solved the nonogram in ${winTime} seconds!`,
    });

    this.append(message, this.createButton());
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
    const tbody = new BaseElement({ tag: "tbody", classes: [styles.table] });

    const headers = ["#", "Time", "Puzzle", "Difficulty"];
    const trHead = new BaseElement({
      tag: "tr",
      classes: [styles.tableTitles],
    });
    headers.forEach((header) => {
      trHead.append(
        new BaseElement({
          tag: "th",
          classes: [styles.tableTitles],
          text: header,
        }),
      );
    });
    thead.append(trHead);
    table.append(thead, tbody);

    if (results.length === 0) {
      const emptyMessage = new BaseElement({
        tag: "p",
        classes: [styles.message],
        text: "No results yet!",
      });
      container.append(title, emptyMessage, this.createButton());
    } else {
      results.sort((a, b) => a.time - b.time);

      results.forEach((res, index) => {
        const tr = new BaseElement({ tag: "tr", classes: [styles.item] });
        tbody.append(tr);

        [index + 1, formatTime(res.time), res.name, res.difficulty].forEach(
          (text) => {
            tr.append(
              new BaseElement({ tag: "td", classes: [styles.item], text }),
            );
          },
        );
      });

      container.append(title, table, this.createButton());
    }

    this.append(container);
    this.getNode().showModal();
  }
}
