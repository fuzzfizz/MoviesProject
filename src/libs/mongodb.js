import mongoose from "mongoose";

const connectMongoDB = await mongoose.connect(process.env.MONGODB_URI);

export default connectMongoDB;