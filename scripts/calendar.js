import { getDatesString, getLastDayOfMonth, getStartDay } from "./utils.js";
import { nowDate, renderCurrentData } from "./month-switcher.js";
import { notes, renderNotes } from "./notes.js";
import { chosenDate } from "./state.js";
import { daysCount, daysOfWeek } from "./constants.js";

const containerDaysOfWeek = document.getElementById("days-week");

const containerDaysOfMonth = document.getElementById("days-month");

export const renderDaysOfWeek = (arr) => {
  for (const day of arr) {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;

    containerDaysOfWeek.appendChild(dayElement);
  }
};

export function initDaysOfMonth() {
  const days = [];
  for (let i = 0; i < daysCount; i++) {
    const dayElement = document.createElement("div");
    days.push(dayElement);
    dayElement.addEventListener("click", () => selectDay(i));
  }

  containerDaysOfMonth.append(...days);

  renderDaysOfWeek(daysOfWeek);
  renderCurrentData();
  renderDays();
}

export function selectDay(i) {
  const offsetDays = getStartDay(chosenDate);
  if (i < offsetDays || i >= getLastDayOfMonth(chosenDate) + offsetDays) return;

  const date = i - offsetDays + 1;
  chosenDate.setDate(date);
  const child = containerDaysOfMonth.childNodes[i];
  containerDaysOfMonth
    .querySelector(".current-day")
    ?.classList.remove("current-day");
  child.classList.add("current-day");

  renderNotes();
}

export function renderDays() {
  const startDay = getStartDay(chosenDate);
  const daysInMonth = getLastDayOfMonth(chosenDate);
  const date = new Date(chosenDate);

  for (let i = 0; i < daysCount; i++) {
    const child = containerDaysOfMonth.childNodes[i];

    child.textContent = "";
    child?.classList.remove("has-note");

    if (i >= startDay && i < daysInMonth + startDay) {
      date.setDate(i - startDay + 1);
      child.textContent = `${i + 1 - startDay}`;

      const dateString = getDatesString(date);

      if (notes[dateString]) {
        child?.classList.add("has-note");
      }
      if (nowDate === dateString) {
        child.classList.add("now-day");
      }
    }
  }
}
