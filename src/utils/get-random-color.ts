import { getRandomNumber } from "./get-random-number";

export function getRandomColor(): string {
  const arrayRandomNumbers: number[] = [];
  for (let index = 0; index < 3; index++) {
    arrayRandomNumbers.push(getRandomNumber(100, 255)); // pick a number between 100 and 255 to avoid dark colors from falling out
  }
  const [r, g, b] = arrayRandomNumbers;
  return `rgb(${r}, ${g}, ${b})`;
}
