import express from "express";
import {
  getUsers,
  createUser,
  updatePassword,
} from "../controllers/usersController.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:userId/password", authenticate, updatePassword);

export default router;
