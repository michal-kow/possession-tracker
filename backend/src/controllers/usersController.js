import User from "../models/User.js";

const getUsers = async (_, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export { getUsers };
