import { NextFunction, Request, Response } from "express";

const loggingMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const timestamp = new Date(Date.now()).toString();
  console.log(
    `[Express] ${timestamp}: Handling ${req.method} ${req.hostname} ${req.path}`,
  );
  next();
};

export default loggingMiddleware;
