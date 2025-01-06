// /controllers/donationController.js
import Donation from '../model/donationModel.js';

// Create Donation
export const createDonation = async (req, res) => {
    try {
        const { email, mobile, pan, aadhaar, amount, pinCode, address, category } = req.body;
        
        const donation = await Donation.create({ email, mobile, pan, aadhaar, amount, pinCode, address, category });
        
        res.status(201).json({ success: true, data: donation });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get All Donations
export const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find(); // Fetch all donations from the database
        res.status(200).json({ success: true, data: donations });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};