import express from "express";
import { getNowPlayingMovies, addShow } from "../controller/showController.js";
import { protectAdmin } from "../middleware/auth.js";

const showRouter = express.Router();

showRouter.get("/now-playing", protectAdmin, getNowPlayingMovies);
showRouter.post("/add-show", protectAdmin, addShow);

export default showRouter;
