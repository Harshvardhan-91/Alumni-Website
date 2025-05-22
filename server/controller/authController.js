import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.js";
import PendingAlumni from "../model/pendingAlumniModel.js";
import { uploadImageToCloudinary } from "../utils/cloudinary.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find the user and attach to request
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth token error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        graduatingYear: user.graduatingYear
      }
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      graduatingYear, 
      username,
      // Additional alumni profile fields
      department,
      company,
      designation,
      linkedin,
      country
    } = req.body;
    
    console.log("Registration attempt with email:", email); 
    console.log("Has profile image:", req.file ? "Yes" : "No");

    // Convert email to lowercase for consistency
    const normalizedEmail = email.toLowerCase();
    console.log("Normalized email:", normalizedEmail); 

    // Check for existing user first
    const existingUser = await User.findOne({ email: normalizedEmail });
    console.log("Existing user check result:", existingUser); 
    
    if (existingUser) {
      console.log("Found existing user with email:", normalizedEmail); 
      return res.status(200).json({
        success: false,
        message: "Email already registered"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name: name,
      email: normalizedEmail,
      password: hashedPassword,
      graduatingYear: parseInt(graduatingYear),
      username: username || email.split('@')[0], // Generate username if missing
      department: department || '',
      profileCompleted: department && company && designation ? true : false
    });

    try {
      // Save user
      const savedUser = await newUser.save();
      
      // Handle profile image upload if it exists
      let imageUrl = '';
      if (req.file) {
        try {
          const result = await uploadImageToCloudinary(req.file.path);
          imageUrl = result.secure_url;
          console.log("Uploaded profile image to Cloudinary:", imageUrl);
        } catch (imageError) {
          console.error("Error uploading profile image:", imageError);
          // Continue without image if upload fails
        }
      }
      
      // If alumni profile data is provided, create a pending alumni request
      if (department && company && designation) {
        try {
          // Create pending alumni record
          const pendingAlumni = new PendingAlumni({
            userId: savedUser._id,
            name,
            email: normalizedEmail,
            batch: graduatingYear.toString(),
            department,
            degree: 'B.Tech', // Default value, can be updated later
            company,
            designation,
            linkedin: linkedin || '',
            country: country || 'INDIA',
            phone: '',
            image: imageUrl // Add the Cloudinary image URL
          });
          
          await pendingAlumni.save();
          console.log("Created pending alumni profile during registration");
        } catch (profileError) {
          console.error("Error creating pending alumni profile:", profileError);
          // We don't want to fail registration if this fails
        }
      }

      // Generate token
      const token = jwt.sign(
        { id: savedUser._id },
        JWT_SECRET,
        { expiresIn: '24h' }
      );      // Return success response
      return res.status(201).json({
        success: true,
        message: "Registration successful",
        token,
        user: {
          id: savedUser._id,
          name: savedUser.name,
          username: savedUser.username,
          email: savedUser.email,
          graduatingYear: savedUser.graduatingYear,
          department: savedUser.department,
          profileCompleted: savedUser.profileCompleted,
          role: savedUser.role,
          isVerified: savedUser.isVerified
        }
      });
    } catch (saveError) {
      if (saveError.code === 11000) {
        console.log(saveError);
        return res.status(400).json({
          success: false,
          message: "Server Error occured"
        });
      }
      throw saveError;
    }
  } catch (error) {
    console.error("Registration error:", error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map(err => err.message).join(', ')
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again."
    });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email: email.toLowerCase() });
    res.json({
      exists: !!user,
      usersInSystem: await User.countDocuments(),
      emailSearchedFor: email.toLowerCase()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        graduatingYear: user.graduatingYear
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Error during login",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};