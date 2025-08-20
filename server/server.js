import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors()); 

// API Routes
app.get("/", (req, res) => res.send("Server is Live!"))

app.listen(port, () => console.log(`Server is running on port ${port}`));