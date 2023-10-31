import axios from "axios";
import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import { CountryModel } from "@/models/Country";

export async function GET(Null, { query }) {
  await connectDB();
  const page = (await query.p) || 1;
  const pageSize = 15;

  try {
    const countries = await CountryModel.find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return NextResponse.json(countries, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST() {
  await connectDB();

  try {
    const countriesInBD = await CountryModel.find({});
    if (countriesInBD.length > 249) {
      return NextResponse.json(
        { message: "You can't create more countries" },
        { status: 400 }
      );
    }

    const countriesToCreate = await (
      await axios("https://restcountries.com/v3/all/")
    ).data;

    const promises = countriesToCreate.map(async (country) => {
      const newCountry = await CountryModel.create({
        name: country.name.common,
        image: country.flags[1],
        continents: country.continents[0],
        capital: country.capital ? country.capital[0] : "has no capital",
        subregion: country.subregion ? country.subregion : "has no subregion",
        area: country.area,
        region: country.region,
        population: country.population,
      });
      return newCountry;
    });

    const countries = await Promise.all(promises);
    return NextResponse.json(countries, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
