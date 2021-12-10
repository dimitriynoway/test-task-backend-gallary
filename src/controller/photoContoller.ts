import { NextFunction, Request, Response } from "express";
import { photoService } from "../service/photoService";

export const PhotoContoller = {
  loadPhotos: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = { userId: req.userId, limit: Number(req.query.limit) };

      await photoService.loadPhotos(req.userId, req.query);

      return res.status(201).send({ message: "Users were created successfully" });
    } catch (err) {
      next(err);
    }
  },
  getPhotos: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const photos = await photoService.getPhotos(req.query);

      return res.status(200).send(photos);
    } catch (err) {
      next(err);
    }
  },
  deletePhoto: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletedPhotos = await photoService.deletePhotos(req.query.photoId as string);

      return res.status(200).send({
        message: "Photo(s) has been deleted successfully",
        count: deletedPhotos,
      });
    } catch (err) {
      next(err);
    }
  },
};
