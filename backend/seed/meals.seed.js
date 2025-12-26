import mongoose from "mongoose";
import dotenv from "dotenv";
import Meal from "../models/Meal.models.js";
import meals from "./meals.data.js";

dotenv.config();

/* =====================
   CONNECT DB
===================== */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

/* =====================
   SEED MEALS
===================== */
const seedMeals = async () => {
  try {
    await connectDB();

    // Optional: clear existing meals
    await Meal.deleteMany();
    console.log("Existing meals cleared");

    // Insert meals
    await Meal.insertMany(meals);
    console.log(`✅ ${meals.length} meals inserted successfully`);

    process.exit();
  } catch (err) {
    console.error("❌ Meal seeding failed:", err);
    process.exit(1);
  }
};

seedMeals();
