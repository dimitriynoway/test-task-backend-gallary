import { Request, Response } from "express";

export const notExistedRouteHandler = (req: Request, res: Response) =>
  res.status(404).send("Endpoint doesn't exist");
