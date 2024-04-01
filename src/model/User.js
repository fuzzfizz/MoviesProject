import connectMongoDB from "@/libs/mongodb";
import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    // _id: String,
    facebookName: String,
    role: String,
    credit: Number,
  },
  {
    timestamps: new Date(),
    versionKey: false,
  }
);

const User =
  connectMongoDB.models.User || connectMongoDB.model("User", UserSchema);

export default User;
