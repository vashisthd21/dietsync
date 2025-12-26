import express from "express";
import Notification from "../models/Notification.models.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* 🔔 GET user notifications */
router.get("/", protect, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

/* ✅ MARK AS READ */
router.patch("/:id/read", protect, async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      read: true,
    });

    res.json({ message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update notification" });
  }
});

export default router;
