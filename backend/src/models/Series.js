import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
  timestamp: { type: Date, required: true },
  value: { type: Number, required: true },
});

const seriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    matchDate: { type: Date, required: true },
    color: { type: String, default: "#0000FF" },
    minValue: { type: Number, required: true, default: 0 },
    maxValue: { type: Number, required: true, default: 100 },
    measurements: [measurementSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Series", seriesSchema);
