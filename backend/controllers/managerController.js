import mongoose from 'mongoose';
import Task from '../models/Task.js';

export const getTeamProgress = async (req, res) => {
    try {
        // convert to ObjectId to avoid class constructor issues
        const managerId = new mongoose.Types.ObjectId(req.user.id);

        // calculate current week boundaries (Sunday –> next Sunday)
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7);

        const progress = await Task.aggregate([
            { $match: { assignedBy: managerId } },

            // bring in the assigned employee
            {
                $lookup: {
                    from: 'users',
                    localField: 'assignedTo',
                    foreignField: '_id',
                    as: 'employee'
                }
            },
            { $unwind: '$employee' },

            // sum this employee's time logs for the week
            {
                $lookup: {
                    from: 'timelogs',
                    let: { userId: '$employee._id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$user', '$$userId'] },
                                        { $gte: ['$startTime', startOfWeek] },
                                        { $lt: ['$startTime', endOfWeek] }
                                    ]
                                }
                            }
                        },
                        { $group: { _id: null, totalDuration: { $sum: '$duration' } } }
                    ],
                    as: 'weekly'
                }
            },

            // flatten out the duration and default to zero
            {
                $addFields: {
                    totalLoggedMinutes: {
                        $ifNull: [{ $arrayElemAt: ['$weekly.totalDuration', 0] }, 0]
                    }
                }
            },

            // final projection
            {
                $project: {
                    _id: 0,
                    title: '$title',
                    name: '$employee.name',
                    status: '$status',
                    totalLoggedHours: { $divide: ['$totalLoggedMinutes', 60] }
                }
            }
        ]);

        res.status(200).json(progress);
    } catch (error) {
        console.log("Aggregation error:", error);
        res.status(500).json({ message: 'Error fetching team progress' });
    }
};