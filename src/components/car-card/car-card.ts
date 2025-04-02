import type { Car, Id, CarEngineOptions } from "../../types/types";
import { BaseElement } from "../../utils/base-element";
import { BaseSVGElement } from "../../utils/base-svg-element";
import { Button } from "../button/button";
import styles from "./car-card.module.scss";

export class CarCard extends BaseElement<"div"> {
  public car: BaseElement<"div">;
  private id: number;
  private name: string;
  private color: string;
  private carImage: BaseSVGElement;

  constructor(id: number, name: string, color: string) {
    super({ tag: "div", classNames: [styles["card"]] });
    this.id = id;
    this.name = name;
    this.color = color;
    this.car = new BaseElement({
      tag: "div",
      classNames: [styles["car"]],
    });
    this.carImage = new BaseSVGElement({
      href: "/sprite.svg#auto",
      attributes: { width: "100", height: "50" },
    });
    this.render();
  }

  public changeCarColor(color: string) {
    this.carImage.node.setAttribute("fill", color);
  }

  private render() {
    const carName = new BaseElement<"h3">({
      tag: "h3",
      text: this.name,
      classNames: [styles.title],
    });

    this.changeCarColor(this.color);

    const selectButton = new Button({
      text: "Select",
      classNames: [styles.select],
      callback: () => {
        const carSelectedEvent = new CustomEvent<Car>("carSelected", {
          detail: { id: this.id, name: this.name, color: this.color },
          bubbles: true,
        });

        this.node.dispatchEvent(carSelectedEvent);
      },
    });

    this.car.appendChildren(this.carImage);

    const removeButton = new Button({
      text: "Remove",
      classNames: [styles.delete],
      callback: () => {
        const carRemovedEvent = new CustomEvent<Id>("carRemoved", {
          detail: { id: this.id },
          bubbles: true,
        });

        this.node.dispatchEvent(carRemovedEvent);
      },
    });

    const moveButton = new Button({
      classNames: [styles.start],
      text: "Start",
      callback: () => {
        const carMoveStartedEvent = new CustomEvent<CarEngineOptions>(
          "carMoveStarted",
          {
            detail: { id: this.id, status: "started" },
            bubbles: true,
          },
        );
        this.node.dispatchEvent(carMoveStartedEvent);
      },
    });
    const backButton = new Button({
      classNames: [styles.reset],
      text: "B",
      callback: () => {
        console.log("Remove");
      },
    });

    const flag = new BaseSVGElement({
      classNames: [styles.flag],
      href: "/sprite.svg#flag",
      attributes: { width: "40", height: "40" },
    });

    this.appendChildren(
      selectButton,
      removeButton,
      carName,
      moveButton,
      backButton,
      this.car,
      flag,
    );
  }
}
