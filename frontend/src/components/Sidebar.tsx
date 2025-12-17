import {
  Home,
  Leaf,
  Calendar,
  ShoppingCart,
  Moon,
  Sun,
  LogOut,
  User,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import type { Page } from '../types/navigation';


type SidebarProps = {
  currentPage: Page;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
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
  user,
  theme,
  toggleTheme,
}: SidebarProps) {
  const navigate = useNavigate();
  return (
    <aside className="w-64 h-screen flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 px-4 py-6">

      {/* Logo */}
      <div
        className="flex items-center gap-2 mb-8 cursor-pointer"
        onClick={() => onNavigate('dashboard')}
      >
        <Leaf className="w-7 h-7 text-green-600" />
        <span className="text-xl font-semibold text-green-700 dark:text-green-400">
          DietSync
        </span>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 overflow-hidden flex-shrink-0">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              onClick={() => navigate("/profile")}
              className="w-full h-full object-cover cursor-pointer rounded-full"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-6 h-6 text-green-700 dark:text-green-400" />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-100">
            {user.name}
          </p>
          <p className="text-xs truncate text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ label, page, icon: Icon }) => {
          const isActive = currentPage === page;

          return (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                ${
                  isActive
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg mt-4
                   text-gray-700 dark:text-gray-300
                   hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        {theme === 'light' ? (
          <>
            <Moon className="w-5 h-5" />
            Dark Mode
          </>
        ) : (
          <>
            <Sun className="w-5 h-5" />
            Light Mode
          </>
        )}
      </button>
      <button
  onClick={() => onNavigate("profile")}
  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
    ${
      currentPage === "profile"
        ? "bg-green-100 text-green-700"
        : "hover:bg-green-50 text-gray-700"
    }
  `}
>
  <User className="w-5 h-5" />
  Profile Settings
</button>
      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg mt-2
                   text-red-600 dark:text-red-400
                   hover:bg-red-50 dark:hover:bg-red-900/20 transition"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
}
