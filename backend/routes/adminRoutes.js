import express from 'express';
const router = express.Router();
import { getAllUsers, approveUser } from '../controllers/adminController.js';
import auth from '../middleware/authMiddleware.js';
import role from '../middleware/roleMiddleware.js';

router.get('/users', auth, role(['Admin']), getAllUsers);
router.put('/approve/:id', auth, role(['Admin']), approveUser);

export default router;