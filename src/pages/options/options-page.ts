import styles from "./options-page.module.scss";
import { BaseElement } from "../../utils/base-element";
import { title } from "../../components/title/title";
import { Button } from "../../components/button/button";

export const main = new BaseElement<"main">({
  tag: "main",
});

const optionsList = new BaseElement<"ul">({
  tag: "ul",
  classNames: [styles.optionsList],
});

const addOptionButton = new Button({
  text: "Add Option",
  callback: (): void => {},
});

const pasteListButton = new Button({
  text: "Paste List",
  callback: (): void => {},
});

const clearListButton = new Button({
  text: "Clear List",
  callback: (): void => {
    optionsList.deleteChildren();
  },
});

const saveListButton = new Button({
  text: "Save List to File",
  callback: (): void => {},
});

const loadListButton = new Button({
  text: "Load List from File",
  callback: (): void => {},
});

const startButton = new Button({
  text: "Start",
  callback: (): void => {},
});

main.appendChildren([
  title.node,
  optionsList.node,
  addOptionButton.node,
  pasteListButton.node,
  clearListButton.node,
  saveListButton.node,
  loadListButton.node,
  startButton.node,
]);
