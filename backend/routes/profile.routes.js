import express from "express";
import multer from "multer";
import path from "path";
import User from "../models/User.models.js";

import { protect } from "../middlewares/auth.middleware.js";
import Profile from "../models/Profile.models.js";
import { uploadAvatar } from "../middlewares/cloudinaryUpload.middleware.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: "uploads/avatars/",
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) return cb(null, true);
    cb(new Error("Only images are allowed"));
  }
});
/* ---------------- GET profile ---------------- */
router.get("/", protect, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate("user", "name email avatar"); // ✅ INCLUDE AVATAR

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({
      name: profile.user.name,
      age: profile.age || 0,
      email: profile.user.email,
      avatar: profile.user.avatar, // ✅ CORRECT
      allergies: profile.allergies || [],
      dietPreference: profile.dietPreference,
      budget: profile.budget,
      medicalConditions: profile.medicalConditions,
      onboardingCompleted: profile.onboardingCompleted,
    });
  } catch (err) {
    console.error("Profile fetch error", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- CREATE / UPDATE profile ---------------- */
router.post("/", protect, async (req, res) => {
  try {
    const data = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { ...data, user: req.user.id,
        onboardingCompleted: true,
       },
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (err) {
    console.error("Profile save error", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.delete("/", protect, async (req, res) => {
  try {
    await Profile.deleteOne({ user: req.user.id });
    await User.findByIdAndDelete(req.user.id);

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Account deletion failed:", err);
    res.status(500).json({ message: "Account deletion failed" });
  }
});

router.put(
  "/",
  protect,
  uploadAvatar.single("avatar"),
  async (req, res) => {
    try {
      console.log("----- PROFILE PUT START -----");

      console.log("req.user:", req.user);
      console.log("req.body:", req.body);
      console.log("req.file:", req.file);

      const { name, budget } = req.body;

      console.log("Parsed name:", name);
      console.log("Parsed budget:", budget);

      // 🔴 SAFELY PARSE JSON
      let dietPreference = [];
      let allergies = [];
      let medicalConditions = [];

      try {
        dietPreference = JSON.parse(req.body.dietPreference || "[]");
        allergies = JSON.parse(req.body.allergies || "[]");
        medicalConditions = JSON.parse(req.body.medicalConditions || "[]");
      } catch (parseErr) {
        console.error("❌ JSON PARSE ERROR:", parseErr);
        return res.status(400).json({ message: "Invalid JSON fields" });
      }

      console.log("dietPreference:", dietPreference);
      console.log("allergies:", allergies);
      console.log("medicalConditions:", medicalConditions);

      // 🔴 UPDATE USER
      const userUpdate = { name };
      if (req.file) {
        userUpdate.avatar = req.file.path; // Cloudinary URL
      }
      console.log("Updating User with:", userUpdate);

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        userUpdate,
        { new: true }
      );

      console.log("Updated User:", updatedUser);

      // 🔴 UPDATE PROFILE
      const updatedProfile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          budget,
          dietPreference,
          allergies,
          medicalConditions,
        },
        { new: true }
      );

      console.log("Updated Profile:", updatedProfile);

      console.log("----- PROFILE PUT SUCCESS -----");

      res.json(updatedProfile);
    } catch (err) {
      console.error("🔥 PROFILE UPDATE FAILED 🔥");
      console.error(err);
      res.status(500).json({ message: "Profile update failed" });
    }
  }
);


export default router;
