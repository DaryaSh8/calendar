//CALENDAR

const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const containerDaysOfWeek = document.getElementById("days-week");
const containerDaysOfMonth = document.getElementById("days-month");
const dateNow = document.getElementById("date-now");
const prevButton = document.getElementById("btn-prev-month");
const nextButton = document.getElementById("btn-next-month");
const dateInNote = document.getElementById("date-note");
const saveButton = document.getElementById("btn-save-note");

const renderDaysOfWeek = (arr) => {
  for (const day of arr) {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;

    containerDaysOfWeek.appendChild(dayElement);
  }
};

renderDaysOfWeek(daysOfWeek);

const now = new Date();
let currentYear = now.getFullYear();
let currentMonth = now.getMonth();
let currentDate = now.getDate();

let nowDate = getDatesString(currentDate, currentMonth, currentYear);
dateInNote.textContent = nowDate;

function getDatesString(d, m, y) {
  return `${d}-${m + 1}-${y}`;
}

function getLastDayOfMonth(year, month) {
  let num = new Date(year, month + 1, 0).getDate();
  return num;
}

function renderDaysOfMonth(day) {
  containerDaysOfMonth.textContent = "";
  const arrOfDays = [];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const offsetDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  console.log(firstDayOfMonth, offsetDays);

  for (let i = 0; i < offsetDays; i++) {
    const dayOfMonth = document.createElement("div");
    arrOfDays.push(dayOfMonth);
  }

  for (let i = 1; i <= day; i++) {
    const dayOfMonth = document.createElement("div");
    const date = getDatesString(i, currentMonth, currentYear);

    if (nowDate === date) {
      dayOfMonth.classList.add("now-day");
    }
    dayOfMonth.addEventListener("click", (e) => selectDay(e, date));
    dayOfMonth.textContent = i;
    arrOfDays.push(dayOfMonth);
  }

  containerDaysOfMonth.append(...arrOfDays);
}

function selectDay(e, date) {
  document.querySelector(".current-day")?.classList.remove("current-day");
  e.target.classList.add("current-day");

  dateInNote.textContent = date;
}

let lastDay = getLastDayOfMonth(currentYear, currentMonth);
renderDaysOfMonth(lastDay);

function renderCurrentData() {
  dateNow.textContent = months[currentMonth] + " " + currentYear;
}

function prevDate() {
  if (currentMonth === 0) {
    currentYear--;
    currentMonth = 11;
  } else {
    currentMonth--;
  }
  renderCurrentData();
  renderDaysOfMonth(getLastDayOfMonth(currentYear, currentMonth));
}
function nextDate() {
  if (currentMonth === 11) {
    currentYear++;
    currentMonth = 0;
  } else {
    currentMonth++;
  }
  renderCurrentData();
  renderDaysOfMonth(getLastDayOfMonth(currentYear, currentMonth));
}

prevButton.addEventListener("click", prevDate);
nextButton.addEventListener("click", nextDate);

renderCurrentData();
