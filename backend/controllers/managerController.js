import Task from '../models/Task.js';

export const getTeamProgress = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'name email');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};