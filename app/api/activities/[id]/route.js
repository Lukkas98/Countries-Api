import connectDB from "@/lib/dbConnect";
import { ActivityModel } from "@/models/Activity";
import { CountryModel } from "@/models/Country";
import { NextResponse } from "next/server";

export async function GET(Null, { params }) {
  await connectDB();
  const { id } = await params;
  let results = [];

  try {
    const activity = await ActivityModel.findById(id);
    if (!activity) {
      return NextResponse.json(
        { message: `Activity ID: ${id} not found` },
        { status: 404 }
      );
    }
    results.push({activity});

    for (const country of activity.countries) {
      results.push(await CountryModel.findById(country));
    }
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  await connectDB();
  const { id } = await params;
  const { name, description, countries: newCountries } = await req.json();

  try {
    if (!name && !description && (!newCountries || newCountries.length <= 0)) {
      return NextResponse.json({ message: "mising data" }, { status: 400 });
    }

    const activityToPatch = await ActivityModel.findByIdAndUpdate(id, {
      name,
      description,
      countries: newCountries,
    });

    if (!activityToPatch) {
      return NextResponse.json(
        { message: "Activity not found" },
        { status: 404 }
      );
    }

    const oldCountries = activityToPatch.countries;

    // Elimina la referencia de la actividad de los países que se han eliminado
    const countriesToRemove = oldCountries.filter(
      (countryId) => !newCountries.includes(countryId)
    );
    for (const countryId of countriesToRemove) {
      await CountryModel.findByIdAndUpdate(countryId, {
        $pull: { activities: id },
      });
    }

    // Agrega la referencia de la actividad a los países que se han agregado
    const countriesToAdd = newCountries.filter(
      (countryId) => !oldCountries.includes(countryId)
    );
    for (const countryId of countriesToAdd) {
      await CountryModel.findByIdAndUpdate(countryId, {
        $push: { activities: id },
      });
    }

    return NextResponse.json({ activityToPatch }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(Null, { params }) {
  await connectDB();
  const { id } = await params;
  try {
    const activity = await ActivityModel.findByIdAndDelete(id);

    if (!activity) {
      return NextResponse.json(
        { message: `Activity ID ${id} not found` },
        { status: 404 }
      );
    }

    //borro la asociacion de los paises
    const countriesAssociated = activity.countries;
    for (const countryId of countriesAssociated) {
      try {
        await CountryModel.findByIdAndUpdate(countryId, {
          $pull: { activities: id },
        });
      } catch (error) {
        console.error(`Error updating country ${countryId}: ${error.message}`);
      }
    }

    return NextResponse.json(
      { message: "Activity eliminated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
