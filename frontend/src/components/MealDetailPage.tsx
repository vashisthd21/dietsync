import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  Users,
  ChefHat,
  Calendar,
  ShoppingCart,
} from "lucide-react";
import type { Meal } from "../types/meal";
import api from "../api/axios";

type MealDetailPageProps = {
  mealId: string;
  onBack: () => void;
  onNavigate: (page: "dashboard" | "planner" | "grocery") => void;
};

export function MealDetailPage({
  mealId,
  onBack,
  onNavigate,
}: MealDetailPageProps) {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(2);

  useEffect(() => {
    api
      .get(`/api/meals/${mealId}`)
      .then((res) => setMeal(res.data))
      .catch((err) => console.error("Failed to fetch meal", err))
      .finally(() => setLoading(false));
  }, [mealId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading meal details...
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Meal not found
      </div>
    );
  }

  const scaled = (value: number) =>
    Math.round(value * (servings / 2));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl">Back to Feed</h2>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="relative h-96 rounded-3xl overflow-hidden mb-8 shadow-xl">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 p-8 text-white">
            <h1 className="text-5xl mb-4">{meal.name}</h1>
            <div className="flex gap-6">
              <span className="flex items-center gap-2">
                <Clock /> 30 mins
              </span>
              <span className="flex items-center gap-2">
                <Users /> {servings} servings
              </span>
              <span className="flex items-center gap-2">
                <ChefHat /> Easy
              </span>
            </div>
          </div>
        </div>

        {/* Nutrition */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl mb-4">Nutrition</h3>
          <p>Calories: {scaled(meal.calories)}</p>
          <p>Protein: {scaled(meal.protein)}g</p>
          <p>Carbs: {scaled(meal.carbs)}g</p>
          <p>Fat: {scaled(meal.fat)}g</p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onNavigate("planner")}
            className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg"
          >
            <Calendar /> Add to Planner
          </button>

          <button
            onClick={() => onNavigate("grocery")}
            className="flex items-center gap-2 px-4 py-3 border border-green-600 text-green-600 rounded-lg"
          >
            <ShoppingCart /> Add to Grocery
          </button>
        </div>
      </div>
    </div>
  );
}
