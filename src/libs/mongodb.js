import mongoose from "mongoose";

const connectMongoDB = await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connectionDatabase = mongoose.connection;

connectionDatabase.on('error', console.error.bind(console, 'Connection error:'));
connectionDatabase.once('open', () => {
    console.log('Connected to MongoDB');
});

export default connectMongoDB;
export { connectionDatabase };
