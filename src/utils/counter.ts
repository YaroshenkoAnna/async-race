function createCounter() {
  let count: number = 0;

  return function (): number {
    return (count += 1);
  };
}

export const counter = createCounter();
