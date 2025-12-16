import { useState, useEffect } from 'react';
import {
  Leaf,
  Bell,
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
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  /* ===============================
     Fetch meals (protected)
  =============================== */
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

  const getCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes().toString().padStart(2, '0');
    return `${hour % 12 || 12}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">

      {/* ================= Header ================= */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="px-8 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-semibold text-green-700 dark:text-green-400">
              DietSync
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {getCurrentTime()}
            </span>

            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
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

      {/* ================= Content ================= */}
      <div className="px-8 py-8">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-gray-900 dark:text-white">
            Welcome, {userProfile.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here are your personalized meal recommendations
          </p>
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
            {allMeals.map((meal) => (
              <div
                key={meal.id}
                onClick={() => onMealClick(meal)}
                className="
                  bg-white dark:bg-gray-800
                  border border-gray-200 dark:border-gray-700
                  rounded-2xl
                  shadow-sm hover:shadow-xl
                  transition cursor-pointer
                "
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
                    <div className="
                      text-sm p-3 rounded-lg
                      bg-orange-50 dark:bg-orange-900/30
                      text-orange-800 dark:text-orange-300
                    ">
                      Recommended: {meal.whyRecommended}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= Floating Button ================= */}
      <button
        onClick={onOpenFeedback}
        className="
          fixed bottom-6 right-6
          flex items-center gap-2
          px-5 py-3
          bg-green-600 hover:bg-green-700
          text-white rounded-full
          shadow-lg transition z-50
        "
      >
        <MessageSquarePlus className="w-5 h-5" />
        Share Feedback
      </button>
    </div>
  );
}
