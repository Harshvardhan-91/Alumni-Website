import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profile: {
    headline: String,
    bio: String,
    experience: Array,
    education: Array,
    skills: [String],
  },
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('User', userSchema);