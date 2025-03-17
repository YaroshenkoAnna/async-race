import styles from "./wheel-page.module.scss";
import { BaseElement } from "../../utils/base-element";
import { title } from "../../components/title/title";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { DEFAULT_TIME, MAX_TIME } from "../../constants/numbers";
import { debounce } from "../../utils/debounce";

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
      attributes: { min: "0", max: "30" },
      id: "Time",
      classNames: [styles.time],
    });
    timeInput.setValue(DEFAULT_TIME.toString());
    timeInput.addListener(
      "input",
      debounce((event) => {
        const inputEvent = event as InputEvent;
        const target = inputEvent.target as HTMLInputElement;
        const value = Number(target.value);

        if (value < DEFAULT_TIME) {
          timeInput.setValue(DEFAULT_TIME.toString());
        } else if (value > MAX_TIME) {
          timeInput.setValue(MAX_TIME.toString());
        }
      }, 1000),
    );

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
