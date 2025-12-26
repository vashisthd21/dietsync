import { 
  Leaf, Calendar, ShoppingCart, User, Flame, 
 List, ArrowUpRight, Target, Activity 
} from "lucide-react";

type DashboardPageProps = {
  userName: string;
  onboardingCompleted: boolean;
  onNavigate: (page: "mealfeed" | "planner" | "grocery" | "profile" | "onboarding") => void;
};

export function DashboardPage({ userName, onboardingCompleted, onNavigate }: DashboardPageProps) {
  
  const handleProtectedNavigation = (page: "mealfeed" | "planner" | "grocery" | "profile") => {
    if (!onboardingCompleted && (page === "planner" || page === "grocery")) {
      onNavigate("onboarding");
      return;
    }
    onNavigate(page);
  };

  return (
    // 🔥 font-sans + antialiased applied for a clean, professional feel
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-slate-950 p-6 lg:p-12 font-sans antialiased transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* ================= HEADER SECTION ================= */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-2 block">
              Nutrition Intelligence
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight">
              Welcome back, {userName} 👋
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-light leading-relaxed">
              Your nutrition journey is <span className="text-emerald-600 font-medium">85% optimized</span> this week.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="bg-emerald-50 dark:bg-emerald-950 p-2.5 rounded-xl">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="pr-4">
              <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1 tracking-wider">Daily Goal</p>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">2,400 kcal</p>
            </div>
          </div>
        </header>

        {/* ================= KEY PERFORMANCE INDICATORS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <StatCard 
            label="Daily Energy" 
            value="2,100" 
            unit="kcal" 
            trend="+12%"
            icon={Flame} 
            color="orange"
          />
          <StatCard 
            label="Plan Adherence" 
            value="92" 
            unit="%" 
            trend="Stable"
            icon={Activity} 
            color="emerald"
          />
          <StatCard 
            label="Grocery Items" 
            value="18" 
            unit="pending" 
            trend="-4"
            icon={ShoppingCart} 
            color="blue"
          />
        </div>

        {/* ================= BENTO ACTION GRID ================= */}
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8 px-1">
          Navigation Hub
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="md:col-span-2 md:row-span-2">
             <ActionCard
                featured
                title='Unlock Your "Meal Battle Plan"'
                description="Our AI has curated 12 new recipes matching your PCOS health focus and budget targets."
                icon={Leaf}
                onClick={() => handleProtectedNavigation("mealfeed")}
             />
          </div>

          <ActionCard
            title="Weekly Planner"
            description="Schedule your micro-nutrients with your AI Mentor."
            icon={Calendar}
            locked={!onboardingCompleted}
            onClick={() => handleProtectedNavigation("planner")}
          />

          <ActionCard
            title="Grocery Hub"
            description="Receive priority support for ingredient sourcing."
            icon={List}
            locked={!onboardingCompleted}
            onClick={() => handleProtectedNavigation("grocery")}
          />

          <ActionCard
            title="Bio-Data Profile"
            description="Update health metrics and goals."
            icon={User}
            onClick={() => onNavigate("profile")}
          />

          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2rem] p-8 flex flex-col justify-between text-white shadow-xl shadow-emerald-900/10 transition-transform hover:scale-[1.02]">
             <div className="bg-white/20 w-fit p-2.5 rounded-xl backdrop-blur-md">
               <ArrowUpRight className="w-5 h-5" />
             </div>
             <div>
               <p className="font-semibold text-xl leading-tight mb-2">Pro Tip:</p>
               <p className="text-emerald-50 font-light text-sm leading-relaxed italic">
                 "Small healthy choices made daily create massive results over time."
               </p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ===================== SUB COMPONENTS ===================== */

function StatCard({ label, value, unit, icon: Icon, color, trend }: any) {
  const themes: any = {
    orange: "text-orange-600 bg-orange-50 dark:bg-orange-950/30 border-orange-100",
    emerald: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100",
    blue: "text-blue-600 bg-blue-50 dark:bg-blue-950/30 border-blue-100",
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-2xl ${themes[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${trend.includes('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-500'}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">{label}</p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">{value}</h3>
          <span className="text-slate-400 font-light text-sm">{unit}</span>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ title, description, icon: Icon, onClick, featured, locked }: any) {
  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded-[2.5rem] transition-all duration-500 hover:-translate-y-1
        ${featured 
          ? 'bg-white dark:bg-slate-900 p-12 border border-slate-200 dark:border-slate-800 h-full shadow-lg hover:shadow-xl hover:border-emerald-500/30' 
          : 'bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/30'}
      `}
    >
      <div className={`mb-8 flex items-center justify-between`}>
        <div className={`rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110
          ${featured ? 'w-16 h-16 bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'w-12 h-12 bg-slate-50 dark:bg-slate-800 text-emerald-600'}
        `}>
          <Icon className={`${featured ? 'w-8 h-8' : 'w-6 h-6'}`} />
        </div>
        {locked && (
           <span className="bg-rose-50 dark:bg-rose-950 text-rose-500 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-rose-100 dark:border-rose-900/50">Locked</span>
        )}
      </div>

      <h3 className={`${featured ? 'text-2xl font-semibold' : 'text-xl font-semibold'} text-slate-900 dark:text-white mb-3 tracking-tight`}>
        {title}
      </h3>
      <p className={`text-slate-500 dark:text-slate-400 font-light leading-relaxed ${featured ? 'text-lg' : 'text-sm'}`}>
        {description}
      </p>

      {featured && (
        <Activity className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-50 dark:text-slate-800/10 -rotate-12 transition-transform duration-700 group-hover:rotate-0" />
      )}
    </div>
  );
}