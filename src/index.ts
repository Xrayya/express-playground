import cors from "cors";
import express from "express";
import loggingMiddleware from "./middlewares/logging.middleware";

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

playground.use();

playground.listen(port, () => {
  console.log(`[Express] listening at http://localhost:${port}`);
});
