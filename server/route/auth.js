import express from 'express';
import { registerUser, loginUser, getUserProfile, authenticateToken } from '../controller/authController.js';
import { validateRegistration, validateLogin } from '../middleware/validateAuth.js';

const router = express.Router();

// Auth routes
router.post('/register', validateRegistration, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/profile', authenticateToken, getUserProfile);

export default router;