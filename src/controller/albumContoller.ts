import { Request, Response, NextFunction } from "express";
import { albumService } from "../service/albumService";

export const AlbumContoller = {
  deleteAlbum: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteRes = await albumService.deleteAlbum(
        req.query.albumId as string,
        req.userId as string
      );
      return res.status(200).send(deleteRes);
    } catch (err) {
      next(err);
    }

    //or

    // albumService
    //   .deleteAlbum(req.query.albumId as string, req.userId as string)
    //   .then((response) => res.status(200).send(response))
    //   .catch(next);
  },
  changeAlbumTitle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updAlbum = await albumService.changeAlbumTitle({ ...req.query });
      return res.status(200).send(updAlbum);
    } catch (err) {
      next(err);
    }
  },
};
