import { Router } from "express";
import { AlbumContoller } from "../controller/albumContoller";
import { checkAuthMiddleware } from "../middleware/checkAuth";

const albumRouter = Router();

albumRouter.patch("/change-album-title", checkAuthMiddleware, AlbumContoller.changeAlbumTitle);
albumRouter.delete("/delete-album", checkAuthMiddleware, AlbumContoller.deleteAlbum);

export { albumRouter };
