// import mongoose from "mongoose";

// const connectMongoDB = await mongoose.connect(process.env.MONGODB_URI);

// export default connectMongoDB;


// import mongoose from "mongoose";

// const mongoUrl = await mongoose.connect(process.env.MONGODB_URI);

// mongoose.connect(mongoUrl);

// const connectionDatabase = mongoose.connection;

// export { connectionDatabase };

import mongoose from "mongoose";

 const connectMongoDB = await mongoose.connect(process.env.MONGODB_URI);

mongoose.connect(connectMongoDB);

const connectionDatabase = mongoose.connection;

export default connectMongoDB;
export { connectionDatabase };
    
