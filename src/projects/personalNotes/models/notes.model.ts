import { nanoid } from "nanoid";
import { getInitialData } from "../fixtures/notesDummy";
import { filterByPattern } from "../utils/fuzzyMatch";

export interface Note {
  id: string;
  title: string;
  body?: string;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notes = getInitialData();

export const getAllNotes = (archived: boolean) => {
  return notes
    .filter(({ archived: isArchived }) => isArchived === archived)
    .map(({ id, title, body = "", createdAt, updatedAt }) => {
      return {
        id,
        title,
        body,
        createdAt,
        updatedAt,
      };
    });
};

export const getNotesById = (id: Note["id"]) => {
  return notes.filter((note) => note.id === id);
};

export const getNotesByContent = (content: string) => {
  return notes.filter(
    (note) =>
      filterByPattern(content, note.title, 0.05) ||
      filterByPattern(content, note.body || "", 0.05),
  );
};

export const addNotes = (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">,
) => {
  const length = notes.length;
  const timestamp = new Date();
  const newNote: Note = {
    id: nanoid(16),
    createdAt: timestamp,
    updatedAt: timestamp,
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

export const changeNoteById = (id: Note["id"], newData: Omit<Note, "id">) => {
  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return false;
  }

  notes[index] = {
    ...notes[index],
    ...newData,
  };

  return true;
};
