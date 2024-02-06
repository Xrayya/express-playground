import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Express + Typescript Server's Up");
});

app.listen(port, () => console.log(`[server]: Server is running at http://localhost:${port}`));
