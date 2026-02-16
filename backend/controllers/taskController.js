import Task from '../models/Task.js';

export const createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getEmployeeTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.params.userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { status, notes, timeSpent } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { status, notes, $inc: { timeSpent: timeSpent || 0 } },
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};