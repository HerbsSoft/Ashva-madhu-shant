document.addEventListener("DOMContentLoaded", function () {
  // current date
  const dateNodes = document.querySelectorAll(".js-current-date");
  if (dateNodes.length) {
    const now = new Date();
    const formatted = now.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    dateNodes.forEach(function (el) {
      el.textContent = formatted;
    });
  }

  // timer
  const timers = document.querySelectorAll(".timer");
  let totalSeconds = 10 * 60; // 10:00
  let timerStarted = false;
  let timerInterval = null;

  function renderTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const timeText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    timers.forEach(function (timer) {
      timer.textContent = timeText;
    });
  }

  function startLandingTimer() {
    if (timerStarted) return;
    timerStarted = true;

    renderTimer();

    timerInterval = setInterval(function () {
      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        totalSeconds = 0;
        renderTimer();
        return;
      }

      totalSeconds -= 1;
      renderTimer();
    }, 1000);
  }

  window.startLandingTimer = startLandingTimer;

  renderTimer();
});