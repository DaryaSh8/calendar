export class LocaleStorageApi {
  saveNotes(note) {
    return new Promise((resolve) => {
      localStorage.setItem("notes", JSON.stringify(note));
      resolve(true);
    });
  }

  getNotes() {
    return Promise.resolve(JSON.parse(localStorage.getItem("notes") || "{}"));
  }
}
