import Task from '../models/Task.js';

export const getTeamProgress = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedBy: req.user.id }).populate('assignedTo', 'name');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching team progress" });
    }
};