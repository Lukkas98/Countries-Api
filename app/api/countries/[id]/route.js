import connectDB from "@/lib/dbConnect";
import { ActivityModel } from "@/models/Activity";
import { CountryModel } from "@/models/Country";
import { NextResponse } from "next/server";

export async function GET(Null, { params }) {
  await connectDB();
  const { id } = params;
  try {
    const country = await CountryModel.findById(id);
    const activitiesId = country.activities;

    if (!country) {
      return NextResponse.json(
        { message: `Country ID: ${id} not found` },
        { status: 404 }
      );
    }

    const results = [{ country }];

    for (const activity of activitiesId) {
      results.push(await ActivityModel.findById(activity));
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
