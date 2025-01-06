// route/donationRoutes.js
import express from 'express';
import { createDonation, getAllDonations } from '../controller/donationController.js';

const router = express.Router();

// Define the routes
router.post('/donate', createDonation);
router.get('/donate', getAllDonations);

// Export the router as the default export
export default router;
