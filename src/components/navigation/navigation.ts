import { BaseElement } from "../../utils/base-element";
import { Button } from "../button/button";

export class Navigation extends BaseElement<"nav"> {
  private outlet: BaseElement<"div">;
  private garage: BaseElement<"div">;
  private winners: BaseElement<"div">;

  constructor(
    outlet: BaseElement<"div">,
    garage: BaseElement<"div">,
    winners: BaseElement<"div">,
  ) {
    super({ tag: "nav" });
    this.outlet = outlet;
    this.garage = garage;
    this.winners = winners;
    this.renderButtons();
  }
  private renderButtons() {
    const garageButton = new Button({
      text: "Garage",
      callback: () => {
        this.outlet.node.replaceChild(this.garage.node, this.winners.node);
        garageButton.setAttributes({ disabled: "true" });
        winnersButton.removeAttribute("disabled");
      },
    });
    garageButton.setAttributes({
      disabled: "true",
    });

    const winnersButton = new Button({
      text: "Winners",
      callback: () => {
        this.outlet.node.replaceChild(this.winners.node, this.garage.node);
        winnersButton.setAttributes({ disabled: "true" });
        garageButton.removeAttribute("disabled");
      },
    });

    this.appendChildren(garageButton, winnersButton);
  }
}
