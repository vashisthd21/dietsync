import { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  Clock,
  Users,
  ChefHat,
  RefreshCw,
  ShoppingCart,
  Heart,
  Zap,
  Beef,
  Wheat,
  Droplets,
  Filter,
  Search,
} from "lucide-react";
import type { Meal } from "../types/meal";
import api from "../api/axios";
import type { UserProfile } from "../types/user";

type MealFeedPageProps = {
  userProfile: UserProfile;
  theme: "light" | "dark";
  toggleTheme: () => void;
  onOpenFeedback: () => void;
  onNavigate: (page: "planner" | "grocery") => void;
};


export function MealFeedPage({ userProfile, onNavigate }: MealFeedPageProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  /* --- FILTER STATES --- */
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [maxCalories, setMaxCalories] = useState<number>(1200);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    api
      .get("/api/meals")
      .then((res) => setMeals(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* --- FILTER LOGIC --- */
  const filteredMeals = useMemo(() => {
    return meals.filter((meal) => {
      const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" ||
        meal.tags?.some(tag => tag.toLowerCase() === activeCategory.toLowerCase()) ||
        getNutritionLabel(meal) === activeCategory;
      const matchesCalories = meal.calories <= maxCalories;

      return matchesSearch && matchesCategory && matchesCalories;
    });
  }, [meals, searchQuery, activeCategory, maxCalories]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <RefreshCw className="animate-spin w-8 h-8 text-emerald-500" />
      </div>
    );
  }

  /* ========================= GRID VIEW ========================= */
  if (!selectedMeal) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
          
          {/* TOP BAR: TITLES & SEARCH */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Meal Discovery
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Personalized recommendations for <span className="text-emerald-500 font-semibold">{userProfile.name}</span>
              </p>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
              />
            </div>
          </div>

          {/* FILTER CONTROLS */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {["All", "High Protein", "Low Calorie", "Breakfast", "Vegan", "Keto"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    activeCategory === cat
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-emerald-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-slate-900/50 p-5 rounded-3xl border border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 min-w-fit">
                <Filter size={18} className="text-emerald-500" />
                <span className="text-sm font-bold uppercase tracking-wider">Max Calories</span>
              </div>
              <input 
                type="range" min="200" max="1500" step="50"
                value={maxCalories}
                onChange={(e) => setMaxCalories(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <span className="text-emerald-600 dark:text-emerald-400 font-black min-w-[80px] text-right">
                {maxCalories} kcal
              </span>
            </div>
          </div>

          {/* MEAL GRID */}
          {filteredMeals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
              {filteredMeals.map((meal) => (
                <div
                  key={meal._id}
                  onClick={() => setSelectedMeal(meal)}
                  className="group bg-white dark:bg-slate-900/70 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 hover:shadow-2xl transition-all cursor-pointer"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img src={meal.image} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                      {meal.calories} kcal
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 transition-colors">
                      {meal.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                       <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                       <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                        {getNutritionLabel(meal)}
                       </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900/30 rounded-[3rem] border border-dashed border-slate-300 dark:border-slate-800">
               <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                 <Search size={32} className="text-slate-400" />
               </div>
               <p className="text-slate-500 dark:text-slate-400 font-medium">No meals match your current filters.</p>
               <button 
                onClick={() => {setActiveCategory("All"); setMaxCalories(1200); setSearchQuery("");}}
                className="mt-4 text-emerald-500 font-bold hover:text-emerald-400"
               >
                 Reset all filters
               </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ========================= DETAIL VIEW ========================= */
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => setSelectedMeal(null)} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors font-semibold">
            <ArrowLeft size={18} /> Back to Discovery
          </button>
          {selectedMeal.similarity && (
            <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full">
              AI Confidence: {(selectedMeal.similarity * 100).toFixed(0)}%
            </span>
          )}
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-12 items-start">
        {/* IMAGE: Fixed aspect and size */}
        <div className="w-full sticky top-24">
          <img
            src={selectedMeal.image}
            className="rounded-[3rem] object-cover w-full aspect-square lg:aspect-[4/5] max-h-[500px] lg:max-h-[700px] shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
            alt={selectedMeal.name}
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[3rem] p-8 lg:p-12 border border-slate-200 dark:border-white/10 shadow-xl space-y-10">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              {selectedMeal.name}
            </h1>

            <div className="flex flex-wrap gap-3">
              {selectedMeal.servingSize && <Tag icon={Users} text={`${selectedMeal.servingSize} Servings`} />}
              <Tag icon={ChefHat} text={getDifficulty(selectedMeal)} />
              {selectedMeal.tags?.includes("breakfast") && <Tag icon={Clock} text="Breakfast" />}
            </div>

            <WhyRecommended meal={selectedMeal} />

            <div className="grid grid-cols-2 gap-4">
              <Nutrient icon={Zap} label="Calories" value={`${selectedMeal.calories} kcal`} />
              <Nutrient icon={Beef} label="Protein" value={`${selectedMeal.protein}g`} />
              <Nutrient icon={Wheat} label="Carbs" value={`${selectedMeal.carbs}g`} />
              <Nutrient icon={Droplets} label="Fat" value={`${selectedMeal.fat}g`} />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-5 rounded-3xl transition-all ${
                isSaved ? "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
              }`}
            >
              <Heart fill={isSaved ? "currentColor" : "none"} size={24} />
            </button>
            <button onClick={() => onNavigate("planner")} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-3xl font-bold text-lg shadow-lg shadow-emerald-600/20 transition-transform active:scale-95">
              Plan this meal
            </button>
            <button onClick={() => onNavigate("grocery")} className="p-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-3xl">
              <ShoppingCart size={24} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ========================= COMPONENT HELPERS ========================= */

function Tag({ icon: Icon, text }: any) {
  return (
    <span className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200">
      <Icon size={16} className="text-emerald-500" /> {text}
    </span>
  );
}

function Nutrient({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-white/10 p-4 rounded-3xl">
      <div className="p-2.5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
        <Icon size={20} className="text-emerald-500" />
      </div>
      <div>
        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{label}</p>
        <p className="font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

function WhyRecommended({ meal }: any) {
  const reasons: string[] = [];
  if (meal.dietaryPreference) reasons.push(`Matches ${meal.dietaryPreference} diet`);
  if (meal.protein >= 20) reasons.push("High protein density");
  if (meal.whyRecommended) reasons.push(meal.whyRecommended);

  return (
    <div className="bg-emerald-50/50 dark:bg-emerald-500/5 p-6 rounded-[2rem] border border-emerald-100 dark:border-emerald-500/10">
      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-3">AI Insights</p>
      <ul className="space-y-2">
        {reasons.map((r, i) => (
          <li key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span className="text-emerald-500 text-lg">✦</span> {r}
          </li>
        ))}
      </ul>
    </div>
  );
}

const getNutritionLabel = (meal: Meal) => {
  if (meal.protein >= 20) return "High Protein";
  if (meal.calories <= 400) return "Low Calorie";
  return "Balanced";
};

const getDifficulty = (meal: Meal) => {
  const steps = meal.instructions?.length || 0;
  return steps <= 4 ? "Easy Prep" : steps <= 8 ? "Medium" : "Chef Level";
};