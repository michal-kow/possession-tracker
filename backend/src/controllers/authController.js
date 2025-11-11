import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../utils/createToken.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = createAccessToken(res, existingUser._id);
    createRefreshToken(res, existingUser._id);

    res.status(200).json({
      message: "Login successful",
      user: existingUser,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const refresh = (req, res) => {
  const jwtCookie = req.cookies?.jwt;

  if (!jwtCookie) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(
    jwtCookie,
    process.env.JWT_REFRESH_SECRET,
    async (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Forbidden", error: err.message });
      }

      const foundUser = await User.findById(decoded.id);

      if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const accessToken = createAccessToken(res, foundUser._id);

      res.status(200).json({ accessToken });
    }
  );
};

const logout = (req, res) => {
  const jwtCookie = req.cookies?.jwt;

  if (!jwtCookie) {
    return res.status(204).json({ message: "No content" });
  }

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });
  res.status(200).json({ message: "Logout successful" });
};

export { login, refresh, logout };
