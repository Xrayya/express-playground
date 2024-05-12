import { INoteModel, Note } from "./notes";

class NoteModelV2 implements INoteModel {
  getAllNotes: INoteModel["getAllNotes"] = (archived) => {
    return [];
  };

  getNotesById: INoteModel["getNotesById"] = (id) => {
    return {
      id: "",
      title: "",
      body: "",
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  getNotesByContent: INoteModel["getNotesByContent"] = (archived, content) => {
    return [];
  };

  addNote: INoteModel["addNote"] = (note) => {
    return "";
  };

  deleteNoteById: INoteModel["deleteNoteById"] = (id) => {
    return false;
  };

  changeNoteById: INoteModel["changeNoteById"] = (id, data) => {
    return false;
  };
}

export default NoteModelV2;
