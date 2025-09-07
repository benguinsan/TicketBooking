import { Inngest } from "inngest";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Inngest Functions to save user to database
const syncUserCreation = inngest.createFunction(
    {id: "create-user-with-clerk"},
    // Function to run when user is created (event user.created is triggered when user is created)
    {event: "clerk/user.created"},
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
    {id: "delete-user-with-clerk"},
    {event: "clerk/user.deleted"},
    async({event}) => {      
        const {id} = event.data;
        await User.findByIdAndDelete(id);
    }
)

// Inngest Functions to update user in database
const syncUserUpdation = inngest.createFunction(
    {id: "update-user-with-clerk"},
    {event: "clerk/user.updated"},
    async({event}) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data;
        const userData = {
            _id: id,
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
            image: image_url,
        }
        await User.findByIdAndUpdate(id, userData);
    }
)

// Inngest function to canceled booking and release seats of show after 10 minutes if payment is not done
const releaseSeatsAndDeleteBooking = inngest.createFunction(
    {id: "release-seats-delete-booking"},
    {event: "app/checkpayment"},
    async({event, step}) => {
        const tenMinutesLater = new Date(Date.now() + 10 * 60 * 1000);
        await step.sleepUntil('wait-for-10-minutes', tenMinutesLater);

        await step.run("check-payment-status", async() => {
            
            // event.data.booking is data will send when we call inngest.send({name: "app/checkpayment", data: {bookingId: booking._id.toString()}})
            const bookingId = event.data.bookingId;

            const booking = await Booking.findById(bookingId);
            if(!booking) return;

            // if booking is not paid, delete booking and release seats of show
            if(!booking.isPaid) {
                const show = await Show.findById(booking.show);

                // BookedSeats is an array ex ["A1", "A2", "A3"]
                // OccupiedSeats is an object ex {A1: user_id, A2: user_id, A3: user_id}
                booking.bookedSeats.forEach((seat) => {
                    delete show.occupiedSeats[seat];
                })
                show.markModified("occupiedSeats");
                await show.save();

                await Booking.findByIdAndDelete(booking._id);
            }
        })
    }
)


// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,
    releaseSeatsAndDeleteBooking
];