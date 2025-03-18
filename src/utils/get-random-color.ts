import { getRandomNumber } from "./get-random-number";

export function getRandomColor(): string {
  const arrayRandomNumbers: number[] = [];
  for (let index = 0; index < 3; index++) {
    arrayRandomNumbers.push(getRandomNumber(0, 255));
  }
  const [r, g, b] = arrayRandomNumbers;
  return `rgb(${r}, ${g}, ${b})`;
}
