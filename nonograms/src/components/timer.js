import { BaseElement } from "./baseElement.js";
import styles from "../styles/timer.module.scss";

export class Timer extends BaseElement {
  constructor() {
    super({ tag: "div", text: "00:00", classes: [styles.timer] });
    this.timeInterval;
    this.difference;
  }

  start(pastTime) {
    const startTime = pastTime ? Date.now() - pastTime : Date.now();
    this.timeInterval = setInterval(() => {
      this.difference = Date.now() - startTime;
      const minutes = Math.floor(this.difference / (1000 * 60))
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor(this.difference / 1000 - minutes * 60)
        .toString()
        .padStart(2, "0");
      this.setText(`${minutes}:${seconds}`);
    }, 1000);
  }

  stop() {
    clearInterval(this.timeInterval);
  }

  reset() {
    this.stop();
    this.setText("00:00");
    this.difference = 0;
  }

  getCurrentTime() {
    return Math.round(this.difference / 1000);
  }
}
