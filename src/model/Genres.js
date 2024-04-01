import connectMongoDB from "@/libs/mongodb";
import { Schema } from "mongoose";

const GenresSchema = new Schema(
  {
    // _id: String,
    id: Number,
    name: String,
  },
  {
    timestamps: new Date(),
    versionKey: false,
  }
);

const Genres =
  connectMongoDB.models.Genres || connectMongoDB.model("Genres", GenresSchema);

export default Genres;
