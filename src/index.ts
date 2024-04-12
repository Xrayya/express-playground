import express from "express";
import cors from "cors";
import personalNoteRouter from "./routes/personal-notes/routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())

app.get("/", (_req, res) => {
  res.json({ message: "ok" });
});

app.use("/personal-notes", personalNoteRouter);

app.listen(port, () => {
  console.log(`[server] Example app listening at http://localhost:${port}`);
});
