import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing MongoDB Connection...');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Configured' : 'NOT SET');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected Successfully!');
        console.log('MongoDB Status:', mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected');
        await mongoose.disconnect();
        console.log('✅ Connection test completed and closed');
        process.exit(0);
    } catch (err) {
        console.error('❌ Database Connection Failed:', err.message);
        process.exit(1);
    }
};

connectDB();
