import mongoose from 'mongoose';

const alumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  education: {
    degree: String,
    graduationYear: Number,
  },
  fieldOfStudy: String,
  location: String,
  achievements: [String],
  email: String,
  linkedin: String,
});

const Alumni = mongoose.model("Alumni", alumSchema);

export default Alumni;
