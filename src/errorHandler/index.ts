import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "./BadRequestError";

type Errors = BadRequestError | Error;

export const errorHandler = (
  err: Errors,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  return err instanceof Error
    ? res.status(401).send({ message: err.message, status: 400 })
    : res.status(err.status).send({ message: err.message, status: err.status });
};
