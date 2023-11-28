import mongoose, { Schema } from "mongoose";

const seasonEnum = ['Spring', 'Summer', 'Autumn', 'Winter'];

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
    enum: seasonEnum,
  },
  difficulty: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },

  countries: [
    {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const ActivityModel =
  mongoose?.models?.Activity || mongoose.model("Activity", activitySchema);
