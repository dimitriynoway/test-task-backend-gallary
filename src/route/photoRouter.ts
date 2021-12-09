import { Router } from "express";
import { PhotoContoller } from "../controller/photoContoller";
import { checkAuthMiddleware } from "../middleware/checkAuth";

const photoRouter = Router();

photoRouter.post("/load-photos", checkAuthMiddleware, PhotoContoller.loadPhotos);
photoRouter.delete("/delete-photo", checkAuthMiddleware, PhotoContoller.deletePhoto);
photoRouter.get("/get-photos", PhotoContoller.getPhotos);

export { photoRouter };
