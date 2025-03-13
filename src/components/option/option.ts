import styles from "./option.scss";
import { BaseElement } from "../../utils/base-element";
import { Input } from "../input/input";
import { Button } from "../button/button";

export const option = new BaseElement<"li">({
  tag: "li",
  classNames: [styles.option],
});

const textInput = new Input({
  type: "text",
  name: "title",
  attributes: { placeholder: "Title" },
  counter: 1,
});

const label = textInput.createLabel();

const numberInput = new Input({
  type: "number",
  name: "weight",
  attributes: { placeholder: "Weight", min: "0" },
});

const deleteButton = new Button({
  text: "Delete",
  callback: (): void => {
    option.deleteElement();
  },
});

if (label) option.appendChildren([label]);
option.appendChildren([textInput.node, numberInput.node, deleteButton.node]);
