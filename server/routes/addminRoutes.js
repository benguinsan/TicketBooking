import express from "express";
import { protectAdmin } from "../middleware/auth.js";
import { iskAdmin, getDashboardData, getAllShows, getAllBookings } from "../controller/adminController.js";

const adminRouter = express.Router();

// Apply admin middleware to all routes
adminRouter.use(protectAdmin);

// Check if user is admin
adminRouter.get("/check-admin", iskAdmin);

// Get dashboard data
adminRouter.get("/dashboard", getDashboardData);

// Get all active shows
adminRouter.get("/shows", getAllShows);

// Get all bookings
adminRouter.get("/bookings", getAllBookings);

export default adminRouter;
