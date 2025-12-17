import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  Users,
  ChefHat,
  RefreshCw,
  Calendar,
  ShoppingCart,
} from "lucide-react";
import type { Meal } from "../types/meal";
import api from "../api/axios";

/* ---------- PROPS ---------- */
type MealFeedPageProps = {
  onNavigate: (page: "planner" | "grocery") => void;
};

/* ---------- ALTERNATIVES ---------- */
const alternativeIngredients: Record<string, string[]> = {
  eggs: ["silken tofu", "flax eggs", "chia eggs"],
  spinach: ["kale", "arugula", "swiss chard"],
  mushroom: ["zucchini", "eggplant", "bell peppers"],
  "bell pepper": ["cherry tomatoes", "zucchini", "carrots"],
  salmon: ["cod", "halibut", "tilapia"],
  chicken: ["turkey", "tofu", "tempeh"],
  quinoa: ["brown rice", "farro", "bulgur"],
  broccoli: ["green beans", "asparagus", "brussels sprouts"],
};

export function MealFeedPage({ onNavigate }: MealFeedPageProps) {
  /* ---------- STATE ---------- */
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [servings, setServings] = useState(2);
  const [adding, setAdding] = useState(false);

  /* ---------- FETCH ALL MEALS ---------- */
  useEffect(() => {
    api
      .get("/api/meals")
      .then((res) => setMeals(res.data))
      .catch((err) => console.error("Failed to fetch meals", err))
      .finally(() => setLoading(false));
  }, []);

  /* ---------- HELPERS ---------- */
  const getIngredientKey = (ingredient: string) => {
    const lower = ingredient.toLowerCase();
    return Object.keys(alternativeIngredients).find((key) =>
      lower.includes(key)
    );
  };

  const getAlternatives = (ingredient: string) => {
    const key = getIngredientKey(ingredient);
    return key ? alternativeIngredients[key] : [];
  };

  const scaled = (value: number) =>
    Math.round(value * (servings / 2));

  /* ---------- ACTIONS ---------- */
  const addIngredientsToGrocery = async () => {
  if (!selectedMeal) return;
  setAdding(true);

  try {
    // Send all ingredients in one go
    await api.post("/api/grocery/add-bulk", {
      items: selectedMeal.ingredients.map(ing => ({
        name: ing,
        quantity: "1",
        category: "Fresh Produce"
      }))
    });

    onNavigate("grocery");
  } catch (err) {
    console.error("Failed to add ingredients:", err);
  } finally {
    setAdding(false);
  }
};

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 bg-gray-50 dark:bg-slate-950 transition-colors duration-500">
        <div className="animate-pulse flex items-center gap-2">
           <RefreshCw className="animate-spin w-5 h-5 text-[#16a34a]" />
           Loading meals...
        </div>
      </div>
    );
  }

  /* =========================================================
      ===================== MEAL LIST =========================
      ========================================================= */
  if (!selectedMeal) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6 transition-colors duration-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.map((meal) => (
            <div
              key={meal._id}
              onClick={() => setSelectedMeal(meal)}
              className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-xl hover:border-[#16a34a] dark:hover:border-[#16a34a] cursor-pointer transition-all duration-300 overflow-hidden"
            >
              <div className="overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl text-gray-900 dark:text-slate-100 mb-1">{meal.name}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">
                  {meal.calories} kcal • 30 mins
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* =========================================================
      ===================== MEAL DETAIL UI ====================
      ========================================================= */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-500">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSelectedMeal(null)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg text-gray-900 dark:text-slate-100">Back to Feed</h2>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="relative h-[450px] rounded-[2rem] overflow-hidden mb-8 shadow-2xl border border-white/10">
          <img
            src={selectedMeal.image}
            alt={selectedMeal.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-0 p-10 text-white">
            <h1 className="text-5xl font-light tracking-tight mb-6">{selectedMeal.name}</h1>
            <div className="flex flex-wrap gap-6">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <Clock className="w-4 h-4 text-emerald-400" /> 30 mins
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <Users className="w-4 h-4 text-emerald-400" /> {servings} servings
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <ChefHat className="w-4 h-4 text-emerald-400" /> Easy
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 transition-all">
            <h3 className="text-2xl text-gray-900 dark:text-slate-100 mb-6">Ingredients</h3>

            <ul className="space-y-3">
              {selectedMeal.ingredients.map((ingredient, i) => {
                const alternatives = getAlternatives(ingredient);
                const selected = selectedIngredient === ingredient;

                return (
                  <li key={i}>
                    <div
                      onClick={() =>
                        alternatives.length &&
                        setSelectedIngredient(selected ? null : ingredient)
                      }
                      className={`flex justify-between items-center p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${
                        selected 
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' 
                        : 'hover:bg-gray-50 dark:hover:bg-slate-800 border-transparent'
                      }`}
                    >
                      <span className="text-gray-700 dark:text-slate-300">{ingredient}</span>
                      {alternatives.length > 0 && (
                        <RefreshCw className={`w-4 h-4 transition-transform duration-500 ${selected ? 'rotate-180 text-emerald-600' : 'text-emerald-500'}`} />
                      )}
                    </div>

                    {selected && (
                      <div className="ml-4 mt-2 p-4 bg-emerald-50/50 dark:bg-emerald-950/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 animate-in slide-in-from-top-2 duration-300">
                        <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider mb-3">Healthier Alternatives</p>
                        <div className="flex flex-wrap gap-2">
                          {alternatives.map((alt) => (
                            <span
                              key={alt}
                              className="px-4 py-1.5 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 border border-emerald-100 dark:border-emerald-800 shadow-sm rounded-full text-sm"
                            >
                              {alt}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Nutrition */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 transition-all">
              <h3 className="text-xl text-gray-900 dark:text-slate-100 mb-6">Nutrition Per Serving</h3>

              <div className="space-y-4">
                {[
                  { label: "Calories", val: scaled(selectedMeal.calories), unit: "kcal", color: "text-[#16a34a]" },
                  { label: "Protein", val: scaled(selectedMeal.protein), unit: "g", color: "text-blue-500" },
                  { label: "Carbs", val: scaled(selectedMeal.carbs), unit: "g", color: "text-amber-500" },
                  { label: "Fat", val: scaled(selectedMeal.fat), unit: "g", color: "text-rose-500" }
                ].map((nutri) => (
                  <div key={nutri.label} className="flex justify-between items-center pb-3 border-b border-gray-50 dark:border-slate-800 last:border-0">
                    <span className="text-gray-600 dark:text-slate-400">{nutri.label}</span>
                    <span className={`font-bold ${nutri.color}`}>{nutri.val}{nutri.unit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => onNavigate("planner")}
                  className="w-full bg-[#16a34a] hover:bg-emerald-700 text-white py-4 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95 flex items-center justify-center font-semibold"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Add to Planner
                </button>

                <button
                  onClick={addIngredientsToGrocery}
                  disabled={adding}
                  className="w-full border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:border-[#16a34a] hover:text-[#16a34a] py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center font-semibold disabled:opacity-50"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {adding ? "Adding..." : "Add to Grocery List"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}