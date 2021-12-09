import { NextFunction, Request, Response } from "express";
import { authService } from "../service/authService";

export const AuthorizationContoller = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authService.register({ ...req.body });
      res.status(201).send({ message: "User was created successfully" });
    } catch (err) {
      next(err);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await authService.login({ ...req.query });
      res.status(200).send(token);
    } catch (err) {
      next(err);
    }
  },
};
