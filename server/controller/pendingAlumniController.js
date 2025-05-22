import PendingAlumni from '../model/pendingAlumniModel.js';
import Alumni from '../model/alumniModel.js';
import User from '../model/user.js';
import { uploadImageToCloudinary } from '../utils/cloudinary.js';

// Submit alumni profile for verification
export const submitAlumniProfile = async (req, res) => {
  try {
    const { name, batch, department, degree, company, designation, linkedin, country, phone } = req.body;
    const userId = req.user.id;
    
    // Check if user already has a pending request
    const existingRequest = await PendingAlumni.findOne({ 
      userId, 
      status: 'pending' 
    });
    
    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "You already have a pending verification request"
      });
    }
    
    // Get user's email
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    // Handle image upload if it exists
    let imageUrl = '';
    if (req.file) {
      const result = await uploadImageToCloudinary(req.file.path);
      imageUrl = result.secure_url;
    }
    
    // Create new pending alumni record
    const pendingAlumni = new PendingAlumni({
      userId,
      name,
      email: user.email,
      batch,
      department,
      degree,
      company,
      designation,
      linkedin,
      country,
      phone,
      image: imageUrl
    });
    
    await pendingAlumni.save();
    
    // Update user's profile completion status
    await User.findByIdAndUpdate(userId, {
      profileCompleted: true,
      department
    });
    
    return res.status(201).json({
      success: true,
      message: "Alumni profile submitted for verification",
      data: pendingAlumni
    });
    
  } catch (error) {
    console.error('Error submitting alumni profile:', error);
    return res.status(500).json({
      success: false,
      message: "Error submitting alumni profile",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get user's own pending request
export const getMyPendingRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const pendingRequest = await PendingAlumni.findOne({ 
      userId, 
      status: 'pending' 
    });
    
    return res.status(200).json({
      success: true,
      pendingRequest
    });
  } catch (error) {
    console.error('Error getting pending request:', error);
    return res.status(500).json({
      success: false,
      message: "Error getting pending request",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Admin: Get all pending alumni requests
export const getAllPendingRequests = async (req, res) => {
  try {
    // Only admin should access this
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required"
      });
    }
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const pendingRequests = await PendingAlumni.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await PendingAlumni.countDocuments();
    
    return res.status(200).json({
      success: true,
      pendingRequests,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error getting pending requests:', error);
    return res.status(500).json({
      success: false,
      message: "Error getting pending requests",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Admin: Approve or reject alumni request
export const reviewAlumniRequest = async (req, res) => {
  try {
    // Only admin should access this
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required"
      });
    }
    
    const { requestId, status, rejectionReason } = req.body;
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'approved' or 'rejected'"
      });
    }
    
    const pendingRequest = await PendingAlumni.findById(requestId);
    if (!pendingRequest) {
      return res.status(404).json({
        success: false,
        message: "Request not found"
      });
    }
    
    // Update request status
    pendingRequest.status = status;
    if (status === 'rejected' && rejectionReason) {
      pendingRequest.rejectionReason = rejectionReason;
    }
    
    await pendingRequest.save();
    
    // If approved, create alumni record and update user role
    if (status === 'approved') {
      // Create alumni record
      const alumni = new Alumni({
        name: pendingRequest.name,
        batch: pendingRequest.batch,
        degree: pendingRequest.degree,
        department: pendingRequest.department,
        company: pendingRequest.company,
        designation: pendingRequest.designation,
        email: pendingRequest.email,
        phone: pendingRequest.phone,
        country: pendingRequest.country,
        linkedin: pendingRequest.linkedin,
        image: pendingRequest.image || "https://via.placeholder.com/150"
      });
      
      await alumni.save();
      
      // Update user role to alumni and set verified
      await User.findByIdAndUpdate(pendingRequest.userId, {
        role: 'alumni',
        isVerified: true
      });
    }
    
    return res.status(200).json({
      success: true,
      message: `Request ${status}`,
      data: pendingRequest
    });
    
  } catch (error) {
    console.error('Error reviewing alumni request:', error);
    return res.status(500).json({
      success: false,
      message: "Error reviewing alumni request",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
