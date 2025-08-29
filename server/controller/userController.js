import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import { clerkClient } from "@clerk/express";

// API to get User Bookings
export const getUserBookings = async (req, res) => {
    try{
        const userId = req.auth().userId;

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        const bookings = await Booking.find({userId}).populate({path: "show", populate: {path: "movie"}}).sort({createdAt: -1});

        res.json({success: true, bookings});

    } catch(error) {
        console.log(error);
        return {success: false, message: error.message};
    }
}

// API Controller to update Favorite Movie in Clerk User metadata
export const updateFavoriteMovie = async (req, res) => {
    try{
        const {movieId} = req.body;

        const userId = req.auth().userId;

        const user = await clerkClient.users.getUser(userId);

        if(!user.privateMetadata.favoriteMovies) {
            user.privateMetadata.favoriteMovies = [];
        }

        if(!user.privateMetadata.favoriteMovies.includes(movieId)) {
            user.privateMetadata.favoriteMovies.push(movieId);
        } else {
            user.privateMetadata.favoriteMovies = user.privateMetadata.favoriteMovies.filter(id => id !== movieId);
        }

        // Update User Metadata in Clerk Database
        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: user.privateMetadata
        });

        res.json({success: true, message: "Favorite movie updated successfully"});
    } catch(error) {
        console.log(error);
        return {success: false, message: error.message};
    }
}

// API Controller to get Favorite Movies
export const getFavoriteMovies = async (req, res) => {
    try{
        const userId = req.auth().userId;

        const user = await clerkClient.users.getUser(userId);

        const favoriteMovies = user.privateMetadata.favoriteMovies || [];

        const movies = await Movie.find({_id: {$in: favoriteMovies}});

        res.json({success: true, movies});
    } catch(error) {
        console.log(error);
        return {success: false, message: error.message};
    }
}