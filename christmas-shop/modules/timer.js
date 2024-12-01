//calculation of time until the new year by time zone UTC + 0

export function timer() {
  const countdownTimer = setInterval(function () {
    const currentYear = new Date().getFullYear();

    const newYear = Date.UTC(currentYear, 11, 31, 23, 59, 59);
    const now = new Date().getTime();
    const restTime = newYear - now;

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
