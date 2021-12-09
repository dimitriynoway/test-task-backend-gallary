import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errorHandler/UnauthorizedError";

export const checkAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    throw new UnauthorizedError();
  }

  const [bearer, token] = authorization.split(" ");

  if (!token) throw new UnauthorizedError();

  const payload = <{ id: string; iat: number }>jwt.verify(token, process.env.SECRET as string);

  req.userId = payload.id;

  next();
};
