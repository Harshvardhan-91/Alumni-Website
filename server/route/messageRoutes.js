import express from 'express';
import { sendMessage, getMessages } from '../controller/messageController.js';
import authenticate from '../utils/auth.js';
const router = express.Router();

router.post('/', authenticate, sendMessage);
router.get('/:recipientId', authenticate, getMessages);

export default router;