"use server";
import Movies from "@/model/Movies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  let result = await Movies.find({});

  return NextResponse.json(result);
}

export async function POST(req) {
  let body = await req.json();

  let result = await Movies.create(body);

  return NextResponse.json(result);
}
