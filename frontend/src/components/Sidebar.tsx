import { useState } from 'react';
// import Logo from '../assets/logo.svg?react';
import {
  Home,
  Leaf,
  Calendar,
  ShoppingCart,
  Moon,
  Sun,
  LogOut,
  User,
  Settings,
  ChevronRight,
} from 'lucide-react';
import type { Page } from '../types/navigation';

type SidebarProps = {
  currentPage: Page;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
  onboardingCompleted: boolean;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const navItems: {
  label: string;
  page: Page;
  icon: React.ElementType;
}[] = [
  { label: 'Home', page: 'home', icon: Home },
  { label: 'Meal Feed', page: 'mealfeed', icon: Leaf },
  { label: 'Weekly Planner', page: 'planner', icon: Calendar },
  { label: 'Grocery List', page: 'grocery', icon: ShoppingCart },
];

export function Sidebar({
  currentPage,
  onLogout,
  onNavigate,
  onboardingCompleted,
  user,
  theme,
  toggleTheme,
}: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const resolveAvatarUrl = (avatar?: string) => {
    if (!avatar) return null;
    if (avatar.startsWith("http")) return avatar;
    return `https://dietsync.onrender.com${avatar}`;
  };
  console.log("User : ",user)
  const avatarUrl = resolveAvatarUrl(user.avatar);

  const handleNavClick = (page: Page) => {
    const restrictedPages = ['planner', 'grocery'];
    if (!onboardingCompleted && restrictedPages.includes(page)) {
      onNavigate('onboarding' as any);
    } else {
      onNavigate(page);
    }
  };

  return (
    <aside 
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      // 🔥 SMOOTHING: cubic-bezier creates a "spring" effect rather than a linear slide
      className={`fixed top-0 left-0 h-screen z-50 flex flex-col border-r transition-[width] duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${isExpanded ? 'w-72' : 'w-20'} 
        bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-slate-200 dark:border-slate-800 px-3 py-6 group/sidebar`}
    >
      {/* ================= LOGO ================= */}
      <div
        className="flex items-center gap-4 mb-10 px-3 cursor-pointer overflow-hidden"
        onClick={() => onNavigate('dashboard' as any)}
      >
        <div className="bg-emerald-500 p-2 rounded-2xl shadow-lg shadow-emerald-500/20 shrink-0 group-hover:rotate-[10deg] transition-transform duration-500">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        {/* <div className="w-11 h-11 bg-emerald-500 rounded-xl flex items-center justify-center">
          <Logo className="w-7 h-7 text-white" />
        </div> */}
        <span className={`text-xl font-black tracking-tighter text-slate-900 dark:text-white transition-all duration-500 ease-in-out
          ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
          DietSync
        </span>
      </div>

      {/* ================= PROFILE BOX ================= */}
      <div className={`flex items-center gap-3 mb-8 p-2 rounded-2xl transition-all duration-500 ease-in-out overflow-hidden
        ${isExpanded ? 'bg-slate-50 dark:bg-slate-900/50 ring-1 ring-slate-100 dark:ring-slate-800' : 'bg-transparent'}`}>
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 overflow-hidden flex-shrink-0 shadow-sm border border-emerald-200/50 dark:border-emerald-800/50">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-500"
              onClick={() => onNavigate('profile')}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          )}
        </div>

        <div className={`flex flex-col transition-all duration-500 delay-75
          ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'}`}>
          <p className="text-sm font-bold truncate text-slate-900 dark:text-white leading-tight">
            {user.name}
          </p>
          <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-500">
            Active
          </p>
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="flex-1 space-y-2">
        {navItems.map(({ label, page, icon: Icon }) => {
          const isActive = currentPage === page;

          return (
            <button
              key={page}
              onClick={() => handleNavClick(page)}
              className={`w-full flex items-center gap-4 px-3 py-3.5 rounded-2xl transition-all duration-300 group/item relative
                ${isActive
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }
              `}
            >
              <Icon className={`w-6 h-6 shrink-0 transition-transform duration-500 ${!isActive && 'group-hover/item:scale-110'}`} />
              <span className={`font-bold text-sm whitespace-nowrap transition-all duration-500
                ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
                {label}
              </span>
              
              {/* Tooltip for collapsed state */}
              <div className={`absolute left-16 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg transition-all duration-300 pointer-events-none whitespace-nowrap z-[100]
                ${!isExpanded ? 'opacity-0 group-hover/item:opacity-100 translate-x-2' : 'opacity-0 hidden'}`}>
                {label}
              </div>
            </button>
          );
        })}
      </nav>

      {/* ================= FOOTER ================= */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-4 px-3 py-3 rounded-2xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-300 group/footer overflow-hidden"
        >
          <div className="shrink-0 transition-transform duration-500 group-hover/footer:rotate-[15deg]">
            {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
          </div>
          <span className={`font-bold text-sm transition-all duration-500 whitespace-nowrap
            ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </span>
        </button>

        {/* Profile Settings */}
        <button
          onClick={() => onNavigate("profile")}
          className={`w-full flex items-center gap-4 px-3 py-3 rounded-2xl transition-all duration-300 group/footer overflow-hidden
            ${currentPage === "profile"
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
              : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
            }
          `}
        >
          <Settings className="w-6 h-6 shrink-0 transition-transform duration-500 group-hover/footer:rotate-90" />
          <span className={`font-bold text-sm transition-all duration-500 whitespace-nowrap
            ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
            Settings
          </span>
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-3 py-3 rounded-2xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all duration-300 group/footer overflow-hidden"
        >
          <LogOut className="w-6 h-6 shrink-0 transition-transform duration-500 group-hover/footer:translate-x-1" />
          <span className={`font-bold text-sm transition-all duration-500 whitespace-nowrap
            ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
            Log Out
          </span>
        </button>
      </div>

      {/* Expand/Collapse Indicator Arrow */}
      <div className={`absolute top-1/2 -right-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full p-1 text-slate-400 transition-all duration-500
        ${isExpanded ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0 animate-pulse'}`}>
         <ChevronRight size={12} />
      </div>
    </aside>
  );
}