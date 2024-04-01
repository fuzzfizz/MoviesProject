import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  let result = await User.find({});

  return NextResponse.json(result);
}

export async function POST(req) {
  let body = await req.json();

  let result = await User.create(body);

  return NextResponse.json(result);
}
