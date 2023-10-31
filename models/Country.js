import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  population: {
    type: Number,
    required: true,
  },
  activities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
}],
  image: {
    type: String,
    required: true,
  },
  continents: {
    type: [String],
    default: [],
  },
  capital: {
    type: String,
    required: true,
  },
  subregion: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const CountryModel =
  mongoose?.models?.Country || mongoose.model("Country", countrySchema);
