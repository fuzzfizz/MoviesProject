"use server";
import Movies from "@/model/Movies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, { params }) {
  let result = await Movies.findOne({ id: params.id });

  return NextResponse.json(result);
}

export async function DELETE(req, { params }) {
  let result = await Movies.deleteOne({ _id: params.id });

  return NextResponse.json(result);
}
