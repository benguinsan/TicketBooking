import express from "express";
import { getNowPlayingMovies, addShow, getMovieHasShow, getMovieSchedule } from "../controller/showController.js";
import { protectAdmin } from "../middleware/auth.js";

const showRouter = express.Router();

showRouter.get("/now-playing", getNowPlayingMovies);
showRouter.post("/add-show", protectAdmin, addShow);
showRouter.get("/all", getMovieHasShow)
showRouter.get("/:movieId", getMovieSchedule)

export default showRouter;
