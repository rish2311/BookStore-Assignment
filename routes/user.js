// routes/users.js

import express from "express";
import User from "../Models/User.js";

const router = express.Router();

/**
 * @route   GET /api/users
 * @desc    Get list of all users
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude password field
    res.json({
      totalUsers: users.length,
      users: users.map((user) => ({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        registeredAt: user.registeredAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
