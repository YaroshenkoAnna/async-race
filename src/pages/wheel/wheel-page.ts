import styles from "./wheel-page.module.scss";
import { BaseElement } from "../../utils/base-element";
import { title } from "../../components/title/title";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { DEFAULT_TIME, MAX_TIME } from "../../constants/numbers";
import { debounce } from "../../utils/debounce";
import { appStore } from "../../store/app-store";

export class WheelPage extends BaseElement<"main"> {
  private victorySound: HTMLAudioElement = new Audio(
    "src/assets/audio/victory.mp3",
  );
  constructor() {
    super({ tag: "main", classNames: [styles["wheel-page"]] });

    appStore.registerSound(this.victorySound);

    const backButton = new Button({
      text: "Back to Options",
      callback: (): void => {
        globalThis.location.hash = "/";
      },
      classNames: [styles.back],
    });

    const soundButton = new Button({
      text: appStore.soundDisabled.value ? "Sound: Off" : "Sound: On",
      callback: (): void => {
        appStore.toggleSound();
      },
      classNames: [styles.sound],
    });

    appStore.soundDisabled.subscribe((disabled) => {
      soundButton.setText(disabled ? "Sound: Off" : "Sound: On");
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
        this.victorySound.play().catch((error) => {
          console.error("Failed to play victory sound:", error);
        });
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
