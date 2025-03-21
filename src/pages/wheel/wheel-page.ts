import styles from "./wheel-page.module.scss";
import { BaseElement } from "../../utils/base-element";
import { Title } from "../../components/title/title";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { DEFAULT_TIME, MIN_TIME } from "../../constants/numbers";
import { appStore } from "../../store/app-store";
import { optionStore } from "../../store/option-store";
import { Wheel } from "../../components/wheel/wheel";
import { areValidateNumbers } from "../../utils/is-valid-number";

export class WheelPage extends BaseElement<"main"> {
  private victorySound: HTMLAudioElement = new Audio("victory.mp3");
  private interactiveElements: Array<
    BaseElement<"button"> | BaseElement<"input"> | BaseElement<"div">
  > = [];
  private spinTimeout: ReturnType<typeof setTimeout> | undefined;

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
      attributes: { min: MIN_TIME.toString() },
      id: "Time",
      classNames: [styles.time],
    });
    timeInput.setValue(DEFAULT_TIME.toString());

    const resultContainer = new BaseElement<"div">({
      tag: "div",
      classNames: [styles["result-container"]],
    });

    const result = new BaseElement<"p">({
      tag: "p",
      classNames: [styles["wheel-result"]],
    });

    resultContainer.appendChildren(result);

    const wheel = new Wheel(optionStore.value, (segmentTitle: string) => {
      result.setText(`${segmentTitle}`);
    });

    result.setText("press start to spin the wheel");

    const startButton = new Button({
      text: "Start",
      callback: (): void => {
        const selectedTime = Number(timeInput.getValue());
        if (!areValidateNumbers(selectedTime, timeInput.node, MIN_TIME)) {
          return;
        }
        this.disable();
        resultContainer.removeClasses([styles.picked]);
        wheel.spinWheel(Number(timeInput.getValue()));
        this.spinTimeout = setTimeout(() => {
          this.enable();
          resultContainer.addClasses([styles.picked]);
          this.victorySound.play().catch((error) => {
            console.error("Failed to play victory sound:", error);
          });
        }, selectedTime * 1000);
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

    this.appendChildren(
      new Title(),
      backButton,
      soundButton,
      container,
      startButton,
      resultContainer,
      wheel,
    );
    this.interactiveElements = [
      timeInput,
      startButton,
      backButton,
      soundButton,
      container,
    ];
  }

  public override deleteElement(): void {
    super.deleteElement();
    clearTimeout(this.spinTimeout);
    this.victorySound.pause();
    this.victorySound.currentTime = 0;
  }

  private disable(): void {
    this.interactiveElements.forEach((element) => {
      element.setAttributes({ disabled: "true" });
      element.addClasses([styles.disabled]);
    });
  }

  private enable(): void {
    this.interactiveElements.forEach((element) => {
      element.removeAttribute("disabled");
      element.removeClasses([styles.disabled]);
    });
  }
}
