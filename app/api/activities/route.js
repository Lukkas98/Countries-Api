import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import { ActivityModel } from "@/models/Activity";
import { CountryModel } from "@/models/Country";
import validatorActivity from "./validatorActivity";

export async function GET() {
  await connectDB();
  try {
    const activities = await ActivityModel.find({});

    if (!activities.length)
      return NextResponse.json(
        { message: "there are no activities" },
        { status: 200 }
      );

    return NextResponse.json(activities, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  const { name, season, countries, difficulty, duration} = await req.json();

  try {
    const isValidate = validatorActivity(name, season, countries, difficulty, duration)
    
    if (typeof isValidate !== "boolean") {
      throw new Error(isValidate)
    }

    const activity = await ActivityModel.create({
      name,
      season,
      difficulty,
      duration,
      countries,
    });
    const activityId = activity._id;

    //agrega al pais la actividad
    for (const countryId of countries) {
      try {
        await CountryModel.findByIdAndUpdate(countryId, {
          $push: { activities: activityId },
        });
      } catch (error) {
        console.error(`Error updating country ${countryId}: ${error.message}`);
      }
    }

    return NextResponse.json({ message: "Activity created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}