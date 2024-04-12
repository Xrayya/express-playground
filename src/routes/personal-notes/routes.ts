import express, { Request, Response } from "express";
import fs from "fs";
const personalNoteRouter = express.Router();

personalNoteRouter.get("/", (_req: Request, res: Response) => {
  fs.readFile("data/personal-notes.json", (err, data) => {
    if (err) {
      console.log('[fs] Failed to open "noteModel.ts"');
      return;
    }

    console.log("[express] handling get all note");
    res.json({ notes: JSON.parse(data.toString()) });
  });
});

export default personalNoteRouter;
