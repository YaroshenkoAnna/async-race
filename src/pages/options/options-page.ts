import styles from "./options-page.module.scss";
import buttonStyles from "../../components/button/button.module.scss";
import { BaseElement } from "../../utils/base-element";
import { title } from "../../components/title/title";
import { Button } from "../../components/button/button";
import { Main } from "../../components/main/main";

export const main = new Main();
const optionsList = new BaseElement<"ul">({
  tag: "ul",
  classNames: [styles.optionsList],
});

const addOptionButton = new Button({
  text: "Add Option",
  callback: (): void => {},
  classNames: [buttonStyles["control-button"]],
});

const pasteListButton = new Button({
  text: "Paste List",
  callback: (): void => {},
  classNames: [buttonStyles["control-button"]],
});

const clearListButton = new Button({
  text: "Clear List",
  callback: (): void => {
    optionsList.deleteChildren();
  },
  classNames: [buttonStyles["control-button"]],
});

const saveListButton = new Button({
  text: "Save List to File",
  callback: (): void => {},
  classNames: [buttonStyles["control-button"]],
});

const loadListButton = new Button({
  text: "Load List from File",
  callback: (): void => {},
  classNames: [buttonStyles["control-button"]],
});

const startButton = new Button({
  text: "Start",
  callback: (): void => {},
  classNames: [buttonStyles["control-button"]],
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
