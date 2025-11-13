import express from "express";
import {
  getUsers,
  createUser,
  updatePassword,
} from "../controllers/usersController.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - passwordHash
 *       properties:
 *         _id:
 *           type: string
 *           example: "64e3f5bce20d2a6f93e1b9aa"
 *         username:
 *           type: string
 *           example: johndoe
 *         passwordHash:
 *           type: string
 *           example: "$2b$10$Y3J5cHRvZ3JhcGh5SGFzaA=="
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-11-13T09:24:10.312Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-11-13T09:24:10.312Z"
 */

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error while fetching users
 */
router.get("/", getUsers);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: StrongPass123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Missing username or password
 *       409:
 *         description: Username already exists
 *       500:
 *         description: Server error while creating user
 */
router.post("/", createUser);

/**
 * @openapi
 * /users/{userId}/password:
 *   put:
 *     summary: Update a user's password
 *     description: Requires authentication
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *           example: 64e3f5bce20d2a6f93e1b9aa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: NewStrongPass123
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error while updating password
 */
router.put("/:userId/password", authenticate, updatePassword);

export default router;
