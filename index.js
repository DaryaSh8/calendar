//CALENDAR
const daysCount = 42;

const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const notes = JSON.parse(localStorage.getItem("notes") || "{}");

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

initDaysOfMonth();
renderDaysOfWeek(daysOfWeek);

const renderDaysOfWeek = (arr) => {
  for (const day of arr) {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;

    containerDaysOfWeek.appendChild(dayElement);
  }
};

function getDatesString(date) {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

function getLastDayOfMonth() {
  return new Date(
    chosenDate.getFullYear(),
    chosenDate.getMonth() + 1,
    0,
  ).getDate();
}

function initDaysOfMonth() {
  const days = [];
  for (let i = 0; i < daysCount; i++) {
    const dayElement = document.createElement("div");
    days.push(dayElement);
    dayElement.addEventListener("click", () => selectDay(i));
  }

  containerDaysOfMonth.append(...days);

  renderDays();
}

function getStartDay() {
  const firstDayOfMonth = new Date(
    chosenDate.getFullYear(),
    chosenDate.getMonth(),
    1,
  ).getDay();
  return firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
}

function renderDays() {
  const startDay = getStartDay();
  const daysInMonth = getLastDayOfMonth();
  const date = new Date(chosenDate);

  for (let i = 0; i < daysCount; i++) {
    const child = containerDaysOfMonth.childNodes[i];

    child.textContent = "";

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

function selectDay(i) {
  const offsetDays = getStartDay();
  if (i < offsetDays || i >= getLastDayOfMonth() + offsetDays) return;

  const date = i - offsetDays + 1;
  chosenDate.setDate(date);
  const child = containerDaysOfMonth.childNodes[i];
  containerDaysOfMonth
    .querySelector(".current-day")
    ?.classList.remove("current-day");
  child.classList.add("current-day");

  renderNotes();
}

function renderNotes() {
  const dateStr = getDatesString(chosenDate);

  noteElement.value = notes[dateStr] || "";
  dateInNote.textContent = dateStr;
}

function renderCurrentData() {
  dateNow.textContent =
    months[chosenDate.getMonth()] + " " + chosenDate.getFullYear();
}

function setMonth(value) {
  return () => {
    chosenDate.setMonth(chosenDate.getMonth() + value);

    renderCurrentData();

    renderDays();
  };
}

const prevDate = setMonth(-1);
const nextDate = setMonth(1);

function saveNote(value) {
  notes[getDatesString(chosenDate)] = value;
  localStorage.setItem("notes", JSON.stringify(notes));

  renderDays();
}

prevButton.addEventListener("click", prevDate);
nextButton.addEventListener("click", nextDate);
saveNoteButton.addEventListener("click", () => saveNote(noteElement.value));

renderCurrentData();
