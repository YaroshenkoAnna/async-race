import type { OptionData } from "../../types";
import { BaseElement } from "../../utils/base-element";
import { getRandomColor } from "../../utils/get-random-color";
import { shuffleArray } from "../../utils/shuffle-array";
import styles from "./wheel.module.scss";

export class Wheel extends BaseElement<"canvas"> {
  private context: CanvasRenderingContext2D;
  private options: OptionData[];
  private rotationAngle = 0;
  private isSpinning = false;
  private segmentColors: string[];
  private onSegmentChange?: (segmentTitle: string) => void;
  private lastSegmentIndex: number | null = null;

  constructor(
    options: OptionData[],
    onSegmentChange?: (segmentTitle: string) => void,
  ) {
    super({ tag: "canvas", classNames: [styles.wheel] });
    this.node.width = 500;
    this.node.height = 500;
    const context = this.node.getContext("2d");
    if (!context) {
      throw new Error("Failed to get 2D context");
    }
    this.onSegmentChange = onSegmentChange;
    this.options = shuffleArray(
      options.filter((option) => option.weight > 0 && option.title),
    );
    this.context = context;
    this.segmentColors = this.options.map(() => getRandomColor());
    this.clearCanvas();
    this.render();
  }

  public spinWheel(duration: number): void {
    if (this.isSpinning) return;
    this.isSpinning = true;
    const startRotation = this.rotationAngle;
    const startTime = performance.now();
    const targetRotation =
      startRotation + Math.PI * 2 * duration + Math.PI * 2 * Math.random();

    const easeInOutExpo = (x: number): number => {
      return x === 0
        ? 0
        : x === 1
          ? 1
          : x < 0.5
            ? Math.pow(2, 20 * x - 10) / 2
            : (2 - Math.pow(2, -20 * x + 10)) / 2;
    };

    const animate = (currentTime: number): void => {
      const elapsedTime = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsedTime / duration, 1);

      this.rotationAngle =
        startRotation +
        (targetRotation - startRotation) * easeInOutExpo(progress);

      this.render();
      if (progress < 1) {
        setTimeout(() => requestAnimationFrame(animate), 1000 / 35);
      } else {
        this.isSpinning = false;
      }
    };

    requestAnimationFrame(animate);
  }

  public render(): void {
    this.context.save();
    this.clearCanvas();
    this.context.translate(250, 250);
    this.context.rotate(this.rotationAngle);
    this.context.translate(-250, -250);

    this.drawSegments();
    this.drawCenter();
    this.context.restore();

    this.drawArrow();

    const segmentIndex = this.getSegmentIndexByArrow();

    if (segmentIndex !== null && segmentIndex !== this.lastSegmentIndex) {
      const segmentTitle = this.options[segmentIndex].title;
      if (this.onSegmentChange) {
        this.onSegmentChange(segmentTitle);
      }
      this.lastSegmentIndex = segmentIndex;
    }
  }

  private drawSegments(): void {
    const numberOfOptions = this.options.length;
    const commonOptionWeight = this.options.reduce(
      (accumulator, option) => accumulator + option.weight,
      0,
    );
    let lastEndAngle = 0;
    for (let index = 0; index < numberOfOptions; index++) {
      const startAngle = lastEndAngle;
      const endAngle =
        startAngle +
        ((2 * Math.PI) / commonOptionWeight) * this.options[index].weight;
      lastEndAngle = endAngle;
      this.context.beginPath();
      this.context.moveTo(250, 250);
      this.context.arc(250, 250, 200, startAngle, endAngle);
      this.context.lineTo(250, 250);
      this.context.fillStyle = this.segmentColors[index];
      this.context.fill();
      this.context.lineWidth = 1;
      this.context.strokeStyle = "rgb(0, 0, 0)";
      this.context.stroke();

      this.drawSegmentText(this.options[index].title, startAngle, endAngle);
    }
  }

  private drawCenter(): void {
    this.context.beginPath();
    this.context.arc(250, 250, 25, 0, 2 * Math.PI);
    this.context.fillStyle = "rgba(0, 92, 138)";
    this.context.fill();
    this.context.lineWidth = 1;
    this.context.strokeStyle = "rgb(0, 0, 0)";
    this.context.stroke();
    this.context.beginPath();
    this.context.arc(250, 250, 23, 0, 2 * Math.PI);
    this.context.lineWidth = 3;
    this.context.strokeStyle = "rgb(241, 212, 212)";
    this.context.stroke();
  }

  private drawSegmentText(
    text: string,
    startAngle: number,
    endAngle: number,
  ): void {
    const radius = 110;
    const angle = (startAngle + endAngle) / 2;
    const x = 250 + radius * Math.cos(angle);
    const y = 250 + radius * Math.sin(angle);
    const segmentHeight = ((endAngle - startAngle) * 200) / Math.PI;

    this.context.font = "16px Arial";
    this.context.fillStyle = "rgb(0, 0, 0)";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";

    const textMetrics = this.context.measureText(text);
    const textHeight =
      textMetrics.actualBoundingBoxAscent +
      textMetrics.actualBoundingBoxDescent;

    if (textHeight > segmentHeight) return;

    const maxWidth = 140;
    let truncatedText = text;
    while (this.context.measureText(truncatedText).width > maxWidth) {
      truncatedText = truncatedText.slice(0, -1);
    }
    if (truncatedText.length < text.length) {
      truncatedText += "...";
    }

    this.context.save();

    this.context.translate(x, y);
    this.context.rotate(angle);

    this.context.fillText(truncatedText, 0, 0);

    this.context.restore();
  }

  private clearCanvas(): void {
    this.context.clearRect(0, 0, this.node.width, this.node.height);
  }

  private drawArrow(): void {
    this.context.save();

    this.context.shadowColor = "rgba(0, 0, 0, 0.5)";
    this.context.shadowOffsetX = 2;
    this.context.shadowOffsetY = 2;
    this.context.beginPath();
    this.context.moveTo(250, 70);
    this.context.lineTo(240, 30);
    this.context.lineTo(260, 30);
    this.context.lineTo(250, 70);
    this.context.fillStyle = "rgb(186, 186, 186)";
    this.context.strokeStyle = "rgb(0, 0, 0)";
    this.context.fill();
    this.context.stroke();

    this.context.restore();
  }

  private getSegmentIndexByArrow(): number | null {
    let arrowAngle = Math.PI / 2 - this.rotationAngle + Math.PI;

    arrowAngle = (arrowAngle + 2 * Math.PI * 100) % (2 * Math.PI);
    if (arrowAngle < 0) arrowAngle += 2 * Math.PI;

    let lastEndAngle = 0;
    const totalWeight = this.options.reduce(
      (accumulator, option) => accumulator + option.weight,
      0,
    );

    for (let index = 0; index < this.options.length; index++) {
      const startAngle = lastEndAngle;
      const endAngle =
        startAngle + ((2 * Math.PI) / totalWeight) * this.options[index].weight;

      if (arrowAngle >= startAngle && arrowAngle <= endAngle) {
        return index;
      }

      lastEndAngle = endAngle;
    }

    return null;
  }
}
