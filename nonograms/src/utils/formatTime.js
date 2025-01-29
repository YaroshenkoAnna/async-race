export function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000) % 60;
  const minutes = Math.floor(milliseconds / 60000);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
