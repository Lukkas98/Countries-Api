import mongoose, { Schema } from "mongoose";

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
