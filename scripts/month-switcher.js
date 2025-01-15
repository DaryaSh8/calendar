import { renderDays } from "./calendar.js";
import { monthes } from "./constants.js";
import { effect } from "./signals.js";
import { chosenDate } from "./state.js";

const dateNowElement = document.getElementById("date-now");
const prevButtonElement = document.getElementById("btn-prev-month");
const nextButtonElement = document.getElementById("btn-next-month");

let abortController = new AbortController();

export function initMonthSwitcher() {
  abortController.abort();
  abortController = new AbortController();

  effect(() => {
    const date = chosenDate();

    dateNowElement.textContent =
      monthes[date.getMonth()] + " " + date.getFullYear();
  });

  prevButtonElement.addEventListener("click", () => setMonth(-1), {
    signal: abortController.signal,
  });
  nextButtonElement.addEventListener("click", () => setMonth(1), {
    signal: abortController.signal,
  });
}

function setMonth(value) {
  const date = chosenDate();

  date.setMonth(date.getMonth() + value);
  chosenDate.set(date);

  renderDays();
}
