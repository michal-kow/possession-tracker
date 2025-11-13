import express from "express";
import { login, refresh, logout } from "../controllers/authController.js";

const router = express.Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     description: Authenticates a user by verifying their username and password. Returns an access token and sets a refresh token as an HTTP-only cookie.
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
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token
 *       400:
 *         description: Missing credentials
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/login", login);

/**
 * @openapi
 * /auth/refresh:
 *   get:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     description: Uses the HTTP-only refresh token cookie to issue a new access token.
 *     responses:
 *       200:
 *         description: New access token issued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: New JWT access token
 *       401:
 *         description: No refresh token provided
 *       403:
 *         description: Invalid or expired refresh token
 *       500:
 *         description: Internal server error
 */
router.get("/refresh", refresh);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Log out user
 *     tags: [Authentication]
 *     description: Clears the refresh token cookie and ends the session.
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 *       204:
 *         description: No content (no token cookie found)
 */
router.post("/logout", logout);

export default router;
