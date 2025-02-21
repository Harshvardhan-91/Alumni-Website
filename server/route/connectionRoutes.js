import express from 'express';
import {
  sendConnectionRequest,
  getConnections,
  updateConnectionStatus,
} from '../controller/connectionController.js';
import  authenticate  from '../utils/auth.js';
const router = express.Router();

router.post('/request', authenticate, sendConnectionRequest);
router.get('/', authenticate, getConnections);
router.put('/status', authenticate, updateConnectionStatus);

export default router;