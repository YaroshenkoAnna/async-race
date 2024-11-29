//calculation of time until the new year by time zone UTC + 0

export function timer() {
  const newYear2025 = Date.UTC(2024, 11, 31, 23, 59, 59);

  const countdownTimer = setInterval(function () {
    const now = new Date().getTime();
    const restTime = newYear2025 - now;

    const days = Math.floor(restTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (restTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((restTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((restTime % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

    // stop Timer
    if (restTime < 0) {
      clearInterval(countdownTimer);
    }
  }, 1000);
}
