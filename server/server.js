import express from "express";
import 'dotenv/config'
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = 3000;

const options = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API QuickShow',
        version: '1.0.0',
        description: 'API documentation for Movie Ticket Booking System',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server'
        }
      ],
      tags: [
        {
          name: 'Admin',
          description: 'Admin management endpoints'
        },
        {
          name: 'Shows',
          description: 'Show management endpoints'
        },
        {
          name: 'Bookings',
          description: 'Booking management endpoints'
        }
      ]
    },
    apis: ['./routes/*.js', './swagger/*.js', './server.js'], // Include swagger folder
};

const swaggerSpec = swaggerJSDoc(options);

// Connect to MongoDB
await connectDB();

// Middleware
app.use(express.json());
app.use(cors()); 
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Server is Live!"))

// Inngest
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/show", showRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`📚 API Documentation: http://localhost:${port}/api-docs`);
});