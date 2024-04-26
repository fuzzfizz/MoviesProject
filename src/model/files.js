import connectMongoDB from "@/libs/mongodb";
import { Schema } from "mongoose";

const FsFileSchema = new Schema(
  {
    // _id: Object,
    metadata: Object,
    filename: String,
    
  },
  {
    timestamps: new Date(),
    versionKey: false,
  }
);

const File =
  connectMongoDB.models["fs.file"] || connectMongoDB.model("fs.file", FsFileSchema);

export default File;


