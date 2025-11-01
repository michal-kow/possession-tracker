import mongoose from "mongoose";
import Series from "../models/Series.js";

const getSeries = async (_, res) => {
  try {
    const series = await Series.find({});
    res.status(200).json(series);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching series: ${error.message}` });
  }
};

const getSeriesById = async (req, res) => {
  const { id } = req.params;
  try {
    const series = await Series.findById(id);
    if (!series) {
      return res.status(404).json({ message: "Series not found" });
    }
    res.status(200).json(series);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching series: ${error.message}` });
  }
};

const createSeries = async (req, res) => {
  const { name, matchDate, color, minValue, maxValue } = req.body;

  try {
    if (
      !name ||
      !matchDate ||
      !color ||
      minValue === undefined ||
      maxValue === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSeries = new Series({
      name,
      matchDate,
      color,
      minValue,
      maxValue,
    });

    const savedSeries = await newSeries.save();
    res.status(201).json(savedSeries);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error creating series: ${error.message}` });
  }
};

const updateSeries = async (req, res) => {
  const { id } = req.params;
  const { name, matchDate, color, minValue, maxValue } = req.body;

  try {
    if (
      !name ||
      !matchDate ||
      !color ||
      minValue === undefined ||
      maxValue === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedSeries = await Series.findByIdAndUpdate(
      id,
      { name, matchDate, color, minValue, maxValue },
      { new: true }
    );

    if (!updatedSeries) {
      return res.status(404).json({ message: "Series not found" });
    }

    res.status(200).json(updatedSeries);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating series: ${error.message}` });
  }
};

const deleteSeries = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSeries = await Series.findByIdAndDelete(id);

    if (!deletedSeries) {
      return res.status(404).json({ message: "Series not found" });
    }

    res.status(200).json({ message: "Series deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting series: ${error.message}` });
  }
};

const addMeasurement = async (req, res) => {
  try {
    const { seriesId } = req.params;
    const { value, timestamp } = req.body;

    if (!value || !timestamp) {
      return res
        .status(400)
        .json({ error: "Value and timestamp are required." });
    }

    const series = await Series.findById(seriesId);
    if (!series) {
      return res.status(404).json({ error: "Series not found." });
    }

    const exists = series.measurements.some(
      (m) => new Date(m.timestamp).getTime() === new Date(timestamp).getTime()
    );
    if (exists) {
      return res.status(409).json({
        error: "Measurement with this timestamp already exists.",
      });
    }

    if (value < series.minValue || value > series.maxValue) {
      return res.status(400).json({
        error: `Value must be between ${series.minValue} and ${series.maxValue}.`,
      });
    }

    series.measurements.push({ value, timestamp });
    await series.save();

    return res.status(201).json({ message: "Measurement added successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal server error: ${error.message}` });
  }
};

const editMeasurement = async (req, res) => {
  try {
    const { seriesId, measurementId } = req.params;
    const { value } = req.body;

    if (!value) {
      return res.status(400).json({ error: "Value is required." });
    }

    const series = await Series.findById(seriesId);
    if (!series) {
      return res.status(404).json({ error: "Series not found." });
    }

    if (value < series.minValue || value > series.maxValue) {
      return res.status(400).json({
        error: `Value must be between ${series.minValue} and ${series.maxValue}.`,
      });
    }

    const result = await Series.updateOne(
      { _id: seriesId },
      {
        $set: {
          "measurements.$[elem].value": value,
        },
      },
      {
        arrayFilters: [
          { "elem._id": new mongoose.Types.ObjectId(measurementId) },
        ],
      }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "Measurement not found or no changes made." });
    }

    return res
      .status(200)
      .json({ message: "Measurement updated successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal server error: ${error.message}` });
  }
};

export {
  getSeries,
  getSeriesById,
  createSeries,
  updateSeries,
  deleteSeries,
  addMeasurement,
  editMeasurement,
};
