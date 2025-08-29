import express from "express";
import { getUserBookings, updateFavoriteMovie, getFavoriteMovies } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/bookings",  getUserBookings);
userRouter.post("/update-favorite", updateFavoriteMovie);
userRouter.get("/favorites", getFavoriteMovies);

export default userRouter;