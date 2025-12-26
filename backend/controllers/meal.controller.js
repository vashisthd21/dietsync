import Meal from "../models/Meal.models.js";

// GET all meals
export const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find({});
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch meals" });
  }
};
