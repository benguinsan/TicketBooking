import { clerkClient } from "@clerk/express";

export const protectAdmin = async (req, res, next) => {
    try{
        // Get user id from auth middleware
        const { userId } = req.auth();

        // Get user from clerk with user id just fetched
        const user = await clerkClient.users.getUser(userId);

        // Check if user is admin
        if(user.privateMetadata.role !== "admin") {
            return res.json({success: false, message: "Not authorized"});
        }

        next();
        
    } catch(error) {
        res.json({success: false, message: 'Unauthorized'});
    }
}