import styles from "./options-page.module.scss";
import buttonStyles from "../../components/button/button.module.scss";
import { BaseElement } from "../../utils/base-element";
import { title } from "../../components/title/title";
import { Button } from "../../components/button/button";
import { Main } from "../../components/main/main";
import { counter } from "../../utils/counter";
import { Option } from "../../components/option/option";
import { ValidationErrorModal } from "../../components/modal/validation-error-modal";
import { OptionalInputModal } from "../../components/modal/optional-input-modal";

export const main = new Main();
const optionsList = new BaseElement<"ul">({
  tag: "ul",
  classNames: [styles.options],
});

const addOptionButton = new Button({
  text: "Add Option",
  callback: (): void => {
    const option = new Option(counter());
    optionsList.appendChildren(option.node);
  },
  classNames: [buttonStyles["control-button"]],
});

const pasteListButton = new Button({
  text: "Paste List",
  callback: (): void => {
    const modal = new OptionalInputModal();
    modal.open();
  },
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
  callback: (): void => {
    const modal = new ValidationErrorModal();
    modal.open();
  },
  classNames: [buttonStyles["control-button"]],
});

main.appendChildren(
  title,
  optionsList,
  addOptionButton,
  pasteListButton,
  clearListButton,
  saveListButton,
  loadListButton,
  startButton,
);
