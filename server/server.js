import express from "express";
import 'dotenv/config'
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
const port = 3000;

// Connect to MongoDB
await connectDB();

// Middleware
app.use(express.json());
app.use(cors()); 
app.use(clerkMiddleware());
// Inngest
app.use("/api/inngest", serve({ client: inngest, functions }));

// API Routes
app.get("/", (req, res) => res.send("Server is Live!"))

app.listen(port, () => console.log(`Server is running on port ${port}`));