import cors from "cors";
import express from "express";
import loggingMiddleware from "./middlewares/logging.middleware";
import notesRouter from "./projects/personalNotes/routes/notes.route";
import dotenv from "dotenv";

dotenv.config();

const playground = express();
const port = process.env.PORT || 3000;

playground.use(cors());
playground.use(express.json());
playground.use(loggingMiddleware);

playground.get("/", (_req, res) => {
  res
    .json({
      status: "ok",
      message: "You're entering root route of Express Playground",
    })
    .status(200);
});

playground.use("/personal-notes", notesRouter);

playground.listen(port, () => {
  console.log("\x1b[34m", `[Express] listening at http://localhost:${port}`);
});
