import express from 'express';
import { adminLogin, getAdminStats } from '../controller/adminController.js';
import { authenticateToken } from '../controller/authController.js';

const router = express.Router();

// Admin routes
router.post('/login', adminLogin);
router.get('/stats', authenticateToken, getAdminStats);

export default router;
