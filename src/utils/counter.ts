import { DEFAULT_ID } from "../constants/numbers";

export interface Counter {
  next: () => number;
  reset: () => void;
}

function createCounter(): Counter {
  let count = DEFAULT_ID;

  return {
    next: (): number => {
      return count++;
    },
    reset: (): void => {
      count = DEFAULT_ID;
    },
  };
}

export const counter = createCounter();
