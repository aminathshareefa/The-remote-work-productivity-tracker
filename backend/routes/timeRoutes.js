import express from 'express';
const router = express.Router();
import { logTime, getUserLogs } from '../controllers/timeController.js';
import auth from '../middleware/authMiddleware.js';

router.post('/log', auth, logTime);
router.get('/logs/:userId', auth, getUserLogs);

export default router;