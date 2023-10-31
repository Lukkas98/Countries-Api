import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import { ActivityModel } from "@/models/Activity";

export async function GET() {
  await connectDB();
  try {
    const activities = await ActivityModel.find({});

    if (!activities.length)
      return NextResponse.json(
        { message: "there are no activities" },
        { status: 200 }
      );

    NextResponse.json(activities, { status: 200 });
  } catch {
    NextResponse.json({ message: "Server error" }, { status: 504 });
  }
}

export async function POST(req) {
  await connectDB();
  const { name, description, countries } = await req.json();

  try {
    if (!name || !description || countries.length <= 0) {
      return NextResponse.json({ message: "mising data" }, { status: 400 });
    }

    await ActivityModel.create({
      name,
      description,
      countries,
    });

    NextResponse.json({ message: "Activity created" }, { status: 201 });
  } catch {
    NextResponse.json({ message: error.message }, { status: 504 });
  }
}

export async function DELETE(req) {
  await connectDB();
}
