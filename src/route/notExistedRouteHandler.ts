import { Request, Response } from "express";

export const notExistedRouteHandler = (req: Request, res: Response) =>
  res.send("Endpoint doesn't exist");
