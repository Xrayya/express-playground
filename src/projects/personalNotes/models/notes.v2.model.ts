import { INoteModel, Note } from "./notes";

class NoteModelV2 implements INoteModel {
  getAllNotes: INoteModel["getAllNotes"] = async (archived) => {
    
    return [];
  };

  getNotesById: INoteModel["getNotesById"] = async (id) => {
    return {
      id: "",
      title: "",
      body: "",
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  getNotesByContent: INoteModel["getNotesByContent"] = async (archived, content) => {
    return [];
  };

  addNote: INoteModel["addNote"] = async (note) => {
    return "";
  };

  deleteNoteById: INoteModel["deleteNoteById"] = async (id) => {
    return false;
  };

  changeNoteById: INoteModel["changeNoteById"] = async (id, data) => {
    return false;
  };
}

export default NoteModelV2;
