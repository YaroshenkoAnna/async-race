import type { OptionData } from "../../types";
import { BaseElement } from "../../utils/base-element";
import { getRandomColor } from "../../utils/get-random-color";
import styles from "./wheel.module.scss";

export class Wheel extends BaseElement<"canvas"> {
  private context: CanvasRenderingContext2D;
  private options: OptionData[];
  constructor(options: OptionData[]) {
    super({ tag: "canvas", classNames: [styles.wheel] });
    this.node.width = 500;
    this.node.height = 500;
    const context = this.node.getContext("2d");
    if (!context) {
      throw new Error("Failed to get 2D context");
    }
    this.options = options.filter(
      (option) => option.weight > 0 && option.title,
    );
    this.context = context;
    this.render();
  }

  public render(): void {
    this.drawArcs();
    /* if (this.context) {
      this.context.beginPath();
      this.context.arc(250, 250, 200, 0, 2 * Math.PI);
      this.context.fillStyle = "red";
      this.context.fill();
    } */
  }

  private drawArcs(): void {
    const numberOfOptions = this.options.length;
    const commonOptionWeight = this.options.reduce(
      (accumulator, option) => accumulator + option.weight,
      0,
    );
    let lastEndAngle = 0;
    for (let index = 0; index < numberOfOptions; index++) {
      const startAngle = lastEndAngle;
      console.log("Begin", lastEndAngle);
      const endAngle =
        startAngle +
        ((2 * Math.PI) / commonOptionWeight) * this.options[index].weight;
      lastEndAngle = endAngle;
      console.log("End", lastEndAngle);
      this.context.beginPath();
      this.context.moveTo(250, 250);
      this.context.arc(250, 250, 200, startAngle, endAngle);
      this.context.lineTo(250, 250);
      this.context.fillStyle = getRandomColor();
      this.context.fill();
    }
  }
}
