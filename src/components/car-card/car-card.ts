import type { Car } from "../../types/types";
import { BaseElement } from "../../utils/base-element";
import { BaseSVGElement } from "../../utils/base-svg-element";
import { Button } from "../button/button";

export class CarCard extends BaseElement<"div"> {
  private id: number;
  private name: string;
  private color: string;
  private carImage: BaseSVGElement;

  constructor(id: number, name: string, color: string) {
    super({ tag: "div" });
    this.id = id;
    this.name = name;
    this.color = color;
    this.carImage = new BaseSVGElement({
      href: "/sprite.svg#auto",
      attributes: { width: "100", height: "100" },
    });
    this.render();
  }

  public changeCarColor(color: string) {
    this.carImage.node.setAttribute("fill", color);
  }

  private render() {
    console.log(this.name, this.color);
    const carName = new BaseElement<"h3">({
      tag: "h3",
      text: this.name,
    });

    this.changeCarColor(this.color);

    const selectButton = new Button({
      text: "Select",
      callback: () => {
        const carSelectedEvent = new CustomEvent<Car>("carSelected", {
          detail: { id: this.id, name: this.name, color: this.color },
          bubbles: true,
        });

        this.node.dispatchEvent(carSelectedEvent);
      },
    });

    const removeButton = new Button({
      text: "Remove",
      callback: () => {
        console.log("Remove");
      },
    });
    const moveButton = new Button({
      text: "A",
      callback: () => {
        console.log("Select");
      },
    });
    const backButton = new Button({
      text: "B",
      callback: () => {
        console.log("Remove");
      },
    });

    const flag = new BaseSVGElement({
      href: "/sprite.svg#flag",
      attributes: { width: "40", height: "40" },
    });

    this.appendChildren(
      selectButton,
      removeButton,
      carName,
      moveButton,
      backButton,
      this.carImage,
      flag,
    );
  }
}
