import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import managerRoutes from './routes/managerRoutes.js';
import timeRoutes from './routes/timeRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
app.use(cors({
    origin: "https://productivity-tracker-five.vercel.app", // നിങ്ങളുടെ Vercel ലിങ്ക്
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Connect Database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error("Database Connection Failed:", err.message);
        process.exit(1);
    }
};
connectDB();

// Root Route (To avoid "Cannot GET /" error in browser)
app.get('/', (req, res) => {
    res.send("Remote Work Productivity Tracker API is running...");
});

// Routes - match with your api.js baseURL
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/time', timeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));