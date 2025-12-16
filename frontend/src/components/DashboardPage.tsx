import { useState, useEffect } from 'react';
import {
  Leaf,
  Search,
  Bell,
  Filter,
  ChevronDown,
  MessageSquarePlus,
  Sun,
  Moon,
} from 'lucide-react';

import type { UserProfile } from '../types/user';
import type { Meal } from '../types/meal';
import api from '../api/axios';

type DashboardPageProps = {
  userProfile: UserProfile;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onMealClick: (meal: Meal) => void;
  onOpenFeedback: () => void;
};

export function DashboardPage({
  userProfile,
  theme,
  toggleTheme,
  onMealClick,
  onOpenFeedback,
}: DashboardPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] =
    useState<'all' | 'breakfast' | 'lunch' | 'dinner' | 'snacks'>('all');

  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Fetch personalized meals from backend
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await api.get('/api/recommend');
        setAllMeals(res.data);
      } catch (err) {
        console.error('Failed to fetch meals', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const filteredMeals = allMeals.filter((meal) => {
    const matchesSearch = meal.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === 'all' || meal.tags.includes(selectedFilter);

    return matchesSearch && matchesFilter;
  });

  const getCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes().toString().padStart(2, '0');
    return `${hour % 12 || 12}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* ---------------- Header ---------------- */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-40">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-2xl text-green-700 dark:text-green-400">
              DietSync
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-500 dark:text-gray-400">
              {getCurrentTime()}
            </span>

            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* 🌗 Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- Content ---------------- */}
      <div className="px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-gray-900 dark:text-white">
            Welcome, {userProfile.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Here are your personalized meal recommendations
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
              Diet: {userProfile.dietPreference.map((d) => d).join(', ')}
            </span>
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
              Budget: {userProfile.budget}
            </span>
            {userProfile.medicalConditions.map((condition, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search meals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg
                         bg-white dark:bg-gray-800
                         text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-3 border dark:border-gray-700 rounded-lg hover:border-green-500 dark:hover:border-green-400">
            <Filter className="w-5 h-5" />
            Filters
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['all', 'breakfast', 'lunch', 'dinner', 'snacks'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter as any)}
              className={`px-4 py-2 rounded-lg ${
                selectedFilter === filter
                  ? 'bg-green-600 text-white'
                  : 'bg-white dark:bg-gray-800 border dark:border-gray-700 hover:border-green-300'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-20">
            Loading personalized meals...
          </p>
        )}

        {/* Meals Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMeals.map((meal) => (
              <div
                key={meal.id}
                onClick={() => onMealClick(meal)}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition cursor-pointer"
              >
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="h-56 w-full object-cover rounded-t-2xl"
                />
                <div className="p-6">
                  <h3 className="text-xl mb-2 text-gray-900 dark:text-white">
                    {meal.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {meal.calories} Cal • {meal.protein}g Protein •{' '}
                    {meal.carbs}g Carbs
                  </p>

                  {meal.whyRecommended && (
                    <div className="bg-orange-50 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-sm p-3 rounded-lg">
                      Recommended: {meal.whyRecommended}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredMeals.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-20">
            No meals found
          </p>
        )}
      </div>

      {/* ---------------- Floating Feedback Button ---------------- */}
      <button
        className="fixed bottom-6 right-6 flex items-center gap-2 px-5 py-3
                   bg-green-600 text-white rounded-full shadow-lg
                   hover:bg-green-700 transition z-50"
        onClick={onOpenFeedback}
      >
        <MessageSquarePlus className="w-5 h-5" />
        Share Feedback
      </button>
    </div>
  );
}
