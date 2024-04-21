"use server";
import Genres from "@/model/Genres";
import mongoose,{ ObjectId } from "mongoose"
import { NextRequest, NextResponse } from "next/server";
// var mongoose = require('mongoose');

export async function GET(req, { params }) {
  let result = await Genres.findOne({ id: params.id });

  return NextResponse.json(result);
}

export async function PUT(req, { params }) {
  let id = new mongoose.Types.ObjectId(params.id);
  let body = await req.json()
  console.log(body);
  const result = await Genres.updateOne(
    { _id: id },
    {
      $set: body,
    }
  );

  return NextResponse.json(result);
}

export async function DELETE(req, { params }) {
  let result = await Genres.deleteOne({ _id: params.id });

  return NextResponse.json(result);
}
