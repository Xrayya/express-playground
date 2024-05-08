import { Request, Response } from "express";
import * as notesModel from "../models/notes.model";

type GetRequest = Request<any, any, any, { content?: string }>;

export const get = async (req: GetRequest, res: Response) => {
  const { content } = req.query;

  if (content !== undefined) {
    return res
      .json({
        status: "success",
        data: notesModel.getNotesByContent(content),
      })
      .status(200);
  }

  return res
    .json({ status: "success", data: notesModel.getAllNotes(false) })
    .status(200);
};

type PostRequest = Request<any, any, Omit<notesModel.Note, "id" | "createdAt">>;

export const post = async (req: PostRequest, res: Response) => {
  const { title, body, archived = false } = req.body;
  if (title !== undefined) {
    return res
      .json({
        status: "fail",
        message: "Failed to add new note. The note must have title",
      })
      .status(400);
  }

  if (notesModel.addNotes({ title, body, archived })) {
    return res
      .json({ status: "success", message: "Note added successfully" })
      .status(201);
  }

  return res
    .json({ status: "fail", message: "Internal server error" })
    .status(500);
};

type GetByIdRequest = Request<{ id: string }>;

export const getById = async (req: GetByIdRequest, res: Response) => {
  const { id } = req.params;

  const note = notesModel.getNotesById(id);

  if (note.length === 0) {
    return res.json({ status: "fail", message: "Note not found" }).status(404);
  }

  return res.json({ status: "success", data: note[0] });
};
