export function areValidateNumbers(
  time: number,
  timeInput: HTMLInputElement,
  min: number,
): boolean {
  if (time < min) {
    timeInput.setCustomValidity(`Duration must be at least ${min} seconds`);
    timeInput.reportValidity();
    return false;
  } else {
    timeInput.setCustomValidity("");
    return true;
  }
}
