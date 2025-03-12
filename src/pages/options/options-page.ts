import styles from "./options-page.scss";
import { BaseElement } from "../../utils/base-element";
import { title } from "../../components/title/title";
import { main } from "../../components/main/main";
import { Button } from "../../components/button/button";

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

main.append(
  title,
  optionsList,
  addOptionButton,
  pasteListButton,
  clearListButton,
  saveListButton,
  loadListButton,
  startButton,
);
