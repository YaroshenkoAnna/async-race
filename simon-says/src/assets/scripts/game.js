import styles from "../styles/components/keyboard.module.css";

class Game {
  constructor() {
    this.difficulty = "easy";
    this.keyboardMap;
    this.sequence = [];
    this.isSequencePlay = false;
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }

  setKeyboardMap(keyboardMap) {
    this.keyboardMap = keyboardMap;
  }

  initGame() {
    this.playSequence(this.generateSequence(2));
  }

  generateSequence(length) {
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
    this.isSequencePlay = true;
    //blockInput();
    //blockButtons();
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
      this.isSequencePlay = false;
    }, totalDuration);
    console.log(sequence);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export const game = new Game();
