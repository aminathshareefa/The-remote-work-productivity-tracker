import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import managerRoutes from './routes/managerRoutes.js';
import timeRoutes from './routes/timeRoutes.js';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        console.error(`❌ Missing required environment variable: ${varName}`);
        process.exit(1);
    }
});

const app = express();

// Middleware
app.use(express.json());

// CORS configuration - must be before route definitions
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://the-remote-work-productivi-git-76e773-aminathshareefas-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], 
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Health check route
app.get('/', (req, res) => {
    res.send("<h1>Remote Work Productivity Tracker API is Live!</h1><p>The backend is working perfectly.</p>");
});

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ Database Connection Failed:", err.message);
        process.exit(1);
    }
};

// Connect to database
connectDB();

// API health check
app.get('/api', (req, res) => {
    res.json({ message: "Remote Work Productivity Tracker API is running..." });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/time', timeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server started on port ${PORT}`);
    console.log(`🔗 API available at http://localhost:${PORT}`);
});