import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import {
  Utensils,
  Calendar,
  ShoppingCart,
  Star,
  CheckCircle2,
  X,
  Heart,
  Zap,
  Flame,
  Target,
  AlertCircle,
  Wallet,
  Activity
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { fetchHomeSummary } from '../api/home';

/* ---------------- TYPES ---------------- */
interface HomePageProps {
  userName?: string;
  dietPreference?: string[];
  medicalConditions?: string[];
  budget?: string;
  onNavigate?: (page: 'mealFeed' | 'weeklyPlanner' | 'groceryList' | 'feedback') => void;
}

export function HomePage({
  userName = 'Radhika',
  dietPreference = ['Vegetarian'],
  medicalConditions = ['Hypertension'],
  budget = 'Moderate',
  onNavigate = () => { },
}: HomePageProps) {

  /* ===================== STATE & DATA FETCHING ===================== */
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState<any>({
    caloriesTarget: 2000,
    caloriesConsumed: 0,
    mealsPlanned: [],
    warnings: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHomeSummary();
        setHomeData({
          caloriesTarget: data?.caloriesTarget ?? 2000,
          caloriesConsumed: data?.caloriesConsumed ?? 0,
          mealsPlanned: Array.isArray(data?.mealsPlanned) ? data.mealsPlanned : [],
          warnings: data?.warnings ?? [],
        });
      } catch (e) {
        console.error("Dashboard fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  /* ===================== LOGIC & MEMOS ===================== */
  const weeklyProgress = useMemo(() => [
    { day: 'Mon', ok: true },
    { day: 'Tue', ok: true },
    { day: 'Wed', ok: false },
    { day: 'Thu', ok: true },
    { day: 'Fri', ok: true },
    { day: 'Sat', ok: true },
    { day: 'Sun', ok: false },
  ], []);

  const streakDays = weeklyProgress.filter(d => d.ok).length;

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const caloriePercent = useMemo(() => 
    homeData.caloriesTarget > 0
      ? Math.min(100, (homeData.caloriesConsumed / homeData.caloriesTarget) * 100)
      : 0
  , [homeData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-gray-50 dark:bg-slate-950 font-sans">
        <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm font-light">Syncing your nutrition data...</p>
      </div>
    );
  }

  return (
    // 🔥 font-sans + tracking-tight applied for premium feel
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-slate-950 p-4 md:p-8 font-sans antialiased transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden rounded-[2rem] bg-emerald-600 text-white p-10 md:p-12 shadow-xl shadow-emerald-900/10">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
              {greeting}, {userName} 👋
            </h1>
            <p className="text-emerald-50 font-light text-lg max-w-2xl mb-8 leading-relaxed">
              You've completed {streakDays} days of consistent healthy eating this week. Let's hit today's targets!
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-white/10 text-white border-none px-4 py-1.5 font-medium">
                <Flame className="h-4 w-4 mr-2" /> {streakDays}-day streak
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white border-none px-4 py-1.5 font-medium">
                <Target className="h-4 w-4 mr-2" /> On track
              </Badge>
            </div>
          </div>
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"></div>
        </section>

        {/* ================= PROFILE SNAPSHOT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SnapshotCard label="Diet Preference" icon={Utensils} items={dietPreference} color="emerald" />
          <SnapshotCard label="Medical Conditions" icon={Heart} items={medicalConditions} color="rose" />
          <SnapshotCard label="Budget Level" icon={Wallet} items={[budget]} color="amber" />
        </div>

        {/* ================= CALORIES & CONSISTENCY ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calorie Progress */}
          <Card className="p-8 border border-slate-200 shadow-sm dark:bg-slate-900 rounded-[2rem]">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Energy Balance</h3>
                <p className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">Daily Target</p>
              </div>
              <div className="text-right">
                <span className="text-emerald-600 font-semibold text-xl">{homeData.caloriesConsumed}</span>
                <span className="text-slate-400 text-sm font-light ml-1">/ {homeData.caloriesTarget} kcal</span>
              </div>
            </div>
            <Progress value={caloriePercent} className="h-2 bg-slate-100 dark:bg-slate-800" />
          </Card>

          {/* Consistency Tracker */}
          <Card className="p-8 col-span-1 lg:col-span-2 border border-slate-200 shadow-sm dark:bg-slate-900 rounded-[2rem]">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">Weekly Consistency</p>
            <div className="flex justify-between items-center px-4">
              {weeklyProgress.map((d) => (
                <div key={d.day} className="flex flex-col items-center group">
                  <div className={`h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                    d.ok ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-300'
                  }`}>
                    {d.ok ? <CheckCircle2 className="h-6 w-6" /> : <X className="h-5 w-5" />}
                  </div>
                  <span className={`text-xs mt-3 font-medium transition-colors ${isActiveDay(d.day) ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <ActionCard icon={Utensils} title="Meal Feed" desc="Discover personalized meals" color="bg-orange-600" onClick={() => onNavigate('mealFeed')} />
          <ActionCard icon={Calendar} title="Weekly Planner" desc="Plan your week ahead" color="bg-blue-600" onClick={() => onNavigate('weeklyPlanner')} />
          <ActionCard icon={ShoppingCart} title="Grocery List" desc="Auto-generated items" color="bg-emerald-600" onClick={() => onNavigate('groceryList')} />
          <ActionCard icon={Star} title="Feedback" desc="Help us improve" color="bg-purple-600" onClick={() => onNavigate('feedback')} />
        </div>

        {/* ================= MEALS & HEALTH ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8 border border-slate-200 shadow-sm dark:bg-slate-900 rounded-[2rem]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">Today's Meal Plan</h3>
              <Button variant="ghost" size="sm" className="text-xs font-semibold text-emerald-600 hover:bg-emerald-50">View All</Button>
            </div>
            <div className="space-y-4">
              {homeData.mealsPlanned.map((meal: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                      <Utensils className="h-5 w-5 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{meal.type}</span>
                  </div>
                  {meal.completed ? <CheckCircle2 className="h-6 w-6 text-emerald-500" /> : <div className="h-6 w-6 border-2 border-slate-100 rounded-full" />}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 border border-slate-200 shadow-sm dark:bg-slate-900 rounded-[2rem]">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight mb-8">Health Insights</h3>
            <div className="space-y-6">
              <InsightItem icon={Heart} color="text-rose-500" label={`Adjusted for ${medicalConditions.join(', ')}`} />
              <InsightItem icon={Activity} color="text-emerald-500" label="Calorie intake within target range" />
              <InsightItem icon={Zap} color="text-amber-500" label="Balanced macronutrients detected" />
              <InsightItem icon={AlertCircle} color="text-blue-500" label={`${dietPreference[0]} sourcing optimized`} />
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

/* ---------------- HELPER COMPONENTS ---------------- */

function SnapshotCard({ label, icon: Icon, items, color }: any) {
  const themes: any = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100"
  };

  return (
    <Card className="p-8 border border-slate-200 shadow-sm dark:bg-slate-900 rounded-[2rem]">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item: string) => (
          <Badge key={item} className={`${themes[color]} hover:${themes[color]} border px-4 py-1.5 rounded-full font-medium text-xs`}>
            <Icon className="h-3.5 w-3.5 mr-2" /> {item}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

function ActionCard({ icon: Icon, title, desc, color, onClick }: any) {
  return (
    <Card 
      onClick={onClick} 
      className="p-10 cursor-pointer border border-slate-200 shadow-sm bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:bg-slate-900 group flex flex-col items-center text-center rounded-[2rem]"
    >
      <div className={`p-4 rounded-2xl ${color} text-white mb-6 shadow-lg transition-transform group-hover:scale-110`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-white text-xl tracking-tight mb-3">{title}</h3>
      <p className="text-sm text-slate-400 font-light leading-relaxed">{desc}</p>
    </Card>
  );
}

function InsightItem({ icon: Icon, color, label }: any) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 transition-colors group-hover:bg-white border border-transparent group-hover:border-slate-100">
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <span className="text-sm text-slate-600 dark:text-slate-300 font-light tracking-wide leading-relaxed">{label}</span>
    </div>
  );
}

function isActiveDay(day: string) {
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'short' });
  return currentDay === day;
}