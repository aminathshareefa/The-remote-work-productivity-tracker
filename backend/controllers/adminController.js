import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const approveUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};