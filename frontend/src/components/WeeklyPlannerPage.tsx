import { useEffect, useState } from "react";
import {
  Leaf,
  Plus,
  Trash2,
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

export function WeeklyPlannerPage(_: WeeklyPlannerPageProps) {
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [loadingMeals, setLoadingMeals] = useState(true);

  useEffect(() => {
    api
      .get("/api/meals")
      .then((res) => setAllMeals(res.data))
      .catch(console.error)
      .finally(() => setLoadingMeals(false));
  }, []);

  const [weekPlan, setWeekPlan] = useState<WeekPlan>(() => {
    const plan: WeekPlan = {};
    daysOfWeek.forEach((day) => {
      plan[day] = { breakfast: null, lunch: null, dinner: null, snacks: null };
    });
    return plan;
  });

  const [selectedSlot, setSelectedSlot] = useState<{
    day: string;
    meal: keyof DayPlan;
  } | null>(null);

  const getMealsByType = (type: keyof DayPlan) =>
    allMeals.filter((meal) => meal.tags?.includes(type));

  const addMealToSlot = (day: string, mealType: keyof DayPlan, meal: Meal) => {
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
      [day]: { ...prev[day], [mealType]: null },
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
            image:
              meals[Math.floor(Math.random() * meals.length)].image,
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

  if (loadingMeals) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Loading planner meals...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Leaf className="w-7 h-7 text-green-600" />
            <h1 className="text-2xl text-gray-900 dark:text-gray-100">
              Weekly Planner
            </h1>
          </div>
          <button
            onClick={autoGenerateWeek}
            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition"
          >
            Auto-Generate Week
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        {/* <div className="flex gap-4 mb-8">
          <button onClick={() => onNavigate("mealfeed")}>Meal Feed</button>
          
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Weekly Planner
          </button>
          <button onClick={() => onNavigate("grocery")}>Grocery</button>
        </div> */}

        {/* Planner */}
        <div className="overflow-x-auto rounded-2xl bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
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
              {(["breakfast", "lunch", "dinner", "snacks"] as const).map((mealType) => (
                <tr key={mealType} className="border-t dark:border-gray-700">
                  <td className="p-4 capitalize text-gray-700 dark:text-gray-300">
                    {mealType}
                  </td>

                  {daysOfWeek.map((day) => {
                    const meal = weekPlan[day][mealType];
                    return (
                      <td key={day} className="p-2">
                        {meal ? (
                          <div className="relative bg-gray-50 dark:bg-gray-700 p-3 rounded-xl group transition">
                            <img
                              src={meal.image}
                              className="w-14 h-14 rounded-lg object-cover mb-1"
                            />
                            <p className="text-sm text-gray-800 dark:text-gray-100">
                              {meal.name}
                            </p>
                            <button
                              onClick={() => removeMealFromSlot(day, mealType)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectedSlot({ day, meal: mealType })}
                            className="w-full h-24 border-2 border-dashed rounded-xl
                                       flex items-center justify-center
                                       hover:border-green-500 hover:bg-green-50
                                       dark:hover:bg-gray-700 transition"
                          >
                            <Plus className="text-gray-400" />
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-3xl w-full shadow-xl">
            <h3 className="text-xl text-gray-900 dark:text-gray-100 mb-4">
              Select {selectedSlot.meal} for {selectedSlot.day}
            </h3>

            <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
              {getMealsByType(selectedSlot.meal).map((meal) => (
                <div
                  key={meal._id}
                  onClick={() =>
                    addMealToSlot(selectedSlot.day, selectedSlot.meal, meal)
                  }
                  className="cursor-pointer border rounded-xl overflow-hidden
                             hover:shadow-lg transition bg-gray-50 dark:bg-gray-700"
                >
                  <img src={meal.image} className="h-32 w-full object-cover" />
                  <div className="p-3">
                    <h4 className="text-sm text-gray-900 dark:text-gray-100">
                      {meal.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {meal.calories} cal
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedSlot(null)}
              className="mt-6 px-4 py-2 border rounded-lg dark:border-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
