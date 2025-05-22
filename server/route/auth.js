import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerUser, loginUser, getUserProfile, authenticateToken, checkEmail } from '../controller/authController.js';
import { validateRegistration, validateLogin } from '../middleware/validateAuth.js';

// Set up multer storage for file uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for image uploads
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

// Initialize multer upload
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const router = express.Router();

// Auth routes
router.post('/register', upload.single('profileImage'), validateRegistration, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/profile', authenticateToken, getUserProfile);
router.get('/check-email', checkEmail);

export default router;