import express from "express";
import cors from "cors";

const Express = express();
const port = process.env.PORT || 3000;

Express.use(cors());
Express.use(express.json());

Express.get("/", (_req, res) => {
  res.json({ message: "ok" }).status(200);
});

Express.listen(port, () => {
  console.log(`[Express] listening at http://localhost:${port}`);
});
