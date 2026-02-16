import express from 'express';
const router = express.Router();
import { createTask, getEmployeeTasks, updateTask } from '../controllers/taskController.js';
import auth from '../middleware/authMiddleware.js';

router.post('/assign', auth, createTask);
router.get('/employee/:userId', auth, getEmployeeTasks);
router.patch('/:id', auth, updateTask);

export default router;