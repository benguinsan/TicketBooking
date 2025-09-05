import Show from "../models/Show.js";
import Booking from "../models/Booking.js";
import stripe from "stripe";

// Function to check availability of selected seats for a movie
export const checkSeatAvailability = async (showId, selectedSeats) => {
    try{
       const showData = await Show.findById(showId);

       if(!showData) return false;

        // Get occupied seats from booking collection
        // example: occupiedSeats = ["A1", "A2", "B1"]
        const occupiedSeats = showData.occupiedSeats;
        
        // Check if any of the selected seats are already occupied
        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

        return !isAnySeatTaken;
    } catch(error) {
        console.log(error);
        return false;
    }
}

export const createBooking = async (req, res) => {
    try{
        const {userId} = req.auth();

        const {showId, selectedSeats} = req.body;
        // get origin from headers (frontend domain)
        const {origin} = req.headers;

        // Check if the seat is available for the selected show
        const isSeatAvailable = await checkSeatAvailability(showId, selectedSeats);

        if(!isSeatAvailable) {
            return {success: false, message: "Seats are not available"};
        }

        // Get the show details
        const showData = await Show.findById(showId).populate("movie");

        // Create new booking
        const createBooking = await Booking.create({
            user: userId,
            show: showId,
            amount: selectedSeats.length * showData.showPrice,
            bookedSeats: selectedSeats,
        })

        selectedSeats.map((seat) => {
            showData.occupiedSeats[seat] = userId;
        })

        showData.markModified("occupiedSeats");
        await showData.save();

        // Stripe Gateway Initialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        // Creating line items for stripe
        const line_items = [{
            price_data: {
                currency: "usd",
                product_data: {
                    name: showData.movie.title,
                },
                unit_amount: Math.floor(showData.showPrice * 100),
            },
            quantity: 1
        }]

        // Checkout session (defiend a session for payment)
        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my_bookings`,
            cancel_url: `${origin}/my_bookings`,
            line_items: line_items,
            mode: "payment",
            metadata: {
                bookingId: createBooking._id.toString(), // Important: This is the booking id that will be used to update the booking status (Stripe hook will get bookingId from metadata)
            },
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
        })

        createBooking.paymentLink = session.url;
        await createBooking.save();

        res.json({success: true, message: "Booking created successfully", url: session.url});
   
    } catch(error) {
        console.log(error);
        return {success: false, message: error.message};
    }
}

export const getOccupiedSeats = async (req, res) => {
    try{
        const {showId} = req.params;
        const showData = await Show.findById(showId);

        const occupiedSeats = Object.keys(showData.occupiedSeats);

        res.json({success: true, occupiedSeats});

    } catch(error) {
        console.log(error);
        return {success: false, message: error.message};
    }
}