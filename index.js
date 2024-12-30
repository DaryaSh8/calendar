//CALENDAR

const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const notes = {};

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
const saveNoteButton = document.getElementById("btn-save-note");
const noteElement = document.getElementById("note");

let chosenDate = new Date();

chosenDate.setHours(0, 0, 0, 0);

let nowDate = getDatesString(chosenDate);

dateInNote.textContent = nowDate;

const renderDaysOfWeek = (arr) => {
  for (const day of arr) {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;

    containerDaysOfWeek.appendChild(dayElement);
  }
};

renderDaysOfWeek(daysOfWeek);

function getDatesString(date) {
  return date.toLocaleDateString();
}

function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function renderDaysOfMonth(day) {
  containerDaysOfMonth.textContent = "";
  const arrOfDays = [];

  const firstDayOfMonth = new Date(
    chosenDate.getFullYear(),
    chosenDate.getMonth(),
    1,
  ).getDay();

  const offsetDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  console.log(firstDayOfMonth, offsetDays);

  for (let i = 0; i < offsetDays; i++) {
    const dayOfMonth = document.createElement("div");
    arrOfDays.push(dayOfMonth);
  }

  const date = new Date(chosenDate);

  for (let i = 1; i <= day; i++) {
    const dayOfMonth = document.createElement("div");

    date.setDate(i);

    const dateString = getDatesString(date);

    if (nowDate === dateString) {
      dayOfMonth.classList.add("now-day");
    }

    if (notes[dateString]) {
      dayOfMonth.classList.add("has-note");
    }
    dayOfMonth.addEventListener("click", (e) => selectDay(e, dateString));
    dayOfMonth.textContent = i;
    arrOfDays.push(dayOfMonth);
  }

  containerDaysOfMonth.append(...arrOfDays);
}

function selectDay(e, date) {
  document.querySelector(".current-day")?.classList.remove("current-day");
  e.target.classList.add("current-day");

  noteElement.value = notes[date] || "";
  dateInNote.textContent = date;
  chosenDate = new Date(date);
}

let lastDay = getLastDayOfMonth(
  chosenDate.getFullYear(),
  chosenDate.getMonth(),
);
renderDaysOfMonth(lastDay);

function renderCurrentData() {
  dateNow.textContent =
    months[chosenDate.getMonth()] + " " + chosenDate.getFullYear();
}

function prevDate() {
  let currentYear = chosenDate.getFullYear();
  let currentMonth = chosenDate.getMonth();

  if (currentMonth === 0) {
    currentYear--;
    currentMonth = 11;
  } else {
    currentMonth--;
  }

  chosenDate.setFullYear(currentYear);
  chosenDate.setMonth(currentMonth);

  renderCurrentData();
  renderDaysOfMonth(getLastDayOfMonth(chosenDate.getFullYear(), currentMonth));
}
function nextDate() {
  let currentYear = chosenDate.getFullYear();
  let currentMonth = chosenDate.getMonth();

  if (currentMonth === 11) {
    currentYear++;
    currentMonth = 0;
  } else {
    currentMonth++;
  }

  chosenDate.setFullYear(currentYear);
  chosenDate.setMonth(currentMonth);

  renderCurrentData();
  renderDaysOfMonth(getLastDayOfMonth(chosenDate.getFullYear(), currentMonth));
}

function saveNote(value) {
  notes[getDatesString(chosenDate)] = value;
  renderDaysOfMonth(
    getLastDayOfMonth(chosenDate.getFullYear(), chosenDate.getMonth()),
  );
}

prevButton.addEventListener("click", prevDate);
nextButton.addEventListener("click", nextDate);
saveNoteButton.addEventListener("click", () => saveNote(noteElement.value));

renderCurrentData();
