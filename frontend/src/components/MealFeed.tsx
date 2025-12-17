import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Meal } from "../types/meal";

export default function MealFeed() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/meals")
      .then((res) => setMeals(res.data))
      .catch((err) => console.error("Failed to fetch meals", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading meals...</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <div
          key={meal._id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
        >
          <img
            src={meal.image}
            alt={meal.name}
            className="h-48 w-full object-cover rounded-t-xl"
          />

          <div className="p-4">
            <h3 className="text-lg font-semibold">{meal.name}</h3>
            <p className="text-sm text-gray-500">
              Calories: {meal.calories} kcal
            </p>

            <div className="mt-2 text-sm text-gray-600">
              Protein: {meal.protein}g · Carbs: {meal.carbs}g · Fat: {meal.fat}g
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
