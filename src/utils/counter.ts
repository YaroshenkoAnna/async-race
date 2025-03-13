export interface Counter {
  next: () => number;
  reset: () => void;
}

function createCounter(): Counter {
  let count = 0;

  return {
    next: (): number => {
      count += 1;
      return count;
    },
    reset: (): void => {
      count = 0;
    },
  };
}

export const counter = createCounter();
