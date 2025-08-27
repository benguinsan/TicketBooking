import mongoose from "mongoose";

// Show Schema
const showSchema = new mongoose.Schema({
    // Reference to the movie document (Foreign Key)
    movie: {type: String, ref: "Movie", required: true},
    showDateTime: {type: Date, required: true},
    showPrice: {type: Number, required: true},
    occupiedSeats: {type: Object, default: {}}
}, {minimize: false})

const Show = mongoose.model("Show", showSchema);

export default Show;

