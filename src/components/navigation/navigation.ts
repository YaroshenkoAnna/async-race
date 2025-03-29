import { BaseElement } from "../../utils/base-element";
import { Button } from "../button/button";

export class Navigation extends BaseElement<"nav"> {
  constructor() {
    super({ tag: "nav" });
    this.renderButtons();
  }
  private renderButtons() {
    const garageButton = new Button({
      text: "Garage",
      callback: () => {
        console.log("Garage");
      },
    });
    const winnersButton = new Button({
      text: "Winners",
      callback: () => console.log("Winners"),
    });
    this.appendChildren(garageButton, winnersButton);
  }
}
