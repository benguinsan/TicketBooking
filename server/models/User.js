import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    image: {type: String, required: true},
})

// Create User Model with Schema
const User = mongoose.model("User", userSchema);

export default User;