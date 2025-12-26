import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  ChefHat,
  Calendar,
  ShoppingCart,
  Zap,
  Beef,
  Droplets,
  Wheat,
  Info,
  Heart,
  RefreshCw,
  CheckCircle,
} from "lucide-react";
import type { Meal } from "../types/meal";
import api from "../api/axios";
import type { UserProfile } from "../types/user";

type MealDetailPageProps = {
  mealId: string;
  userProfile: UserProfile;
  onBack: () => void;
  onNavigate: (page: "planner" | "grocery") => void;
};

export function MealDetailPage({
  mealId,
  userProfile,
  onBack,
  onNavigate,
}: MealDetailPageProps) {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api
      .get(`/api/meals/${mealId}`)
      .then((res) => setMeal(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [mealId]);

  if (loading || !meal) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <RefreshCw className="animate-spin w-8 h-8 text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600"
          >
            <ArrowLeft size={18} />
            Back to Discovery
          </button>

          <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full text-emerald-700 text-xs font-bold">
            <CheckCircle size={14} /> AI Confidence: 91%
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* LEFT: IMAGE */}
          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl">
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-3">{meal.name}</h1>
              <div className="flex gap-3 text-sm">
                <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                  <Clock size={14} /> 30 mins
                </span>
                <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                  <ChefHat size={14} /> Easy Prep
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: ACTION PANEL */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow border flex flex-col justify-between">
            {/* WHY RECOMMENDED */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <Info size={14} className="text-emerald-500" />
                Why we recommend this
              </h3>

              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li>✔ Matches your {userProfile.dietPreference[0]} diet</li>
                <li>✔ Optimized for {userProfile.medicalConditions[0]}</li>
                <li>✔ Balanced protein & calories</li>
              </ul>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-4 mt-8">
              <button
                onClick={() => setSaved(!saved)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border transition ${
                  saved
                    ? "bg-rose-50 text-rose-600 border-rose-200"
                    : "bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                <Heart fill={saved ? "currentColor" : "none"} />
                {saved ? "Saved to Favorites" : "Save Meal"}
              </button>

              <button
                onClick={() => onNavigate("planner")}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold shadow-lg"
              >
                <Calendar className="inline mr-2" />
                Plan this meal for my day
              </button>

              <button
                onClick={() => onNavigate("grocery")}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-600 hover:text-emerald-600"
              >
                <ShoppingCart size={18} />
                Add ingredients to grocery list
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NUTRITION SNAPSHOT */}
      <section className="max-w-6xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <NutritionCard icon={Zap} label="Calories" value={meal.calories} unit="kcal" />
        <NutritionCard icon={Beef} label="Protein" value={meal.protein} unit="g" />
        <NutritionCard icon={Wheat} label="Carbs" value={meal.carbs} unit="g" />
        <NutritionCard icon={Droplets} label="Fat" value={meal.fat} unit="g" />
      </section>
    </div>
  );
}

/* ---------- HELPERS ---------- */

function NutritionCard({ icon: Icon, label, value, unit }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm text-center">
      <Icon className="mx-auto text-emerald-500 mb-2" />
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">
        {value}
        <span className="text-xs text-slate-400 ml-1">{unit}</span>
      </p>
    </div>
  );
}
