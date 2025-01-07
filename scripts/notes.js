import { getDatesString } from "./utils.js";
import { renderDays } from "./calendar.js";
import { nowDate } from "./month-switcher.js";
import { chosenDate } from "./state.js";

export const notes = JSON.parse(localStorage.getItem("notes") || "{}");
const dateInNote = document.getElementById("date-note");
const saveNoteButton = document.getElementById("btn-save-note");
const noteElement = document.getElementById("note");

renderNotes();

saveNoteButton.addEventListener("click", () => saveNote(noteElement.value));

export function renderNotes() {
  const dateStr = getDatesString(chosenDate);

  noteElement.value = notes[dateStr] || "";
  dateInNote.textContent = dateStr;
}

export function saveNote(value) {
  notes[getDatesString(chosenDate)] = value;
  localStorage.setItem("notes", JSON.stringify(notes));

  renderDays();
}
