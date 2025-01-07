import { typeOfKeyboard } from "../keyboard/keyboard.js";
import { keyboards } from "../../data/keyboards.js";

export function generateSequence(length) {
  let maxNumber = keyboards[typeOfKeyboard].length;
  let sequence = [];
  for (let i = 0; i < length; i++) {
    const randomNumber = getRandomInt(0, maxNumber);
    if (i > 0 && sequence[i - 1] === randomNumber) {
      i--;
    } else {
      sequence.push(randomNumber);
    }
  }
  console.log(sequence);
  return sequence;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
