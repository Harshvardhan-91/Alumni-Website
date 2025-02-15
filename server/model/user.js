import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // Add unique constraint here
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    graduatingYear: {
      type: Number,
      required: [true, 'Graduating year is required'],
      min: [1950, 'Graduating year must be after 1950'],
      max: [2030, 'Graduating year must be before 2030'],
    }
  },
  { timestamps: true }
);

// Pre-save middleware to handle email lowercase conversion
UserSchema.pre('save', function(next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});

const User = mongoose.model("User", UserSchema);

// Remove the manual index creation as we've added unique: true to the schema
export default User;