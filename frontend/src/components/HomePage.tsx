import { Card } from '../ui/card.tsx';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Utensils, Calendar, ShoppingCart, Star, TrendingUp, AlertCircle, CheckCircle2, X, Heart, Award, Zap } from 'lucide-react';
import { useEffect, useState } from "react";
import { fetchHomeSummary } from "../api/home";

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
  medicalConditions = ['Hypertension', 'Low Sodium'],
  budget = 'Moderate',
  onNavigate = () => {},
}: HomePageProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState<any>({
    caloriesTarget: 0,
    caloriesConsumed: 0,
    mealsPlanned: [],
    warnings: [],
  });

  useEffect(() => {
    const loadHome = async () => {
      try {
        const data = await fetchHomeSummary();
        setHomeData({
          caloriesTarget: data?.caloriesTarget ?? 0,
          caloriesConsumed: data?.caloriesConsumed ?? 0,
          mealsPlanned: Array.isArray(data?.mealsPlanned) ? data.mealsPlanned : [],
          warnings: Array.isArray(data?.warnings) ? data.warnings : [],
        });
      } catch (err) {
        console.error("Failed to load home summary", err);
      } finally {
        setLoading(false);
      }
    };
    loadHome();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:bg-gray-900 transition-colors duration-500">
        Loading mealfeed...
      </div>
    );
  }

  const weeklyProgress = [
    { day: 'Mon', followed: true },
    { day: 'Tue', followed: true },
    { day: 'Wed', followed: false },
    { day: 'Thu', followed: true },
    { day: 'Fri', followed: true },
    { day: 'Sat', followed: true },
    { day: 'Sun', followed: false },
  ];

  const followedDays = weeklyProgress.filter((d) => d.followed).length;

  const healthInsights = [
    {
      title: 'Low sodium meals recommended home',
      description: 'Based on your hypertension condition',
      icon: Heart,
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/40 dark:to-pink-900/20',
      borderColor: 'border-pink-200 dark:border-pink-800/50',
    },
    {
      title: 'Protein intake on track',
      description: 'You met 95% of your protein goals yesterday',
      icon: TrendingUp,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20',
      borderColor: 'border-emerald-200 dark:border-emerald-800/50',
    },
    {
      title: 'Stay energized!',
      description: 'Balanced macros to keep you active all day',
      icon: Zap,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20',
      borderColor: 'border-amber-200 dark:border-amber-800/50',
    },
  ];

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-slate-950 transition-colors duration-500 ease-in-out">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="space-y-3 p-8 bg-gradient-to-r from-[#16a34a] to-emerald-600 rounded-xl text-white shadow-lg">
          <h1 className="text-4xl">
            {getCurrentGreeting()}, {userName} 👋
          </h1>
          <p className="text-lg text-white/90 dark:text-white/80">
            Your personalized diet journey, simplified.
          </p>
          <div className="flex gap-3 pt-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Award className="h-3 w-3 mr-1" />
              {followedDays} days streak
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Zap className="h-3 w-3 mr-1" />
              On track
            </Badge>
          </div>
        </div>

        {/* Profile Snapshot */}
        <Card className="p-6 bg-white dark:bg-slate-900 shadow-sm border border-gray-200 dark:border-slate-800 transition-all duration-500">
          <h2 className="mb-4 text-gray-900 dark:text-slate-100">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">Diet Preference</p>
              <Badge className="bg-[#16a34a] hover:bg-[#16a34a] text-white border-0">
                🌱 {dietPreference}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">Medical Conditions</p>
              <div className="flex flex-wrap gap-2">
                {medicalConditions.map((condition, idx) => (
                  <Badge key={idx} className="bg-rose-500 hover:bg-rose-500 text-white border-0">
                    ❤️ {condition}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">Budget Level</p>
              <Badge className="bg-violet-500 hover:bg-violet-500 text-white border-0">
                💰 {budget}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#16a34a] group"
            onClick={() => onNavigate('mealFeed')}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl group-hover:bg-[#16a34a] transition-colors duration-300">
                <Utensils className="h-6 w-6 text-[#16a34a] group-hover:text-white" />
              </div>
              <div>
                <h3 className="mb-1 text-gray-900 dark:text-slate-100">Meal Feed</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">Discover personalized meals</p>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 group"
            onClick={() => onNavigate('weeklyPlanner')}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl group-hover:bg-blue-500 transition-colors duration-300">
                <Calendar className="h-6 w-6 text-blue-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="mb-1 text-gray-900 dark:text-slate-100">Weekly Planner</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">Plan your week ahead</p>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-500 group"
            onClick={() => onNavigate('groceryList')}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl group-hover:bg-purple-500 transition-colors duration-300">
                <ShoppingCart className="h-6 w-6 text-purple-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="mb-1 text-gray-900 dark:text-slate-100">Grocery List</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">Auto-generated shopping list</p>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-500 group"
            onClick={() => onNavigate('feedback')}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl group-hover:bg-amber-500 transition-colors duration-300">
                <Star className="h-6 w-6 text-amber-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="mb-1 text-gray-900 dark:text-slate-100">Give Feedback</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">Help us improve</p>
              </div>
            </div>
          </Card>
        </div>

        {/* home at a Glance & Health Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white dark:bg-slate-900 shadow-sm border border-gray-200 dark:border-slate-800 transition-all duration-500">
            <h2 className="mb-4 text-gray-900 dark:text-slate-100">home at a Glance</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-700 dark:text-slate-300">Calories</span>
                  <span className="text-sm bg-[#16a34a] text-white px-3 py-1 rounded-full">
                    {homeData.caloriesConsumed} / {homeData.caloriesTarget} kcal
                  </span>
                </div>
                <Progress 
                  value={(homeData.caloriesConsumed / homeData.caloriesTarget) * 100} 
                  className="h-2 dark:bg-slate-700"
                />
              </div>

              <div>
                <p className="text-sm text-gray-700 dark:text-slate-300 mb-3">Meals home</p>
                <div className="space-y-2">
                  {homeData.mealsPlanned.map((meal:any, idx:number) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                        meal.completed 
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800' 
                          : 'bg-white dark:bg-slate-800/40 border-gray-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {meal.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-[#16a34a]" />
                        ) : (
                          <div className="h-5 w-5 border-2 border-gray-300 dark:border-slate-600 rounded-full" />
                        )}
                        <div>
                          <p className="text-sm text-gray-900 dark:text-slate-100">{meal.type}</p>
                          <p className="text-xs text-gray-600 dark:text-slate-400">{meal.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {homeData.warnings.map((warning:any, idx:number) => (
                <div key={idx} className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                  <p className="text-sm text-emerald-800 dark:text-emerald-300">{warning}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-6 bg-white dark:bg-slate-900 shadow-sm border border-gray-200 dark:border-slate-800 transition-all duration-500">
              <h2 className="mb-4 text-gray-900 dark:text-slate-100">Health Insights 💡</h2>
              <div className="space-y-3">
                {healthInsights.map((insight, idx) => {
                  const Icon = insight.icon;
                  return (
                    <div key={idx} className={`p-4 rounded-lg border transition-colors duration-500 ${insight.bgColor} ${insight.borderColor}`}>
                      <div className="flex gap-3">
                        <div className={`p-2 rounded-lg bg-white dark:bg-slate-900 ${insight.color}`}>
                          <Icon className="h-5 w-5 flex-shrink-0" />
                        </div>
                        <div>
                          <h3 className="text-sm text-gray-900 dark:text-slate-100 mb-1">{insight.title}</h3>
                          <p className="text-xs text-gray-600 dark:text-slate-400">{insight.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-slate-900 shadow-sm border border-gray-200 dark:border-slate-800 transition-all duration-500">
              <h2 className="mb-4 text-gray-900 dark:text-slate-100">This Week's Progress 📊</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-200 dark:border-slate-700">
                  <span className="text-sm text-gray-700 dark:text-slate-300">Consistency</span>
                  <span className="text-sm bg-[#16a34a] text-white px-3 py-1 rounded-full">
                    {followedDays}/7 days
                  </span>
                </div>
                <div className="flex gap-2 justify-between">
                  {weeklyProgress.map((day, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 hover:scale-110 ${
                          day.followed
                            ? 'bg-[#16a34a] text-white'
                            : 'bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-slate-400'
                        }`}
                      >
                        {day.followed ? <CheckCircle2 className="h-5 w-5" /> : <X className="h-5 w-5" />}
                      </div>
                      <span className="text-xs text-gray-600 dark:text-slate-400">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Why These Meals home */}
        <Card className="p-6 bg-white dark:bg-slate-900 shadow-sm border border-gray-200 dark:border-slate-800 transition-all duration-500">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-[#16a34a] to-emerald-600 rounded-xl text-white">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-gray-900 dark:text-slate-100 mb-2">Why These Meals home? 🤔</h2>
              <p className="text-gray-600 dark:text-slate-400">
                Our ML-powered recommendation engine analyzed your health profile and selected home's meals
                specifically for you:
              </p>
            </div>
          </div>
          <ul className="space-y-3 ml-4">
            <li className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-100 dark:border-emerald-900/40">
              <CheckCircle2 className="h-5 w-5 text-[#16a34a] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 dark:text-slate-300">
                <strong className="text-gray-900 dark:text-slate-100">Low sodium content</strong> across all meals to support your hypertension management
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-900/40">
              <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 dark:text-slate-300">
                <strong className="text-gray-900 dark:text-slate-100">High protein, balanced macros</strong> to maintain energy throughout the day
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-100 dark:border-purple-900/40">
              <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 dark:text-slate-300">
                <strong className="text-gray-900 dark:text-slate-100">Budget-friendly ingredients</strong> aligned with your moderate budget preference
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-100 dark:border-amber-900/40">
              <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 dark:text-slate-300">
                <strong className="text-gray-900 dark:text-slate-100">100% vegetarian options</strong> matching your dietary preference
              </span>
            </li>
          </ul>
        </Card>

        {/* Feedback Section */}
        <Card className="p-8 text-center bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-emerald-950/30 border border-emerald-100 dark:border-slate-800 transition-all duration-500">
          <div className="inline-block p-4 bg-white dark:bg-slate-800 rounded-full mb-4 shadow-sm border border-emerald-50 dark:border-slate-700">
            <Star className="h-8 w-8 text-[#16a34a]" />
          </div>
          <h2 className="mb-2 text-gray-900 dark:text-slate-100">How's Your Experience?</h2>
          <p className="text-gray-600 dark:text-slate-400 mb-6">Your feedback helps us personalize better recommendations</p>
          <Button 
            onClick={() => onNavigate('feedback')} 
            className="bg-[#16a34a] hover:bg-emerald-700 text-white px-8 py-6 shadow-md hover:shadow-lg transition-all"
          >
            <Star className="h-5 w-5 mr-2" />
            Share Your Experience
          </Button>
        </Card>
      </div>
    </div>
  );
}