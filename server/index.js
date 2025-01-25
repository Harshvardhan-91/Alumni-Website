import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./route/userRoutes.js";
import postRoutes from "./route/postRoutes.js";
import connectionRoutes from "./route/connectionRoutes.js";
import messageRoutes from "./route/messageRoutes.js";
import donationRoutes from "./route/donationRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Routes
app.use('/donation', donationRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/connections', connectionRoutes);
app.use('/messages', messageRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
