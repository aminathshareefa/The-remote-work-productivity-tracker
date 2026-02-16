import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['To-Do', 'In Progress', 'Completed'], default: 'To-Do' },
    notes: { type: String, default: "" },
    timeSpent: { type: Number, default: 0 },
    dueDate: { type: Date }
}, { timestamps: true });

export default mongoose.model('Task', TaskSchema);