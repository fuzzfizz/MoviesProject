import connectMongoDB from "@/libs/mongodb";
import { Schema } from "mongoose";

const MoviesSchema = new Schema(
  {
    // _id: mongoose.ObjectId,
    adult: Boolean,
    backdrop_path: String,
    genre_ids: Array,
    id: Number,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: String,
    title: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number,
  },
  {
    timestamps: new Date(),
    versionKey: false,
  }
);

const Movies =
  connectMongoDB.models.Movies || connectMongoDB.model("Movies", MoviesSchema);

export default Movies;
