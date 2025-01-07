import { getDatesString } from "./utils.js";
import { renderDays } from "./calendar.js";
import { chosenDate } from "./state.js";
import { api } from "./api/api.js";

export const notes = await api.getNotes().catch(() => ({}));
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
  api.saveNotes(notes);

  renderDays();
}
