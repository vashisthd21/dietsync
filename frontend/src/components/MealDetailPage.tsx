import { useState, useEffect } from "react";
import {
  ArrowLeft, Clock, ChefHat, Calendar, ShoppingCart,
  Zap, Beef, Droplets, Wheat, Info, Heart,
  RefreshCw, CheckCircle
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
  const [servings, setServings] = useState(2);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get(`/api/meals/${mealId}`)
      .then(res => setMeal(res.data))
      .catch(err => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [mealId]);

  if (loading || !meal) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <RefreshCw className="animate-spin w-8 h-8 text-emerald-500" />
      </div>
    );
  }

  const scaled = (val: number) => Math.round(val * (servings / 2));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 font-sans antialiased transition-colors duration-500">
      
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-semibold">Back to discovery</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Match Score: 92%
            </span>
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10 pb-40">
        {/* Hero */}
        <section className="relative h-[32rem] rounded-[3rem] overflow-hidden shadow-2xl">
          <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute bottom-0 p-12">
            <h1 className="text-5xl font-semibold text-white mb-6">
              {meal.name}
            </h1>
            <div className="flex gap-4">
              <Badge icon={Clock} text="25 mins" />
              <Badge icon={ChefHat} text="Easy Prep" />
            </div>
          </div>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* ML Reason */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-500" />
                Why we recommend this
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RecommendationItem text={`Fits ${userProfile.dietPreference?.[0]}`} />
                <RecommendationItem text={`Optimized for ${userProfile.medicalConditions?.[0]}`} />
                <RecommendationItem text="High protein & balanced macros" />
                <RecommendationItem text="Within your calorie budget" />
              </ul>
            </div>
          </div>

          {/* Nutrition */}
          <aside className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
                Nutrition Snapshot
              </h3>
              <div className="space-y-4">
                <NutrientRow icon={Zap} label="Calories" value={scaled(meal.calories)} unit="kcal" />
                <NutrientRow icon={Beef} label="Protein" value={scaled(meal.protein)} unit="g" />
                <NutrientRow icon={Wheat} label="Carbs" value={scaled(meal.carbs)} unit="g" />
                <NutrientRow icon={Droplets} label="Fat" value={scaled(meal.fat)} unit="g" />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ================= FIXED ACTION BAR ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          
          <button
            onClick={() => setSaved(!saved)}
            className={`p-4 rounded-2xl border transition ${
              saved
                ? "text-rose-500 bg-rose-50 border-rose-200"
                : "text-slate-400 bg-slate-50 border-slate-200"
            }`}
          >
            <Heart size={24} fill={saved ? "currentColor" : "none"} />
          </button>

          <button
            onClick={() => onNavigate("planner")}
            className="flex-1 flex items-center justify-center gap-3 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold shadow-lg transition active:scale-95"
          >
            <Calendar size={20} />
            Plan this meal
          </button>

          <button
            onClick={() => onNavigate("grocery")}
            className="p-4 rounded-2xl border bg-slate-50 text-slate-500 hover:text-emerald-600 transition"
          >
            <ShoppingCart size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function NutrientRow({ icon: Icon, label, value, unit }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-emerald-500" />
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {label}
        </span>
      </div>
      <span className="font-bold text-slate-900 dark:text-white">
        {value} <span className="text-xs text-slate-400">{unit}</span>
      </span>
    </div>
  );
}

function RecommendationItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
      <span className="w-2 h-2 bg-emerald-500 rounded-full" />
      {text}
    </li>
  );
}

function Badge({ icon: Icon, text }: any) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm">
      <Icon className="w-4 h-4 text-emerald-400" />
      {text}
    </div>
  );
}
