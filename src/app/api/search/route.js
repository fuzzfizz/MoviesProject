"use server";
import Movies from "@/model/Movies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("search");

  if (query) {
    let result = await Movies.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { year: { $regex: query, $options: "i" } },
      ],
    });

    return NextResponse.json(result);
  }

  let result = await Movies.find({});

  return NextResponse.json(result);
}
