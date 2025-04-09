import { BaseElement } from "../../utils/base-element";
import { Button } from "../button/button";
import styles from "./controls.module.scss";

export class Controls extends BaseElement<"div"> {
  private raceButton: Button;
  private resetButton: Button;
  private generateButton: Button;

  constructor(options: {
    onRace: () => void;
    onReset: () => void;
    onGenerate: () => void;
  }) {
    super({ tag: "div", classNames: [styles.controls] });

    this.raceButton = new Button({ text: "Race", callback: options.onRace });
    this.resetButton = new Button({ text: "Reset", callback: options.onReset });
    this.resetButton.disable();

    this.generateButton = new Button({
      text: "Generate cars",
      callback: options.onGenerate,
    });
    this.appendChildren(this.raceButton, this.resetButton, this.generateButton);
  }

  public disable(): void {
    this.raceButton.disable();
    this.generateButton.disable();
    this.resetButton.disable();
  }

  public enable(): void {
    this.raceButton.enable();
    this.generateButton.enable();
    this.resetButton.enable();
  }

  public setResetEnabled(enabled: boolean): void {
    if (enabled) {
      this.resetButton.enable();
    } else {
      this.resetButton.disable();
    }
  }
}
