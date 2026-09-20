import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.MONGODB_URI,
            {
                serverSelectionTimeoutMS: 5000
            }
        );

        console.log(
            `MongoDB connected: ${connection.connection.host}`
        );
    } catch (error) {
        console.error(
            `MongoDB connection failed: ${error.message}`
        );

        throw error;
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();

        console.log("MongoDB connection closed");
    } catch (error) {
        console.error(
            `MongoDB disconnect error: ${error.message}`
        );
    }
};

export {
    connectDB,
    disconnectDB
};