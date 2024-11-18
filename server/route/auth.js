import express from "express";
import { registerUser, loginUser, getUserProfile, authenticateToken } from "../controller/authController.js";

const router = express.Router();

// Register API
router.post("/register", registerUser);

// Login API
router.post("/login", loginUser);

// Profile API (Protected route)
router.get("/profile", authenticateToken, getUserProfile);

export default router;
