import { BaseElement } from "../../utils/base-element";
import { Button } from "../button/button";

export class Navigation extends BaseElement<"nav"> {
  private garageButton: Button;
  private winnersButton: Button;

  constructor() {
    super({ tag: "nav" });

    this.garageButton = new Button({
      text: "Garage",
      callback: () => {
        globalThis.location.hash = "/garage";
      },
    });

    this.winnersButton = new Button({
      text: "Winners",
      callback: () => {
        globalThis.location.hash = "/winners";
      },
    });

    this.garageButton.setAttributes({ disabled: "true" });

    this.appendChildren(this.garageButton, this.winnersButton);

    globalThis.addEventListener("hashchange", () => this.updateButtonState());

    this.updateButtonState();
  }

  private updateButtonState() {
    const currentHash = globalThis.location.hash;

    if (currentHash === "#/garage") {
      this.garageButton.setAttributes({ disabled: "true" });
      this.winnersButton.removeAttribute("disabled");
    } else if (currentHash === "#/winners") {
      this.winnersButton.setAttributes({ disabled: "true" });
      this.garageButton.removeAttribute("disabled");
    }
  }
}
