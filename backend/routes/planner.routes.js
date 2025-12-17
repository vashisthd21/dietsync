import express from "express";
import Planner from "../models/Planner.models.js";
import Notification from "../models/Notification.models.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* ================= ADD TO PLANNER ================= */
router.post("/add", protect, async (req, res) => {
  try {
    const { mealId, date, mealType } = req.body;

    // 1️⃣ Create planner entry
    const entry = await Planner.create({
      user: req.user.id,
      meal: mealId,
      date,
      mealType,
    });

    // 2️⃣ CREATE NOTIFICATION 🔔
    await Notification.create({
      user: req.user.id,
      title: "Planner Update",
      message: "Meal added to your planner",
    });

    res.json({ message: "Meal added to planner", entry });
  } catch (err) {
    console.error("Planner add error", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
