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

/**
 * @openapi
 * components:
 *   schemas:
 *     Measurement:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "674f9c5b37a06a42b43b2f91"
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: "2025-11-13T10:00:00.000Z"
 *         value:
 *           type: number
 *           example: 42.7
 *     Series:
 *       type: object
 *       required:
 *         - name
 *         - matchDate
 *         - minValue
 *         - maxValue
 *       properties:
 *         _id:
 *           type: string
 *           example: "674f9c5b37a06a42b43b2f90"
 *         name:
 *           type: string
 *           example: "Team A vs Team B"
 *         matchDate:
 *           type: string
 *           format: date-time
 *           example: "2025-11-13T00:00:00.000Z"
 *         color:
 *           type: string
 *           example: "#FF0000"
 *         minValue:
 *           type: number
 *           example: 0
 *         maxValue:
 *           type: number
 *           example: 100
 *         measurements:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Measurement'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-11-13T10:05:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-11-13T10:05:00.000Z"
 */

/**
 * @openapi
 * /series:
 *   get:
 *     summary: Retrieve all series
 *     tags:
 *       - Series
 *     responses:
 *       200:
 *         description: A list of all series
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Series'
 *       500:
 *         description: Server error while fetching series
 */
router.get("/", getSeries);

/**
 * @openapi
 * /series/{id}:
 *   get:
 *     summary: Get a series by ID
 *     tags:
 *       - Series
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the series
 *         example: 674f9c5b37a06a42b43b2f90
 *     responses:
 *       200:
 *         description: The series object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Series'
 *       404:
 *         description: Series not found
 *       500:
 *         description: Server error while fetching series
 */
router.get("/:id", getSeriesById);

/**
 * @openapi
 * /series:
 *   post:
 *     summary: Create a new series
 *     tags:
 *       - Series
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - matchDate
 *               - color
 *               - minValue
 *               - maxValue
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Team A vs Team B"
 *               matchDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-13T00:00:00.000Z"
 *               color:
 *                 type: string
 *                 example: "#00FF00"
 *               minValue:
 *                 type: number
 *                 example: 0
 *               maxValue:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Series created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Series'
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Server error while creating series
 */
router.post("/", authenticate, createSeries);

/**
 * @openapi
 * /series/{id}:
 *   put:
 *     summary: Update a series
 *     tags:
 *       - Series
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the series to update
 *         example: 674f9c5b37a06a42b43b2f90
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - matchDate
 *               - color
 *               - minValue
 *               - maxValue
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Series Name"
 *               matchDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-12-01T00:00:00.000Z"
 *               color:
 *                 type: string
 *                 example: "#123456"
 *               minValue:
 *                 type: number
 *                 example: 10
 *               maxValue:
 *                 type: number
 *                 example: 200
 *     responses:
 *       200:
 *         description: Series updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Series'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Series not found
 *       500:
 *         description: Server error while updating series
 */
router.put("/:id", authenticate, updateSeries);

/**
 * @openapi
 * /series/{id}:
 *   delete:
 *     summary: Delete a series
 *     tags:
 *       - Series
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the series to delete
 *         example: 674f9c5b37a06a42b43b2f90
 *     responses:
 *       200:
 *         description: Series deleted successfully
 *       404:
 *         description: Series not found
 *       500:
 *         description: Server error while deleting series
 */
router.delete("/:id", authenticate, deleteSeries);

/**
 * @openapi
 * /series/{seriesId}/measurements:
 *   post:
 *     summary: Add a measurement to a series
 *     tags:
 *       - Series
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: seriesId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the series
 *         example: 674f9c5b37a06a42b43b2f90
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *               - timestamp
 *             properties:
 *               value:
 *                 type: number
 *                 example: 75.4
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-13T12:00:00.000Z"
 *     responses:
 *       201:
 *         description: Measurement added successfully
 *       400:
 *         description: Missing fields or invalid value range
 *       404:
 *         description: Series not found
 *       409:
 *         description: Measurement timestamp already exists
 *       500:
 *         description: Server error while adding measurement
 */
router.post("/:seriesId/measurements", authenticate, addMeasurement);

/**
 * @openapi
 * /series/{seriesId}/measurements/{measurementId}:
 *   put:
 *     summary: Edit a measurement value
 *     tags:
 *       - Series
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: seriesId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the series
 *         example: 674f9c5b37a06a42b43b2f90
 *       - in: path
 *         name: measurementId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the measurement
 *         example: 674f9c5b37a06a42b43b2f91
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *             properties:
 *               value:
 *                 type: number
 *                 example: 88.2
 *     responses:
 *       200:
 *         description: Measurement updated successfully
 *       400:
 *         description: Invalid or missing value
 *       404:
 *         description: Series or measurement not found
 *       500:
 *         description: Server error while updating measurement
 */
router.put(
  "/:seriesId/measurements/:measurementId",
  authenticate,
  editMeasurement
);

export default router;
