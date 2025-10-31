import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, default: "#0000FF" },
    minValue: { type: Number, required: true, default: 0 },
    maxValue: { type: Number, required: true, default: 100 },
  },
  { timestamps: true }
);

export default mongoose.model("Series", seriesSchema);
