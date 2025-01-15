import { getDatesString, getLastDayOfMonth } from "./utils.js";
import {
  chosenDate,
  chosenDateLastDay,
  chosenDateStartDay,
  notes,
  nowDate,
} from "./state.js";
import { daysCount, daysOfWeek } from "./constants.js";
import { effect } from "./signals.js";

const containerDaysOfWeekElement = document.getElementById("days-week");
const containerDaysOfMonthElement = document.getElementById("days-month");

let abortController = new AbortController();

export function renderDaysOfWeek(arr) {
  for (const day of arr) {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;

    containerDaysOfWeekElement.appendChild(dayElement);
  }
}

export function initDaysOfMonth() {
  abortController.abort();
  abortController = new AbortController();

  const days = [];
  for (let i = 0; i < daysCount; i++) {
    const dayElement = document.createElement("div");
    days.push(dayElement);
    dayElement.addEventListener("click", () => selectDay(i), {
      signal: abortController.signal,
    });
  }

  containerDaysOfMonthElement.append(...days);

  renderDaysOfWeek(daysOfWeek);

  effect(() => {
    renderDays();
  });
}

export function selectDay(i) {
  const offsetDays = chosenDateStartDay();
  if (i < offsetDays || i >= getLastDayOfMonth(chosenDate()) + offsetDays)
    return;

  const date = i - offsetDays + 1;
  chosenDate.update((d) => {
    d.setDate(date);
    return d;
  });
  const child = containerDaysOfMonthElement.childNodes[i];
  containerDaysOfMonthElement
    .querySelector(".current-day")
    ?.classList.remove("current-day");
  child.classList.add("current-day");
}

export function renderDays() {
  const startDay = chosenDateStartDay();
  const daysInMonth = chosenDateLastDay();
  const date = new Date(chosenDate());
  const note = notes();

  for (let i = 0; i < daysCount; i++) {
    const child = containerDaysOfMonthElement.childNodes[i];

    child.textContent = "";
    child?.classList.remove("has-note");

    if (i >= startDay && i < daysInMonth + startDay) {
      date.setDate(i - startDay + 1);
      child.textContent = `${i + 1 - startDay}`;

      const dateString = getDatesString(date);

      if (note[dateString]) {
        child?.classList.add("has-note");
      }
      if (nowDate === dateString) {
        child.classList.add("now-day");
      }
    }
  }
}
