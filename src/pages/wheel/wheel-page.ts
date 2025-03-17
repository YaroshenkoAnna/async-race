import styles from "./wheel-page.module.scss";
import { BaseElement } from "../../utils/base-element";
import { title } from "../../components/title/title";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";

export class WheelPage extends BaseElement<"main"> {
  constructor() {
    super({ tag: "main", classNames: [styles["wheel-page"]] });

    const backButton = new Button({
      text: "Back to Options",
      callback: (): void => {
        globalThis.location.hash = "/";
      },
      classNames: [styles.back],
    });

    const soundButton = new Button({
      text: "Sound: On",
      callback: (): void => {
        console.log("Sound");
      },
      classNames: [styles.sound],
    });

    const timeInput = new Input({
      type: "number",
      name: "time",
      attributes: { placeholder: "Time", min: "0", max: "16" },
      id: "Time",
      classNames: [styles.time],
    });
    timeInput.setValue("5");

    const startButton = new Button({
      text: "Start",
      callback: (): void => {
        console.log("Start");
      },
      classNames: [styles.start],
    });
    const span = new BaseElement<"span">({
      tag: "span",
      text: "Time",
      classNames: [styles.span],
    });

    const container = new BaseElement<"div">({
      tag: "div",
      classNames: [styles.container],
    });

    container.appendChildren(span, timeInput);

    this.appendChildren(title, backButton, soundButton, container, startButton);
  }
}
