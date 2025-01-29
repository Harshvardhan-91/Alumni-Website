import mongoose from "mongoose";

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
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
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

// Pre-save middleware to handle validation
UserSchema.pre('save', function(next) {
  if (!this.name || !this.email || !this.password || !this.graduatingYear) {
    next(new Error('All fields are required'));
  }
  next();
});

// Handle duplicate key errors
UserSchema.post('save', function(error, doc, next) {
  if (error.code === 11000) {
    next(new Error('Email is already registered'));
  } else {
    next(error);
  }
});

const User = mongoose.model("User", UserSchema);

export default User;