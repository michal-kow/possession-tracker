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
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", getSeries);
router.get("/:id", getSeriesById);
router.post("/", authenticate, createSeries);
router.put("/:id", authenticate, updateSeries);
router.delete("/:id", authenticate, deleteSeries);
router.post("/:seriesId/measurements", authenticate, addMeasurement);
router.put(
  "/:seriesId/measurements/:measurementId",
  authenticate,
  editMeasurement
);

export default router;
