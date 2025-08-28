import express from "express";
import { createBooking, getOccupiedSeats } from "../controller/bookingController.js";

const router = express.Router();

router.post("/create-booking", createBooking);
router.get("/seats/:showId", getOccupiedSeats);

export default router;