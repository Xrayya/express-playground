import express from "express";
import * as notesController from "../controllers/notes.controller";

const notesRouter = express.Router();

notesRouter.get("/", notesController.get());
notesRouter.get("/:id", notesController.getById);
notesRouter.post("/", notesController.post);
notesRouter.get("/archived", notesController.get(true));
notesRouter.put("/:id", notesController.change);
notesRouter.delete("/:id", notesController.remove);

export default notesRouter
