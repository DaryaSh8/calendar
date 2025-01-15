import { renderDays } from "./calendar.js";
import { api } from "./api/api.js";
import { chosenDateString, notes } from "./state.js";
import { effect } from "./signals.js";

const dateInNoteElement = document.getElementById("date-note");
const saveNoteButtonElement = document.getElementById("btn-save-note");
const noteElementElement = document.getElementById("note");

let abortController = new AbortController();

export function initNotes() {
  abortController.abort();
  abortController = new AbortController();

  api
    .getNotes()
    .catch(() => ({}))
    .then((r) => notes.set(r));

  effect(() => {
    renderNotes();
  });

  saveNoteButtonElement.addEventListener(
    "click",
    () => saveNote(noteElementElement.value),
    {
      signal: abortController.signal,
    },
  );
}

export function renderNotes() {
  const dateStr = chosenDateString();

  noteElementElement.value = notes()[dateStr] || "";
  dateInNoteElement.textContent = dateStr;
}

export function saveNote(value) {
  notes.set(notes());
  notes.update((prevNotes) => {
    prevNotes[chosenDateString()] = value;
    return prevNotes;
  });
  api.saveNotes(notes());
  renderDays();
}
