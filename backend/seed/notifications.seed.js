import "dotenv/config";
import mongoose from "mongoose";
import Notification from "../models/Notification.models.js";
import connectDB from "../config/db.js";

const seedNotifications = async () => {
  try {
    await connectDB();

    await Notification.deleteMany();

    await Notification.insertMany([
      {
        user: "6940f7fd6652ce2c345312ed",
        title: "Meal added to planner",
        message: "Your Grilled Salmon was added to planner",
        type: "planner",
      },
      {
        user: "6940f7fd6652ce2c345312ed",
        title: "New meal recommendation",
        message: "Try our new Mediterranean Bowl!",
        type: "system",
      },
    ]);

    console.log("✅ Notifications seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedNotifications();
