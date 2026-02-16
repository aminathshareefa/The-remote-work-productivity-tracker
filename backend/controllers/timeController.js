import TimeLog from '../models/TimeLog.js';

export const logTime = async (req, res) => {
    try {
        const { userId, taskId, startTime, endTime, duration } = req.body;
        const newLog = new TimeLog({
            user: userId,
            task: taskId,
            startTime,
            endTime,
            duration
        });
        await newLog.save();
        res.status(201).json(newLog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getUserLogs = async (req, res) => {
    try {
        const logs = await TimeLog.find({ user: req.params.userId }).populate('task');
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};