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
  { label: 'Meal Feed', page: 'feed', icon: Leaf },
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
  return (
    <aside className="w-64 h-screen bg-white border-r px-4 py-6 flex flex-col">
      
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className='cursor-pointer flex items-center gap-2' >
          <Leaf className="w-7 h-7 text-green-600"  onClick={() => onNavigate('dashboard')} />
          <span className="text-xl font-semibold text-green-700" onClick={() => onNavigate('dashboard')}>
            DietSync
          </span>
        </div>
        
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-gray-50">
        <div className="w-12 h-12 rounded-full bg-green-100 overflow-hidden flex-shrink-0">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover block"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-6 h-6 text-green-700" />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{user.name}</p>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>
      </div>


      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ label, page, icon: Icon }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              currentPage === page
                ? 'bg-green-100 text-green-700'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}
      </nav>

      {/* Theme */}
      <button
        onClick={toggleTheme}
        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 mt-4"
      >
        {theme === 'light' ? <Moon /> : <Sun />}
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>

      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 mt-2"
      >
        <LogOut />
        Logout
      </button>
    </aside>
  );
}
