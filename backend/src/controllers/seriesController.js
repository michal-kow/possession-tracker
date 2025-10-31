import Series from "../models/Series.js";

const getSeries = async (_, res) => {
  try {
    const series = await Series.find({});
    res.status(200).json(series);
  } catch (error) {
    res.status(500).json({ message: "Error fetching series" });
  }
};

export { getSeries };
