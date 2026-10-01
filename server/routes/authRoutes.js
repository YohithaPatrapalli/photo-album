import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // ✅ match exact casing of the file name
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// UPDATE user details endpoint
router.put("/update/:id", verifyToken, async (req, res) => {
  const { name, email } = req.body;
  try {
    // Only allow user to update their own profile
    if (req.userId.toString() !== req.params.id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    // Check if email is being changed to one that already exists
    const existing = await User.findOne({ email });
    if (existing && existing._id.toString() !== req.params.id) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    // Issue new token in case email changed
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ user, token });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

// REGISTER endpoint
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Register failed" });
  }
});

// LOGIN endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ user, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
