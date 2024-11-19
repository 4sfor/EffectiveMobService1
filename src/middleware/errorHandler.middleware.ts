import { Request, Response, NextFunction } from "express";
import { HttpError } from "../apiExeption/exeprion";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof HttpError) {
    console.error(err.stack);
    res.status(err.statusCode).send(err.message);
  } else {
    console.error(err.stack);
    res.status(500).send(err.message);
  }
}
