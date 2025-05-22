import mongoose from 'mongoose';

const pendingAlumniSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  linkedin: {
    type: String,
    required: false
  },
  country: {
    type: String,
    default: 'INDIA'
  },
  phone: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PendingAlumni = mongoose.model('PendingAlumni', pendingAlumniSchema);
export default PendingAlumni;
