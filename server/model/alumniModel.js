import mongoose from 'mongoose';

const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Anonymous Alumni' // Provide a default value
  },
  batch: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    default: ''
  },
  department: {
    type: String,
    default: ''
  },
  company: {
    type: String,
    default: ''
  },
  designation: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: 'INDIA'
  },
  linkedin: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/150"
  }
});

const Alumni = mongoose.model('Alumni', alumniSchema);
export default Alumni;  // Use default export
