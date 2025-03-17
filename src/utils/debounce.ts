export function debounce<
  T extends (...items: unknown[]) => void | Promise<void>,
>(function_: T, delay: number): (...items: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...items: Parameters<T>): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      void function_(...items);
    }, delay);
  };
}
