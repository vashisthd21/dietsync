import { useState } from 'react';
import { Leaf, Calendar, ChevronLeft, ChevronRight, Plus, Trash2, Download, ArrowLeft } from 'lucide-react';
import type { UserProfile } from '../types/user';
import { getMealsForUser } from '../data/meals';

type WeeklyPlannerPageProps = {
  userProfile: UserProfile;
  onNavigate: (page: 'mealfeed' | 'planner' | 'grocery') => void;
};

type MealSlot = {
  id: string;
  name: string;
  calories: number;
  image: string;
} | null;

type DayPlan = {
  breakfast: MealSlot;
  lunch: MealSlot;
  dinner: MealSlot;
  snacks: MealSlot;
};

type WeekPlan = {
  [key: string]: DayPlan;
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function WeeklyPlannerPage({ userProfile, onNavigate }: WeeklyPlannerPageProps) {
  const allMeals = getMealsForUser(userProfile);
  const [currentWeekStart, setCurrentWeekStart] = useState(0);
  const [weekPlan, setWeekPlan] = useState<WeekPlan>(() => {
    const initialPlan: WeekPlan = {};
    daysOfWeek.forEach(day => {
      initialPlan[day] = {
        breakfast: null,
        lunch: null,
        dinner: null,
        snacks: null,
      };
    });
    return initialPlan;
  });
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; meal: keyof DayPlan } | null>(null);

  const getMealsByType = (type: string) => {
    return allMeals.filter(meal => meal.tags.includes(type));
  };

  const addMealToSlot = (day: string, mealType: keyof DayPlan, meal: any) => {
    setWeekPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: {
          id: meal.id,
          name: meal.name,
          calories: meal.calories,
          image: meal.image,
        }
      }
    }));
    setSelectedSlot(null);
  };

  const removeMealFromSlot = (day: string, mealType: keyof DayPlan) => {
    setWeekPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: null
      }
    }));
  };

  const autoGenerateWeek = () => {
    const newPlan: WeekPlan = {};
    daysOfWeek.forEach(day => {
      const breakfastMeals = getMealsByType('breakfast');
      const lunchMeals = getMealsByType('lunch');
      const dinnerMeals = getMealsByType('dinner');
      const snackMeals = getMealsByType('snacks');

      newPlan[day] = {
        breakfast: breakfastMeals[Math.floor(Math.random() * breakfastMeals.length)] 
          ? { 
              id: breakfastMeals[Math.floor(Math.random() * breakfastMeals.length)].id,
              name: breakfastMeals[Math.floor(Math.random() * breakfastMeals.length)].name,
              calories: breakfastMeals[Math.floor(Math.random() * breakfastMeals.length)].calories,
              image: breakfastMeals[Math.floor(Math.random() * breakfastMeals.length)].image,
            } 
          : null,
        lunch: lunchMeals[Math.floor(Math.random() * lunchMeals.length)]
          ? {
              id: lunchMeals[Math.floor(Math.random() * lunchMeals.length)].id,
              name: lunchMeals[Math.floor(Math.random() * lunchMeals.length)].name,
              calories: lunchMeals[Math.floor(Math.random() * lunchMeals.length)].calories,
              image: lunchMeals[Math.floor(Math.random() * lunchMeals.length)].image,
            }
          : null,
        dinner: dinnerMeals[Math.floor(Math.random() * dinnerMeals.length)]
          ? {
              id: dinnerMeals[Math.floor(Math.random() * dinnerMeals.length)].id,
              name: dinnerMeals[Math.floor(Math.random() * dinnerMeals.length)].name,
              calories: dinnerMeals[Math.floor(Math.random() * dinnerMeals.length)].calories,
              image: dinnerMeals[Math.floor(Math.random() * dinnerMeals.length)].image,
            }
          : null,
        snacks: snackMeals[Math.floor(Math.random() * snackMeals.length)]
          ? {
              id: snackMeals[Math.floor(Math.random() * snackMeals.length)].id,
              name: snackMeals[Math.floor(Math.random() * snackMeals.length)].name,
              calories: snackMeals[Math.floor(Math.random() * snackMeals.length)].calories,
              image: snackMeals[Math.floor(Math.random() * snackMeals.length)].image,
            }
          : null,
      };
    });
    setWeekPlan(newPlan);
  };

  const getTotalCaloriesForDay = (day: string) => {
    const dayPlan = weekPlan[day];
    return (
      (dayPlan.breakfast?.calories || 0) +
      (dayPlan.lunch?.calories || 0) +
      (dayPlan.dinner?.calories || 0) +
      (dayPlan.snacks?.calories || 0)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Leaf className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl">Weekly Planner</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={autoGenerateWeek}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Auto-Generate Week
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-green-500 transition-colors">
                <Download className="w-5 h-5" />
                Export Plan
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => onNavigate('mealfeed')}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Meal Feed
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
            Weekly Planner
          </button>
          <button
            onClick={() => onNavigate('grocery')}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Grocery List
          </button>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <h2 className="text-xl">This Week</h2>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Planner Grid */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 w-32">Meal Type</th>
                  {daysOfWeek.map(day => (
                    <th key={day} className="text-left p-4 min-w-[200px]">
                      <div>
                        <div className="text-sm text-gray-900">{day}</div>
                        <div className="text-xs text-gray-500">
                          {getTotalCaloriesForDay(day)} cal
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(['breakfast', 'lunch', 'dinner', 'snacks'] as const).map(mealType => (
                  <tr key={mealType} className="border-b">
                    <td className="p-4 text-gray-700 capitalize">{mealType}</td>
                    {daysOfWeek.map(day => {
                      const meal = weekPlan[day][mealType];
                      return (
                        <td key={day} className="p-2">
                          {meal ? (
                            <div className="relative group">
                              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-green-300 transition-all">
                                <div className="flex items-start gap-2">
                                  <img
                                    src={meal.image}
                                    alt={meal.name}
                                    className="w-12 h-12 rounded object-cover"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm truncate">{meal.name}</p>
                                    <p className="text-xs text-gray-500">{meal.calories} cal</p>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => removeMealFromSlot(day, mealType)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setSelectedSlot({ day, meal: mealType })}
                              className="w-full h-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-center"
                            >
                              <Plus className="w-5 h-5 text-gray-400" />
                            </button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Meal Selection Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b">
              <h3 className="text-2xl mb-2">
                Select {selectedSlot.meal} for {selectedSlot.day}
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {getMealsByType(selectedSlot.meal).map(meal => (
                  <div
                    key={meal.id}
                    onClick={() => addMealToSlot(selectedSlot.day, selectedSlot.meal, meal)}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-green-50 border border-transparent hover:border-green-300 cursor-pointer transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-20 h-20 rounded object-cover"
                      />
                      <div>
                        <h4 className="mb-1">{meal.name}</h4>
                        <p className="text-sm text-gray-600">{meal.calories} cal</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {meal.protein}g protein • {meal.carbs}g carbs
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t">
              <button
                onClick={() => setSelectedSlot(null)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}