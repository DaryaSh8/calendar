import { getDatesString } from "./utils.js";
import { renderDays } from "./calendar.js";
import { chosenDate } from "./state.js";
import { monthes } from "./constants.js";

const dateNow = document.getElementById("date-now");
const prevButton = document.getElementById("btn-prev-month");
const nextButton = document.getElementById("btn-next-month");

export const nowDate = getDatesString(chosenDate);

prevButton.addEventListener("click", () => setMonth(-1));
nextButton.addEventListener("click", () => setMonth(1));

export function renderCurrentData() {
  dateNow.textContent =
    monthes[chosenDate.getMonth()] + " " + chosenDate.getFullYear();
}

export function setMonth(value) {
  chosenDate.setMonth(chosenDate.getMonth() + value);

  renderCurrentData();
  renderDays();
}
