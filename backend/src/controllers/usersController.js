import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../utils/createToken.js";

const getUsers = async (_, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    if (await User.findOne({ username })) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ username, passwordHash });
    await newUser.save();
    const token = createAccessToken(res, newUser._id);

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { userId } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);
    user.passwordHash = passwordHash;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating password", error: error.message });
  }
};

export { getUsers, createUser, updatePassword };
