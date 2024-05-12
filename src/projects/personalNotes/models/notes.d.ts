export type Note = {
  id: string;
  title: string;
  body?: string;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface INoteModel {
  getAllNotes: (archived: boolean) => Omit<Note, "archived">[];
  getNotesById: (id: Note["id"]) => Note;
  getNotesByContent: (
    archived: boolean,
    content: string,
  ) => Omit<Note, "archived">[];
  addNote: (
    note: Omit<Note, "id" | "createdAt" | "updatedAt">,
  ) => string | undefined;
  deleteNoteById: (id: Note["id"]) => boolean;
  changeNoteById: (
    id: Note["id"],
    data: Omit<Note, "id" | "createdAt" | "updatedAt">,
  ) => boolean;
}
