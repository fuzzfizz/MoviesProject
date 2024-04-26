import mongoose from "mongoose";

const connectMongoDB = await mongoose.connect(process.env.MONGODB_URI);

// mongoose.connect(connectMongoDB);

const connectionDatabase = mongoose.connection;

export default connectMongoDB;
export { connectionDatabase };
