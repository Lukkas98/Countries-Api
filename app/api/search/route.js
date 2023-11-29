import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import { CountryModel } from "@/models/Country";
import { ActivityModel } from "@/models/Activity";

export async function GET(req) {
  connectDB();
  const searchParams = req.nextUrl.searchParams;
  const name = await searchParams.get("name");
  const result = [];

  try {
    const countries = await CountryModel.find({
      name: { $regex: `^${name}`, $options: "i" },
    }).exec();

    const activitiesResults = [];

    for (const country of countries) {
      const activities = await ActivityModel.find({
        _id: { $in: country.activities },
      }).exec();

      activitiesResults.push({ country, activities });
    }

    result.push(...activitiesResults);

    if (!result.length) {
      return NextResponse.json(
        { message: "there are no countries" },
        { status: 200 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
