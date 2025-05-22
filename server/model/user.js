import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
  {
    username:{
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'],
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [20, 'Username must be at most 20 characters long'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
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
    },
    role: {
      type: String,
      enum: ['user', 'alumni', 'admin'],
      default: 'user'
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    department: {
      type: String,
      required: false
    },
    profileCompleted: {
      type: Boolean,
      default: false
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