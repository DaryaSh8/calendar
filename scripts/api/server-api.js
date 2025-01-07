export class ServerApi {
  #url = "http://localhost:3000";

  saveNotes(note) {
    fetch(this.#url + "/notes", {
      method: "PUT",
      body: JSON.stringify(note),
    }).then((r) => true);
  }

  getNotes() {
    return fetch(this.#url + "/notes").then((r) => r.json());
  }
}
