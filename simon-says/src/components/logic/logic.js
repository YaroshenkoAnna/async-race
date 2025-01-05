import { typeOfKeyboard } from "../keyboard/keyboard.js";
import { keyboards } from "../../data/keyboards.js";

export function generateSequence(length) {
  let maxNumber = keyboards[typeOfKeyboard].length;
  let sequence = [];
  for (let i = 0; i < length; i++) {
    sequence.push(keyboards[typeOfKeyboard][getRandomInt(0, maxNumber)]);
  }

  return sequence;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
