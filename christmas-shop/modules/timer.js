export function timer() {
  const newYear2025 = new Date("December 31, 2024 23:59:59").getTime();

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

    //change words to singular form if the number is 1
    if (days === 1) {
      document.getElementById("days").nextElementSibling.textContent = "day";
    } else {
      document.getElementById("days").nextElementSibling.textContent = "days";
    }
    if (hours === 1) {
      document.getElementById("hours").nextElementSibling.textContent = "hour";
    } else {
      document.getElementById("hours").nextElementSibling.textContent = "hours";
    }
    if (minutes === 1) {
      document.getElementById("minutes").nextElementSibling.textContent =
        "minute";
    } else {
      document.getElementById("minutes").nextElementSibling.textContent =
        "minutes";
    }
    if (seconds === 1) {
      document.getElementById("seconds").nextElexmentSibling.textContent =
        "second";
    } else {
      document.getElementById("seconds").nextElementSibling.textContent =
        "seconds";
    }

    // stop Timer
    if (restTime < 0) {
      clearInterval(countdownTimer);
    }
  }, 1000);
}
