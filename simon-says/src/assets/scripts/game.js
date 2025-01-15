import styles from "../styles/components/keyboard.module.css";
import controlsStyles from "../styles/components/statusAndControls.module.css";
import {
  InputDisplay,
  toggleRepeatNext,
  RepeatButton,
  RoundIndicator,
} from "./statusAndControls.js";
import { showModal } from "./modal.js";
import { playSound, sounds } from "./audio.js";

class Game {
  constructor() {
    this.difficulty = "easy";
    this.keyboardMap;
    this.sequence = [];
    this.isInputBlocked = true;
    this.keyboard;
    this.clickCounter = 0;
    this.enteredSymbols = "";
    this.round = 0;
    this.repeat = 0;
    this.isKeyPressed = false;
    this.activeButton = null;
    this.activeInputType = null;
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }

  setKeyboardMap(keyboardMap) {
    this.keyboardMap = keyboardMap;
  }

  initGame() {
    this.round = 1;
    RoundIndicator.setText(`Round: ${game.round}`);
    this.playSequence(this.generateSequence(2));
  }

  generateSequence(length) {
    this.repeat = 0;
    this.sequence = [];
    let maxNumber = this.keyboardMap.values.length;
    for (let i = 0; i < length; i++) {
      const randomNumber = getRandomInt(0, maxNumber);
      if (i > 0 && this.sequence[i - 1] === randomNumber) {
        i--;
      } else {
        this.sequence.push(randomNumber);
      }
    }
    return this.sequence;
  }

  playSequence(sequence) {
    InputDisplay.removeClasses([controlsStyles.wrong]);
    InputDisplay.setText("");
    this.clickCounter = 0;
    this.enteredSymbols = "";
    this.blockClicks();
    this.isInputBlocked = true;
    setTimeout(() => {
      sequence.forEach((num, index) => {
        setTimeout(() => {
          this.keyboardMap.keys[num].addClasses([styles.active]);
          setTimeout(() => {
            this.keyboardMap.keys[num].removeClasses([styles.active]);
          }, 600);
        }, index * 800);
      });
    }, 1500);
    const totalDuration = sequence.length * 800 + 1500;
    setTimeout(() => {
      this.unblockClicks();
      this.keyboard.removeClasses([controlsStyles.inactive]);
      this.isInputBlocked = false;
    }, totalDuration);
    console.log(sequence.map((n) => this.keyboardMap.values[n]));
  }

  repeatSequence() {
    if (this.repeat == 1) return;
    this.playSequence(this.sequence);
    this.repeat++;
  }

  blockClicks() {
    document.body.classList.add(controlsStyles.inactive);
  }

  unblockClicks() {
    document.body.classList.remove(controlsStyles.inactive);
  }

  checkSequence(event) {
    const isKeyboardEvent = event.type === "keydown" || event.type === "keyup";
    const isMouseEvent = event.type === "mousedown" || event.type === "mouseup";

    function isSymbolsInvalid() {
      if (
        (isKeyboardEvent && event.type === "keydown") ||
        (isKeyboardEvent && event.type === "keyup")
      ) {
        const key = event.code;
        if (!/^(Key[A-Z]|Digit[0-9])$/.test(key)) return true;
      }
    }
    if (
      this.isInputBlocked ||
      this.isKeyPressed ||
      isSymbolsInvalid() ||
      (this.activeInputType &&
        ((this.activeInputType === "keyboard" && isMouseEvent) ||
          (this.activeInputType === "mouse" && isKeyboardEvent)))
    ) {
      return;
    } else {
      this.activeInputType = isKeyboardEvent ? "keyboard" : "mouse";
      const regex = /(?<=Key|Digit)\w+/;
      let currentButton =
        this.keyboardMap.keys[this.sequence[this.clickCounter]];

      if (
        (isMouseEvent && event.type === "mousedown") ||
        (isKeyboardEvent &&
          this.keyboardMap.values.includes(event.code.match(regex)[0]))
      ) {
        this.isKeyPressed = true;
        this.clickCounter++;
        const symbol = isKeyboardEvent
          ? event.code.match(regex)[0]
          : event.target.textContent;
        this.enteredSymbols += symbol;
        InputDisplay.setText(this.enteredSymbols);

        const clickedButton = isMouseEvent
          ? event.target
          : document.getElementById(event.code.match(regex)[0]);
        clickedButton.classList.add(styles.active);
        if (
          symbol == currentButton.getText() &&
          this.clickCounter === this.sequence.length &&
          this.round === 5
        ) {
          clickedButton.classList.remove(styles.active);
        }

        const releaseHandler = (releaseEvent) => {
          const releaseType = releaseEvent.type;
          const isCorrectEvent =
            (isKeyboardEvent &&
              releaseType === "keyup" &&
              releaseEvent.code === event.code) ||
            (isMouseEvent && releaseType === "mouseup");

          if (isCorrectEvent) {
            this.activeInputType = null;
            clickedButton.classList.remove(styles.active);
            document.removeEventListener("mouseup", releaseHandler);
            releaseEvent.target.removeEventListener(
              releaseType,
              releaseHandler
            );
            this.isKeyPressed = false;
          }
        };

        if (isKeyboardEvent) {
          if (this.currentReleaseHandler) {
            window.removeEventListener("keyup", this.currentReleaseHandler);
          }
          this.currentReleaseHandler = releaseHandler.bind(this);
          window.addEventListener("keyup", this.currentReleaseHandler);
        } else if (isMouseEvent) {
          if (this.currentReleaseHandler) {
            document.removeEventListener("mouseup", this.currentReleaseHandler);
          }
          this.currentReleaseHandler = releaseHandler.bind(this);
          document.addEventListener("mouseup", this.currentReleaseHandler);
        }

        if (symbol !== currentButton.getText()) {
          InputDisplay.addClasses([controlsStyles.wrong]);
          playSound(sounds.lostSound);
          this.isInputBlocked = true;
          return;
        }
      }

      if (this.clickCounter === this.sequence.length) {
        this.isInputBlocked = true;
        playSound(sounds.winSound);
        if (this.round == 5) {
          RepeatButton.addClasses([controlsStyles.blocked]);
          RepeatButton.disabled;
          showModal();
          return;
        }
        toggleRepeatNext();
      }
    }
  }

  startNextRound() {
    this.round++;
    this.playSequence(this.generateSequence(this.round * 2));
    toggleRepeatNext();
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export const game = new Game();
