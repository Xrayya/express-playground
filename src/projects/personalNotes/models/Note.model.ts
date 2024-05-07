import { nanoid } from "nanoid";
import { getInitialData } from "../fixtures/notesDummy";
import { filterByPattern } from "../utils/fuzzyMatch";

export interface Note {
  id: string;
  title: string;
  body: string;
  archived: boolean;
  createdAt: Date;
}

const notes = getInitialData();

export const getAllNotes = () => {
  return notes;
};

export const getNotesById = (id: Note["id"]) => {
  return notes.filter((note) => note.id === id)[0];
};

export const getNotesByContent = (content: string) => {
  return notes.filter(
    (note) =>
      filterByPattern(content, note.title, 0.05) ||
      filterByPattern(content, note.body, 0.05),
  );
};

export const addNotes = (note: Omit<Note, "id">) => {
  const length = notes.length;
  const newNote = {
    id: nanoid(16),
    ...note,
  };
  return notes.push(newNote) === length + 1;
};

export const deleteNoteById = (id: Note["id"]) => {
  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return false;
  }

  return notes.splice(index, 1)[0].id === id;
};
