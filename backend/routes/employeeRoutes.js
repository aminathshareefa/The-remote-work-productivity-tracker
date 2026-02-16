import express from 'express';
const router = express.Router();
import { getProfile } from '../controllers/employeeController.js';
import auth from '../middleware/authMiddleware.js';

router.get('/profile', auth, getProfile);

export default router;