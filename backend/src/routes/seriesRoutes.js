import express from "express";
import { getSeries } from "../controllers/seriesController.js";

const router = express.Router();

router.get("/", getSeries);

export default router;
