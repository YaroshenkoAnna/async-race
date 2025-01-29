import { BaseElement } from "./baseElement.js";
import styles from "../styles/timer.module.scss";
import { formatTime } from "../utils/formatTime.js";

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

      this.setText(formatTime(this.difference));
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
    return this.difference;
  }

  setTime(time) {
    this.setText(formatTime(time));
  }
}
