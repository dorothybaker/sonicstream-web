import { Router } from "express";
import { protectRoute } from "../utils/protectRoute.js";
import {
  createSong,
  getAllSongs,
  getMySongs,
  getSong,
} from "../controllers/song.controller.js";

const songRouter = Router();

songRouter.get("/all", getAllSongs);

songRouter.get("/mySongs", protectRoute, getMySongs);

songRouter.post("/create", protectRoute, createSong);

songRouter.get("/:id", getSong);

export default songRouter;
