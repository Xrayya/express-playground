import { Response } from "express";
import { TypedRequest } from "zod-express-middleware";
import * as notesModel from "../models/notes.model";
import * as schema from "../schema";

type GetRequest = TypedRequest<any, any, typeof schema.getReq.query>;

export const get =
  (archived: boolean = false) =>
  async (req: GetRequest, res: Response) => {
    const { content } = req.query;

    if (content) {
      return res
        .status(200)
        .json(notesModel.getNotesByContent(archived, content));
    }

    return res.status(200).json(notesModel.getAllNotes(archived));
  };

type GetByIdRequest = TypedRequest<typeof schema.getByIdReq.params, any, any>;

export const getById = async (req: GetByIdRequest, res: Response) => {
  const { id } = req.params;

  const note = notesModel.getNotesById(id);

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  return res.status(200).json(note);
};

type PostRequest = TypedRequest<any, typeof schema.postReq.body, any>;

export const post = async (req: PostRequest, res: Response) => {
  const { title, body, archived = false } = req.body;

  const noteId = notesModel.addNotes({ title, body, archived });

  if (!noteId) {
    return res.status(500).json({ error: "Server failed to save note" });
  }

  return res.status(201).json({ noteId: noteId });
};

type DeleteRequest = TypedRequest<typeof schema.removeReq.params, any, any>;

export const remove = async (req: DeleteRequest, res: Response) => {
  const { id } = req.params;

  if (notesModel.deleteNoteById(id)) {
    return res.status(204);
  }

  return res.status(404).json({ error: "Note not found" });
};

type ChangeRequest = TypedRequest<
  typeof schema.changeReq.params,
  typeof schema.changeReq.body,
  any
>;
export const change = async (req: ChangeRequest, res: Response) => {
  const { id } = req.params;
  const { title, body = "", archived } = req.body;

  if (notesModel.changeNoteById(id, { title, body, archived })) {
    return res.status(204);
  }

  return res.status(404).json({ error: "Note not found" });
};
