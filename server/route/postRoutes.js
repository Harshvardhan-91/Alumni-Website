import express from 'express';
import { createPost, getPosts } from '../controller/postController.js';
import authenticate from '../utils/auth.js';
const router = express.Router();

router.post('/', authenticate, createPost);
router.get('/', getPosts);

export default router;