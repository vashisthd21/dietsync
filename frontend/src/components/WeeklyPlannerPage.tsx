import { useEffect, useState } from "react";
import {
  Leaf,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Download,
} from "lucide-react";
import type { UserProfile } from "../types/user";
import type { Meal } from "../types/meal";
import api from "../api/axios";

type WeeklyPlannerPageProps = {
  userProfile: UserProfile;
  onNavigate: (page: "mealfeed" | "planner" | "grocery") => void;
};

type MealSlot = {
  id: string;
  name: string;
  calories: number;
  image: string;
} | null;

type DayPlan = {
  breakfast: MealSlot;
  lunch: MealSlot;
  dinner: MealSlot;
  snacks: MealSlot;
};

type WeekPlan = {
  [day: string]: DayPlan;
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function WeeklyPlannerPage({
  userProfile,
  onNavigate,
}: WeeklyPlannerPageProps) {
  /* ---------------- API MEALS ---------------- */

  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [loadingMeals, setLoadingMeals] = useState(true);

  useEffect(() => {
    api
      .get("/api/meals")
      .then((res) => setAllMeals(res.data))
      .catch((err) => console.error("Failed to fetch meals", err))
      .finally(() => setLoadingMeals(false));
  }, []);

  /* ---------------- PLANNER STATE ---------------- */

  const [weekPlan, setWeekPlan] = useState<WeekPlan>(() => {
    const plan: WeekPlan = {};
    daysOfWeek.forEach((day) => {
      plan[day] = {
        breakfast: null,
        lunch: null,
        dinner: null,
        snacks: null,
      };
    });
    return plan;
  });

  const [selectedSlot, setSelectedSlot] = useState<{
    day: string;
    meal: keyof DayPlan;
  } | null>(null);

  /* ---------------- HELPERS ---------------- */

  const getMealsByType = (type: keyof DayPlan) => {
    return allMeals.filter((meal) => meal.tags?.includes(type));
  };

  const addMealToSlot = (
    day: string,
    mealType: keyof DayPlan,
    meal: Meal
  ) => {
    setWeekPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: {
          id: meal._id,
          name: meal.name,
          calories: meal.calories,
          image: meal.image,
        },
      },
    }));
    setSelectedSlot(null);
  };

  const removeMealFromSlot = (day: string, mealType: keyof DayPlan) => {
    setWeekPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: null,
      },
    }));
  };

  const autoGenerateWeek = () => {
    const newPlan: WeekPlan = {};

    daysOfWeek.forEach((day) => {
      const pickRandom = (meals: Meal[]) =>
        meals.length
          ? {
              id: meals[Math.floor(Math.random() * meals.length)]._id,
              name: meals[Math.floor(Math.random() * meals.length)].name,
              calories:
                meals[Math.floor(Math.random() * meals.length)].calories,
              image: meals[Math.floor(Math.random() * meals.length)].image,
            }
          : null;

      newPlan[day] = {
        breakfast: pickRandom(getMealsByType("breakfast")),
        lunch: pickRandom(getMealsByType("lunch")),
        dinner: pickRandom(getMealsByType("dinner")),
        snacks: pickRandom(getMealsByType("snacks")),
      };
    });

    setWeekPlan(newPlan);
  };

  const getTotalCaloriesForDay = (day: string) => {
    const d = weekPlan[day];
    return (
      (d.breakfast?.calories || 0) +
      (d.lunch?.calories || 0) +
      (d.dinner?.calories || 0) +
      (d.snacks?.calories || 0)
    );
  };

  /* ---------------- LOADING ---------------- */

  if (loadingMeals) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading planner meals...
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <div className="flex items-center gap-3">
            <Leaf className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl">Weekly Planner</h1>
          </div>
          <button
            onClick={autoGenerateWeek}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Auto-Generate Week
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button onClick={() => onNavigate("mealfeed")}>Meal Feed</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Weekly Planner
          </button>
          <button onClick={() => onNavigate("grocery")}>Grocery</button>
        </div>

        {/* Planner Table */}
        <div className="bg-white rounded-xl overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-4 text-left">Meal</th>
                {daysOfWeek.map((day) => (
                  <th key={day} className="p-4 text-left">
                    {day}
                    <div className="text-xs text-gray-500">
                      {getTotalCaloriesForDay(day)} cal
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(["breakfast", "lunch", "dinner", "snacks"] as const).map(
                (mealType) => (
                  <tr key={mealType}>
                    <td className="p-4 capitalize">{mealType}</td>
                    {daysOfWeek.map((day) => {
                      const meal = weekPlan[day][mealType];
                      return (
                        <td key={day} className="p-2">
                          {meal ? (
                            <div className="relative group bg-gray-50 p-3 rounded-lg">
                              <img
                                src={meal.image}
                                className="w-12 h-12 rounded"
                              />
                              <p className="text-sm">{meal.name}</p>
                              <button
                                onClick={() =>
                                  removeMealFromSlot(day, mealType)
                                }
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                setSelectedSlot({ day, meal: mealType })
                              }
                              className="w-full h-20 border-2 border-dashed rounded-lg"
                            >
                              <Plus />
                            </button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Meal Picker Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full">
            <h3 className="text-xl mb-4">
              Select {selectedSlot.meal} for {selectedSlot.day}
            </h3>

            <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
              {getMealsByType(selectedSlot.meal).map((meal) => (
                <div
                  key={meal._id}
                  onClick={() =>
                    addMealToSlot(selectedSlot.day, selectedSlot.meal, meal)
                  }
                  className="p-4 border rounded-lg cursor-pointer hover:bg-green-50"
                >
                  <img
                    src={meal.image}
                    className="w-full h-32 object-cover rounded"
                  />
                  <h4 className="mt-2">{meal.name}</h4>
                  <p className="text-sm">{meal.calories} cal</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedSlot(null)}
              className="mt-4 px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
