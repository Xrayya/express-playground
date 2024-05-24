export type Note = {
  id: string;
  title: string;
  body?: string;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface INoteModel {
  getAllNotes: (archived: boolean) => Promise<Omit<Note, "archived">[]>;
  getNotesById: (id: Note["id"]) => Promise<Note>;
  getNotesByContent: (
    archived: boolean,
    content: string,
  ) => Promise<Omit<Note, "archived">[]>;
  addNote: (
    note: Omit<Note, "id" | "createdAt" | "updatedAt">,
  ) => Promise<string | undefined>;
  deleteNoteById: (id: Note["id"]) => Promise<string>;
  changeNoteById: (
    id: Note["id"],
    data: Omit<Note, "id" | "createdAt" | "updatedAt">,
  ) => Promise<string>;
}
