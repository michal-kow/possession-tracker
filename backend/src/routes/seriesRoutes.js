import express from "express";
import {
  getSeries,
  getSeriesById,
  createSeries,
  updateSeries,
  deleteSeries,
  addMeasurement,
  editMeasurement,
} from "../controllers/seriesController.js";

const router = express.Router();

router.get("/", getSeries);
router.get("/:id", getSeriesById);
router.post("/", createSeries);
router.put("/:id", updateSeries);
router.delete("/:id", deleteSeries);
router.post("/:seriesId/measurements", addMeasurement);
router.put("/:seriesId/measurements/:measurementId", editMeasurement);

export default router;
