import styles from "./wheel-page.module.scss";
import { BaseElement } from "../../utils/base-element";
import { title } from "../../components/title/title";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";

export class WheelPage extends BaseElement<"main"> {
  constructor() {
    super({ tag: "main", classNames: [styles["wheel-page"]] });

    const backButton = new Button({
      text: "Options",
      callback: (): void => {
        globalThis.location.hash = "/";
      },
    });

    const soundButton = new Button({
      text: "Sound",
      callback: (): void => {
        console.log("Sound");
      },
    });

    const timeInput = new Input({
      type: "number",
      name: "time",
      attributes: { placeholder: "Time", min: "0", max: "16" },
      id: "Time",
    });
    timeInput.setValue("5");

    const startButton = new Button({
      text: "Start",
      callback: (): void => {
        console.log("Start");
      },
    });
    const span = new BaseElement<"span">({
      tag: "span",
      text: "Time",
    });

    this.appendChildren(
      title,
      backButton,
      soundButton,
      span,
      timeInput,
      startButton,
    );
  }
}
