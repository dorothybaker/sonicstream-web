import { Router } from "express";
import { protectRoute } from "../utils/protectRoute.js";
import { likeAndDislikeSong } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.put("/:id", protectRoute, likeAndDislikeSong);

export default userRouter;
