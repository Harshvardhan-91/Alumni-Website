// /models/donationModel.js
import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    pan: { type: String, required: true },
    aadhaar: { type: String, required: true },
    amount: { type: Number, required: true },
    pinCode: { type: String, required: true },
    address: { type: String, required: true },
    category: { type: String, required: true }
});

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
