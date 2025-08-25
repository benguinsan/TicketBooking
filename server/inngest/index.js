import { Inngest } from "inngest";
import User from "../models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Inngest Functions to save user to database
const syncUserCreation = inngest.createFunction(
    {id: "sync-user-creation-with-clerk"},
    // Function to run when user is created (event user.created is triggered when user is created)
    {event: "user.created"},
    async({event}) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data;
        const userData = {
            _id: id,
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
            image: image_url,
        }
        await User.create(userData);
    }   
)

// Inngest Functions to delete user from database
const syncUserDeletion = inngest.createFunction(
    {id: "sync-user-deletion-with-clerk"},
    {event: "user.deleted"},
    async({event}) => {
        const {id} = event.data;
        await User.findOneAndDelete(id);
    }
)

// Inngest Functions to update user in database
const syncUserUpdation = inngest.createFunction(
    {id: "sync-user-update-with-clerk"},
    {event: "user.updated"},
    async({event}) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data;
        const userData = {
            _id: id,
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
            image: image_url,
        }
        await User.findOneAndUpdate(id, userData);
    }
)       


// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,
];