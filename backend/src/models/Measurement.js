import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema(
  {
    seriesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
      required: true,
    },
    timestamp: { type: Date, required: true },
    value: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v >= 0 && v <= 100;
        },
        message: "Value must be between 0 and 100",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Measurement", measurementSchema);
