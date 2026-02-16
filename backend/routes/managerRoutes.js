import express from 'express';
const router = express.Router();
import { getTeamProgress } from '../controllers/managerController.js';
import auth from '../middleware/authMiddleware.js';
import role from '../middleware/roleMiddleware.js';

router.get('/team-progress', auth, role(['Manager', 'Admin']), getTeamProgress);

export default router;