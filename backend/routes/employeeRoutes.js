import express from 'express';
const router = express.Router();
import { getProfile, getEmployees } from '../controllers/employeeController.js';
import auth from '../middleware/authMiddleware.js';
import role from '../middleware/roleMiddleware.js';

router.get('/profile', auth, getProfile);
router.get('/list', auth, role(['Manager']), getEmployees);

export default router;