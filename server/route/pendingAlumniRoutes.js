import express from 'express';
import multer from 'multer';
import path from 'path';
import { authenticateToken } from '../controller/authController.js';
import { 
  submitAlumniProfile, 
  getMyPendingRequest, 
  getAllPendingRequests, 
  reviewAlumniRequest 
} from '../controller/pendingAlumniController.js';

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});

// Filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

// Routes
router.post('/submit', authenticateToken, upload.single('image'), submitAlumniProfile);
router.get('/my-request', authenticateToken, getMyPendingRequest);
router.get('/admin/requests', authenticateToken, getAllPendingRequests);
router.post('/admin/review', authenticateToken, reviewAlumniRequest);

export default router;
