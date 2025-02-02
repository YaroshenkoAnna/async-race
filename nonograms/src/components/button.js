import { BaseElement } from "./baseElement.js";

export class Button extends BaseElement {
  constructor({ text: text, classes = [], callback: callback }) {
    super({ tag: "button", classes });
    this.setText(text);

    if (callback) {
      this.addListener("click", callback);
    }
  }
}
