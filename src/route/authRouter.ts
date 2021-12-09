import { Router } from "express";
import { AuthorizationContoller } from "../controller/authContoller";

const authRouter = Router();

authRouter.post("/register", AuthorizationContoller.register);
authRouter.get("/login", AuthorizationContoller.login);

export { authRouter };
