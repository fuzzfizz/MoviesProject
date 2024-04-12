"use server";
import Movies from "@/model/Movies";

export async function GET(req) {
  const movies = await Movies.find({
    original_title: { $regex: title, $options: "i" },
  });
  return movies;
}
