import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Leaf,
  Clock,
  ShoppingCart,
  ChefHat,
  Heart,
  Shield,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';

type LandingPageProps = {
  onGetStarted: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export function LandingPage({
  onGetStarted,
  theme,
  toggleTheme,
}: LandingPageProps) {
  const navigate = useNavigate();

  // 🔐 If already logged in, redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-400" />
            <span className="text-green-700 text-3xl dark:text-green-400">
              DietSync
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            <button
              onClick={handleGoogleLogin}
              className="text-gray-700 hover:text-green-600 dark:text-white transition-colors"
            >
              Login
            </button>

            <button
              onClick={onGetStarted}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl mb-4 dark:text-white">
              Eat smarter.
              <br />
              <span className="text-green-600">Stay healthy.</span>
            </h1>

            <p className="text-gray-600 text-lg mb-8 max-w-xl dark:text-gray-300">
              AI-powered meal recommendations tailored to your health needs.
              Practical recipes, clear nutrition breakdowns, and grocery-ready
              plans.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Google Sign-in */}
              <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 px-6 py-3 dark:bg-gray-100 border border-gray-300 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>

              <button
                onClick={onGetStarted}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Get personalized meals
              </button>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-green-600" />
                Free forever plan available
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-green-600" />
                Nutrition engine powered by USDA
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4 rotate-2">
              <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
                  <img 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop" 
                    alt="Healthy salad bowl"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-500">Breakfast</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
                  <img 
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" 
                    alt="Healthy vegetable dish"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-500">Lunch</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
                  <img 
                    src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop" 
                    alt="Grilled salmon"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-500">Dinner</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
                  <img 
                    src="https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop" 
                    alt="Healthy snacks"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-500">Snacks</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4">
              <div className="flex items-center gap-3">
                <div className="text-green-600">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl text-gray-900">3,200+</div>
                  <div className="text-sm text-gray-500">Healthy recipes</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl p-4">
              <div className="flex items-center gap-3">
                <div className="text-green-600">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl text-gray-900 dark:text-black bg-white">100+</div>
                  <div className="text-sm text-gray-500">Condition filters</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">Personalized nutrition made simple</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From medical conditions to taste preferences, we help you eat better every day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl mb-2">Health-aware recommendations</h3>
            <p className="text-gray-600">
              Meals tailored to your medical conditions, allergies, and dietary restrictions.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <ChefHat className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl mb-2">Smart meal swaps</h3>
            <p className="text-gray-600">
              Don't like an ingredient? Get instant alternatives that match your nutritional needs.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl mb-2">Weekly planner</h3>
            <p className="text-gray-600">
              Plan your entire week in minutes with AI-generated meal schedules.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl mb-2">Grocery lists</h3>
            <p className="text-gray-600">
              Automatically generate shopping lists with budget-friendly options.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl mb-4">Ready to transform your diet?</h2>
          <p className="text-lg mb-8 text-green-50">
            Join thousands of people eating healthier with personalized meal recommendations.
          </p>
          <button 
            onClick={onGetStarted}
            className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Start your journey today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <span>© 2025 DietSync. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-green-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-green-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-green-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
