import type { Car, Id } from "../../types/types";
import { BaseElement } from "../../utils/base-element";
import { BaseSVGElement } from "../../utils/base-svg-element";
import { Button } from "../button/button";
import styles from "./car-card.module.scss";

export class CarCard extends BaseElement<"div"> {
  public car: BaseElement<"div">;
  public id: number;
  public buttons: Button[];
  public startButton: Button;
  public backButton: Button;
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
      href: "./sprite.svg#auto",
      attributes: { width: "100", height: "50" },
    });
    this.buttons = [];

    this.startButton = new Button({
      classNames: [styles.start],
      text: "A",
      callback: () => {
        const event = new CustomEvent<Id>("carMoveStarted", {
          detail: { id: this.id },
          bubbles: true,
        });
        this.backButton.enable();
        this.startButton.disable();
        this.node.dispatchEvent(event);
      },
    });

    this.backButton = new Button({
      classNames: [styles.reset],
      text: "B",
      callback: () => {
        const event = new CustomEvent<Id>("carMoveReset", {
          detail: { id: this.id },
          bubbles: true,
        });
        this.startButton.enable();
        this.backButton.disable();
        this.node.dispatchEvent(event);
      },
    });

    this.backButton.disable();

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

    const flag = new BaseSVGElement({
      classNames: [styles.flag],
      href: "./sprite.svg#flag",
      attributes: { width: "40", height: "40" },
    });

    this.buttons.push(
      selectButton,
      removeButton,
      this.startButton,
      this.backButton,
    );

    this.appendChildren(
      selectButton,
      removeButton,
      carName,
      this.startButton,
      this.backButton,
      this.car,
      flag,
    );
  }
}
