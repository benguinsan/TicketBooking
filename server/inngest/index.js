import { Inngest } from "inngest";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import Movie from "../models/Movie.js";
import sendEmail from "../configs/nodeMailer.js";

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

// Inngest function to send email to user when user books a ticket
const sendBookingConfirmationEmail = inngest.createFunction(
    {id: "send-booking-confirmation-email"},
    {event: "app/show.booked"},
    async({event, step}) => {
        const {bookingId} = event.data;

        const booking = await Booking.findById(bookingId).populate({path: "show", populate: {path: "movie", model: "Movie"}}).populate("user");

        await sendEmail({
            to: booking.user.email,
            subject: `Payment confirmation: ${booking.show.movie.title} booked!`,
            body: `
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        
                        <!-- Header -->
                        <div style="background: linear-gradient(135deg, #F84565 0%, #D63854 100%); padding: 30px; text-align: center;">
                            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">🎬 Booking Confirmed!</h1>
                            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your movie ticket is ready</p>
                        </div>
                        
                        <!-- Content -->
                        <div style="padding: 40px 30px;">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h2 style="color: #333; margin: 0 0 10px 0; font-size: 24px;">${booking.show.movie.title}</h2>
                                <p style="color: #666; margin: 0; font-size: 16px;">Thank you for your booking!</p>
                            </div>
                            
                            <!-- Movie Details Card -->
                            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 25px; border-left: 4px solid #F84565;">
                                <h3 style="color: #333; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;"> Booking Details</h3>
                                
                                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                                    <span style="color: #666; font-weight: 500;">Booking ID:</span>
                                    <span style="color: #333; font-weight: 600;">${booking._id}</span>
                                </div>
                                
                                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                                    <span style="color: #666; font-weight: 500;">Date & Time:</span>
                                    <span style="color: #333; font-weight: 600;">${new Date(booking.show.showDateTime).toLocaleDateString()} at ${new Date(booking.show.showDateTime).toLocaleTimeString()}</span>
                                </div>
                                
                                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                                    <span style="color: #666; font-weight: 500;">Seats:</span>
                                    <span style="color: #333; font-weight: 600;">${booking.bookedSeats.join(', ')}</span>
                                </div>
                                
                                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                                    <span style="color: #666; font-weight: 500;">Total Tickets:</span>
                                    <span style="color: #333; font-weight: 600;">${booking.bookedSeats.length}</span>
                                </div>
                                
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0;">
                                    <span style="color: #666; font-weight: 500;">Amount:</span>
                                    <span style="color: #F84565; font-weight: 700; font-size: 18px;">$${booking.amount}</span>
                                </div>
                            </div>
                            
                            <!-- Footer Message -->
                            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee;">
                                <p style="color: #666; margin: 0; font-size: 14px; line-height: 1.6;">
                                    Please arrive 15 minutes before the show time.<br>
                                    Have a great movie experience! 🍿
                                </p>
                            </div>
                        </div>
                        
                        <!-- Footer -->
                        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
                            <p style="color: #999; margin: 0; font-size: 12px;">
                                © 2024 QuickShow. All rights reserved.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `
        })
    }
)


// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,
    releaseSeatsAndDeleteBooking,
    sendBookingConfirmationEmail
];