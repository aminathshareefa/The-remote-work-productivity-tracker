import User from '../models/User.js';
import Task from '../models/Task.js';

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getEmployees = async (req, res) => {
    try {
        console.log('Fetching employees with role: Employee');
        const employees = await User.find({ role: 'Employee', isApproved: true }).select('-password');
        console.log(`Successfully fetched ${employees.length} employees`);
        res.json(employees);
    } catch (err) {
        console.error('Error fetching employees:', err);
        console.error('Error stack:', err.stack);
        res.status(500).json({ message: 'Failed to fetch employees', error: err.message });
    }
};