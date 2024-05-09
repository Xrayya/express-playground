import express from "express";
import * as notesController from "../controllers/notes.controller";
import { validateRequest } from "zod-express-middleware";
import * as schema from "../schema";

const notesRouter = express.Router();

notesRouter.get("/", validateRequest(schema.getReq), notesController.get());
notesRouter.get(
  "/:id",
  validateRequest(schema.getByIdReq),
  notesController.getById,
);
notesRouter.post("/", validateRequest(schema.postReq), notesController.post);
notesRouter.get(
  "/archived",
  validateRequest(schema.getReq),
  notesController.get(true),
);
notesRouter.put(
  "/:id",
  validateRequest(schema.changeReq),
  notesController.change,
);
notesRouter.delete(
  "/:id",
  validateRequest(schema.removeReq),
  notesController.remove,
);

export default notesRouter;
