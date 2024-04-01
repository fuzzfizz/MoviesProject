import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, { params }) {
  let result = await User.findOne({ _id: params.id });

  return NextResponse.json(result);
}

export async function PUT(req, { params }) {
  const result = await User.updateOne(
    { _id: params.id },
    {
      $set: {
        ...(await req.json()),
      },
    }
  );

  return NextResponse.json(result);
}

export async function POST(req, { params }) {
  console.log(await req.json());

  const greeting = `Hello World!!: ${req.param}`;
  const json = {
    greeting,
  };

  return NextResponse.json(json);
}

export async function DELETE(req, { params }) {
  let result = await User.deleteOne({ _id: params.id });

  return NextResponse.json(result);
}
