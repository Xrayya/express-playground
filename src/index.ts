import cors from "cors";
import express from "express";

const personalNotesApp = express();
const port = process.env.PORT || 3000;

personalNotesApp.use(cors());
personalNotesApp.use(express.json());

personalNotesApp.get("/", (_req, res) => {
  res.json({ message: "ok" }).status(200);
});

personalNotesApp.use()

personalNotesApp.listen(port, () => {
  console.log(`[Express] listening at http://localhost:${port}`);
});
