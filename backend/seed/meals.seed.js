import mongoose from "mongoose";
import Meal from "../models/Meal.models.js";
import mealsData from "./meals.data.js";
const MONGO_URI="mongodb+srv://diyajindal1305:Radhika2005@maincluster.wzu4gui.mongodb.net/";
console.log("Using MONGO_URI:", MONGO_URI);
async function seedMeals() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Atlas connected");

    await Meal.deleteMany({});
    await Meal.insertMany(mealsData);

    console.log("✅ Meals seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed", err);
    process.exit(1);
  }
}

seedMeals();
