import { nanoid } from "nanoid";
import { getInitialData } from "../fixtures/notesDummy";
import { filterByPattern } from "../utils/fuzzyMatch";
import { INoteModel, Note } from "./notes";

const maxWord = 10;

class NoteModelV1 implements INoteModel {
  notes: Note[] = getInitialData();
  getAllNotes: INoteModel["getAllNotes"] = (archived) => {
    return this.notes
      .filter(({ archived: isArchived }) => isArchived === archived)
      .map(({ id, title, body: noteBody = "", createdAt, updatedAt }) => {
        const words: string[] = noteBody.split(" ");
        const body = `${words.slice(0, maxWord).join(" ")}${words.length > maxWord ? "..." : ""}`;
        return {
          id,
          title,
          body,
          createdAt,
          updatedAt,
        };
      });
  };

  getNotesById: INoteModel["getNotesById"] = (id) => {
    return this.notes.filter((note) => note.id === id)[0];
  };

  getNotesByContent: INoteModel["getNotesByContent"] = (archived, content) => {
    return this.notes
      .filter(
        (note) =>
          note.archived === archived &&
          (filterByPattern(content, note.title, 0.05) ||
            filterByPattern(content, note.body || "", 0.05)),
      )
      .map(({ id, title, body: noteBody = "", createdAt, updatedAt }) => {
        const words: string[] = noteBody.split(" ");
        const body = `${words.slice(0, maxWord).join(" ")}${words.length > maxWord ? "..." : ""}`;
        return {
          id,
          title,
          body,
          createdAt,
          updatedAt,
        };
      });
  };

  addNote: INoteModel["addNote"] = (note) => {
    const length = this.notes.length;
    const id = nanoid(16);
    const timestamp = new Date();
    const newNote: Note = {
      id,
      createdAt: timestamp,
      updatedAt: timestamp,
      ...note,
    };

    if (this.notes.push(newNote) === length + 1) {
      return id;
    }
  };

  deleteNoteById: INoteModel["deleteNoteById"] = (id) => {
    const index = this.notes.findIndex((note) => note.id === id);

    if (index === -1) {
      return false;
    }

    return this.notes.splice(index, 1)[0].id === id;
  };

  changeNoteById = (
    id: Note["id"],
    data: Omit<Note, "id" | "createdAt" | "updatedAt">,
  ): boolean => {
    const index = this.notes.findIndex((note) => note.id === id);

    if (index === -1) {
      return false;
    }

    this.notes[index] = {
      ...this.notes[index],
      ...data,
    };

    return true;
  };
}

export default NoteModelV1;
