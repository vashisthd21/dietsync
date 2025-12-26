import express from "express";
import Meal from "../models/Meal.models.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* GET all meals */
router.get("/", protect, async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch meals" });
  }
});

/* GET single meal */
router.get("/:id", protect, async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ message: "Meal not found" });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch meal" });
  }
});

export default router;
