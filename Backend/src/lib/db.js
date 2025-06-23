import mongoose from 'mongoose';

export const connectToDB = async () => {
    console.log(process.env.MONGO_URI)
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}