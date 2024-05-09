import { Response } from "express";
import { TypedRequest } from "zod-express-middleware";
import * as notesModel from "../models/notes.model";
import * as schema from "../schema";

type GetRequest = TypedRequest<any, any, typeof schema.getReq.query>;

export const get =
  (archived: boolean = false) =>
  async (req: GetRequest, res: Response) => {
    const { content } = req.query;

    if (content !== undefined) {
      return res
        .json({
          status: "success",
          data: notesModel.getNotesByContent(archived, content),
        })
        .status(200);
    }

    return res
      .json({ status: "success", data: notesModel.getAllNotes(archived) })
      .status(200);
  };

type GetByIdRequest = TypedRequest<typeof schema.getByIdReq.params, any, any>;

export const getById = async (req: GetByIdRequest, res: Response) => {
  const { id } = req.params;

  const note = notesModel.getNotesById(id);

  if (note.length === 0) {
    return res.json({ status: "fail", message: "Note not found" }).status(404);
  }

  return res.json({ status: "success", data: note[0] });
};

type PostRequest = TypedRequest<any, typeof schema.postReq.body, any>;

export const post = async (req: PostRequest, res: Response) => {
  const { title, body, archived = false } = req.body;

  if (notesModel.addNotes({ title, body, archived })) {
    return res
      .json({ status: "success", message: "Note added successfully" })
      .status(201);
  }

  return res
    .json({ status: "fail", message: "Internal server error" })
    .status(500);
};

type DeleteRequest = TypedRequest<typeof schema.removeReq.params, any, any>;

export const remove = async (req: DeleteRequest, res: Response) => {
  const { id } = req.params;

  if (notesModel.deleteNoteById(id)) {
    return res
      .json({ status: "success", message: "Note deleted successfully" })
      .status(200);
  }

  return res.json({ status: "fail", message: "Note not found" }).status(404);
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
    return res
      .json({ status: "success", message: "Note changed successfully" })
      .status(200);
  }

  return res.json({ status: "fail", message: "Note not found" }).status(404);
};
