"use server";
import Genres from "@/model/Genres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  let result = await Genres.find({});
  console.log(result)
  return NextResponse.json(result);
}

export async function POST(req) {
  let body = await req.json();

  let result = await Genres.create(body);

  return NextResponse.json(result);
}
