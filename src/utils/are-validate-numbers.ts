export function areValidateNumbers(
  time: number,
  timeInput: HTMLInputElement,
  min: number,
  max: number,
): boolean {
  if (time < min) {
    timeInput.setCustomValidity(`Duration must be at least ${min} seconds`);
  } else if (time > max) {
    timeInput.setCustomValidity(`Duration must be at most ${max} seconds`);
  } else {
    timeInput.setCustomValidity("");
    return true;
  }
  timeInput.reportValidity();
  return false;
}
