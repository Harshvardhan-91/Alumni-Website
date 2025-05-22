import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../model/user.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if provided credentials match the environment variables
    if (username !== ADMIN_USERNAME) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
    
    // Check password
    const isMatch = password === ADMIN_PASSWORD;
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
    
    // Check if admin user exists in database, if not create one
    let adminUser = await User.findOne({ username: ADMIN_USERNAME });
    
    if (!adminUser) {
      // Create a new admin user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);
      
      adminUser = new User({
        username: ADMIN_USERNAME,
        name: 'Administrator',
        email: ADMIN_EMAIL || 'admin@example.com',
        password: hashedPassword,
        graduatingYear: 2000, // Default value
        role: 'admin',
        isVerified: true
      });
      
      await adminUser.save();
    } else if (adminUser.role !== 'admin') {
      // Update to admin role if not already
      adminUser.role = 'admin';
      await adminUser.save();
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: adminUser._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      user: {
        id: adminUser._id,
        username: adminUser.username,
        name: adminUser.name,
        role: adminUser.role
      }
    });
    
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: "Error during admin login",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get admin stats 
export const getAdminStats = async (req, res) => {
  try {
    // Only admin should access this
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required"
      });
    }
    
    // Get counts for dashboard
    const totalUsers = await User.countDocuments();
    const pendingVerificationUsers = await User.countDocuments({ 
      profileCompleted: true,
      isVerified: false
    });
    const verifiedAlumni = await User.countDocuments({ 
      role: 'alumni',
      isVerified: true
    });
    
    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        pendingVerificationUsers,
        verifiedAlumni
      }
    });
    
  } catch (error) {
    console.error('Error getting admin stats:', error);
    res.status(500).json({
      success: false,
      message: "Error getting admin stats",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
