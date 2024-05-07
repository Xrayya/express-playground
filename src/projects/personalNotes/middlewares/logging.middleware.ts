import { NextFunction, Request, Response } from "express";

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, timestamp);
  next();
};

export default loggingMiddleware;
