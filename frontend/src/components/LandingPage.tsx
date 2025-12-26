// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
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
  TrendingUp,   // ✅ ADD THIS
  // GithubIcon,
  // LinkedinIcon,
  // Instagram,
} from 'lucide-react';
import Logo from '../assets/logo1.svg?react';



import { icons } from "lucide-react";
const Github = icons.Github;
const Linkedin = icons.Linkedin;
const Instagram = icons.Instagram;
// const Youtube = icons.Youtube;



type LandingPageProps = {
  onLogin: () => void;
  onSignup: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};



export function LandingPage({
  onLogin,
  onSignup,
  theme,
  toggleTheme,
}: LandingPageProps) {

  // const navigate = useNavigate();

  // 🔐 If already logged in, redirect to mealfeed
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     navigate('/mealfeed');
  //   }
  // }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5050/auth/google";
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Logo className="w-8 h-8 text-green-400" />
            <span className="text-3xl font-semibold tracking-tight">
  <span className="text-green-600">Diet</span>
  <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
    Sync
  </span>
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
              onClick={onLogin}
              className="text-gray-700 hover:text-green-600 dark:text-white"
            >
              Login
            </button>


            <button
              onClick={onSignup}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
<section className="max-w-7xl mx-auto px-6 py-14">
  <div className="grid lg:grid-cols-2 gap-14 items-center">

    {/* LEFT */}
    <div className="relative animate-fade-up">
      {/* Tagline */}
      <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-1.5
           text-sm font-medium text-green-700"
>
        Your AI-powered nutrition assistant
      </span>

      <h1 className="text-6xl font-extrabold mb-4 dark:text-white leading-tight">
  Eat smarter.
  <br />
  <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
    Stay healthy.
  </span>
</h1>



      <p className="text-gray-600 text-lg mb-8 max-w-xl dark:text-gray-300">
        Personalized meal recommendations based on your health conditions,
        preferences, and goals — powered by AI.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 px-6 py-3
                     bg-white bg-white border border-gray-300 rounded-lg
             shadow-sm hover:shadow-md hover:border-green-600
                     transition-all shadow-sm"
        >
          {/* Google icon unchanged */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
</svg>


          Continue with Google
        </button>

        <button
  onClick={onSignup}
  className="px-8 py-3 bg-green-600 text-white rounded-lg
             hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5
             transition-all duration-200"
>

          Get personalized meals
        </button>
      </div>
      

      {/* Trust points */}
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
          Nutrition engine backed by USDA
        </div>
      </div>
    </div>

    {/* RIGHT (images – kept same, slightly refined motion) */}
    <div className="relative">
      <div className="grid grid-cols-2 gap-4 rotate-2 bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform animate-scale-in [animation-delay:100ms]">
        {[ 
          { src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop", label: "Breakfast" },
          { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop", label: "Lunch" },
          { src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop", label: "Dinner" },
          { src: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop", label: "Snacks" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform animate-scale-in"
          >
            <img src={item.src} alt={item.label} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating stats */}
      <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-green-600" />
          <div>
            <div className="text-2xl text-gray-900">3,200+</div>
            <div className="text-sm text-gray-500">Healthy recipes</div>
          </div>
        </div>
      </div>

      <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl p-4">
        <div className="flex items-center gap-3">
          <Heart className="w-6 h-6 text-green-600" />
          <div>
            <div className="text-2xl text-gray-900">100+</div>
            <div className="text-sm text-gray-500">Condition filters</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>


      {/* How It Works */}
<section className="max-w-7xl mx-auto px-6 py-24">
  {/* Section Heading */}
  <div className="text-center mb-16">
    <h2 className="text-4xl font-semibold mb-4 dark:text-white">
      How DietSync Works
    </h2>
    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      A simple, science-backed approach to help you eat healthier —
      without stress or guesswork.
    </p>
  </div>

  {/* Steps */}
  <div className="grid md:grid-cols-3 gap-8">
    {/* Step 1 */}
    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all">
      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900 mb-6">
        <ChefHat className="w-7 h-7 text-green-600 dark:text-green-400" />
      </div>

      <h3 className="text-xl font-semibold mb-3 dark:text-white">
        Tell us about you
      </h3>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        Share your health conditions, diet preferences, allergies, and goals.
        This helps us understand what your body truly needs.
      </p>
    </div>

    {/* Step 2 */}
    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all">
      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900 mb-6">
        <Sparkles className="w-7 h-7 text-green-600 dark:text-green-400" />
      </div>

      <h3 className="text-xl font-semibold mb-3 dark:text-white">
        Get personalized meals
      </h3>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        Our AI analyzes nutrition data and recommends meals tailored
        specifically to your health, lifestyle, and budget.
      </p>
    </div>

    {/* Step 3 */}
    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all">
      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900 mb-6">
        <ShoppingCart className="w-7 h-7 text-green-600 dark:text-green-400" />
      </div>

      <h3 className="text-xl font-semibold mb-3 dark:text-white">
        Follow your weekly plan
      </h3>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        Track meals, get smart food swaps, and generate grocery lists —
        everything you need to stay consistent effortlessly.
      </p>
    </div>
  </div>
</section>


      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-15">
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

      {/* testimonials */}

{/* Success Stories */}
<section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
    <h2 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
      Real stories. Real impact.
    </h2>
    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
      See how people are improving their health with AI-powered nutrition.
    </p>
  </div>

  {/* Slider */}
  <div className="relative">
    <div className="testimonial-track">
      
      {/* SET 1 */}
      <div className="testimonial-card">
        <p className="text-yellow-500 text-lg mb-2">★★★★★</p>
        <p className="testimonial-text">
          “DietSync helped me control my sodium intake without giving up taste.”
        </p>
        <p className="testimonial-name">Aditi, 24</p>
        <p className="testimonial-tag">Hypertension</p>
      </div>

      <div className="testimonial-card">
        <p className="text-yellow-500 text-lg mb-2">★★★★★</p>
        <p className="testimonial-text">
          “The weekly planner and grocery list save me so much time.”
        </p>
        <p className="testimonial-name">Rohan, 27</p>
        <p className="testimonial-tag">Weight loss</p>
      </div>

      <div className="testimonial-card">
        <p className="text-yellow-500 text-lg mb-2">★★★★☆</p>
        <p className="testimonial-text">
          “Finally an app that understands PCOS and vegetarian diets.”
        </p>
        <p className="testimonial-name">Neha, 26</p>
        <p className="testimonial-tag">PCOS</p>
      </div>

      <div className="testimonial-card">
        <p className="text-yellow-500 text-lg mb-2">★★★★★</p>
        <p className="testimonial-text">
          “Simple recipes, clear nutrition info, zero confusion.”
        </p>
        <p className="testimonial-name">Aman, 30</p>
        <p className="testimonial-tag">Diabetes</p>
      </div>

      {/* SET 2 (EXACT DUPLICATE) */}
      <div className="testimonial-card">
        <p className="text-yellow-500 text-lg mb-2">★★★★★</p>
        <p className="testimonial-text">
          “DietSync helped me control my sodium intake without giving up taste.”
        </p>
        <p className="testimonial-name">Aditi, 24</p>
        <p className="testimonial-tag">Hypertension</p>
      </div>

      <div className="testimonial-card">
        <p className="text-yellow-500 text-lg mb-2">★★★★★</p>
        <p className="testimonial-text">
          “The weekly planner and grocery list save me so much time.”
        </p>
        <p className="testimonial-name">Rohan, 27</p>
        <p className="testimonial-tag">Weight loss</p>
      </div>

      <div className="testimonial-card">
        <p className="text-yellow-500 text-lg mb-2">★★★★☆</p>
        <p className="testimonial-text">
          “Finally an app that understands PCOS and vegetarian diets.”
        </p>
        <p className="testimonial-name">Neha, 26</p>
        <p className="testimonial-tag">PCOS</p>
      </div>

      <div className="testimonial-card">
        <p className="text-yellow-500 text-lg mb-2">★★★★★</p>
        <p className="testimonial-text">
          “Simple recipes, clear nutrition info, zero confusion.”
        </p>
        <p className="testimonial-name">Aman, 30</p>
        <p className="testimonial-tag">Diabetes</p>
      </div>

    </div>
  </div>
</section>



{/* Personalized Meals Preview */}
<section className="max-w-7xl mx-auto px-6 py-20">
  <div className="text-center mb-12">
    <h2 className="text-4xl mb-3 dark:text-white">
      Your Personalized Meal Feed
    </h2>
    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      Meals recommended by our AI based on your health conditions,
      dietary preferences, and goals.
    </p>
  </div>

  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
    
    {/* Meal Card */}
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-2">
      <div className="flex items-center gap-2 mb-2">
        <Leaf className="w-4 h-4 text-green-600" />
        <span className="text-sm text-green-600 font-medium">
          High Protein
        </span>
      </div>
      <h3 className="text-lg text-gray-900 dark:text-white mb-1">
        Paneer Power Bowl
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Supports muscle recovery and energy
      </p>
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-4">
      <div className="flex items-center gap-2 mb-2">
        <Heart className="w-4 h-4 text-rose-500" />
        <span className="text-sm text-rose-500 font-medium">
          Low Sodium
        </span>
      </div>
      <h3 className="text-lg text-gray-900 dark:text-white mb-1">
        Vegetable Khichdi
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Ideal for hypertension management
      </p>
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-4">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="w-4 h-4 text-blue-600" />
        <span className="text-sm text-blue-600 font-medium">
          Diabetes Friendly
        </span>
      </div>
      <h3 className="text-lg text-gray-900 dark:text-white mb-1">
        Balanced Breakfast
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Keeps blood sugar stable
      </p>
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-4">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="w-4 h-4 text-amber-500" />
        <span className="text-sm text-amber-500 font-medium">
          Weight Loss
        </span>
      </div>
      <h3 className="text-lg text-gray-900 dark:text-white mb-1">
        Green Detox Smoothie
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Low calorie, high nutrients
      </p>
    </div>

  </div>

  {/* Trust line */}
  <div className="mt-10 text-center text-sm text-gray-600 dark:text-gray-400">
    ✔ Powered by nutrition science & AI recommendations
  </div>
</section>


      {/* CTA Section */}
<section className="bg-green-50 dark:bg-gray-800/40 py-10">
  <div className="max-w-4xl mx-auto px-6">
    <div className="rounded-2xl border border-green-200 dark:border-green-800
                    bg-white dark:bg-gray-900 p-10 sm:p-12
                    text-center shadow-sm">
      
      <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
        Start eating healthier, effortlessly
      </h2>

      <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
        Personalized meal recommendations based on your health conditions,
        preferences, and goals — powered by AI.
      </p>

      <button
        onClick={onSignup}
        className="px-8 py-4 bg-green-600 text-white rounded-lg
                   hover:bg-green-700 transition-colors text-lg"
      >
        Get personalized meals
      </button>

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Free to use • No credit card required
      </div>
    </div>
  </div>
</section>


{/* footer */}

<footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 pt-16 transition-colors">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

    {/* Brand */}
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Logo className="w-7 h-7 text-green-600 dark:text-green-500" />
        <span className="text-3xl font-semibold tracking-tight">
  <span className="text-green-600">Diet</span>
  <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
    Sync
  </span>
</span>
      </div>

      <p className="leading-relaxed max-w-sm">
        DietSync helps you eat healthier with personalized meal plans powered by
        AI and nutrition science.
      </p>

      {/* Social Icons */}
      <div className="flex gap-4 mt-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-gray-900 dark:hover:text-white"
        >
          <Github className="w-5 h-5" />
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-blue-500"
        >
          <Linkedin className="w-5 h-5" />
        </a>

        <a
          href="https://instagram.com/dietsync"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-pink-500"
        >
          <Instagram className="w-5 h-5" />
        </a>
      </div>
    </div>

    {/* Company */}
    <div>
      <h4 className="text-green-600 dark:text-green-500 font-semibold mb-4">
        Company
      </h4>
      <ul className="space-y-2">
        <li><a href="/about" className="hover:text-gray-900 dark:hover:text-white">About Us</a></li>
        <li><a href="/testimonials" className="hover:text-gray-900 dark:hover:text-white">Testimonials</a></li>
        <li><a href="/contact" className="hover:text-gray-900 dark:hover:text-white">Contact</a></li>
        <li><a href="/privacy" className="hover:text-gray-900 dark:hover:text-white">Privacy Policy</a></li>
        <li><a href="/terms" className="hover:text-gray-900 dark:hover:text-white">Terms & Conditions</a></li>
      </ul>
    </div>

    {/* Resources */}
    <div>
      <h4 className="text-green-600 dark:text-green-500 font-semibold mb-4">
        Resources
      </h4>
      <ul className="space-y-2">
        <li><a href="/" className="hover:text-gray-900 dark:hover:text-white">Home</a></li>
        <li><a href="/blog" className="hover:text-gray-900 dark:hover:text-white">Blog</a></li>
        <li><a href="/recipes" className="hover:text-gray-900 dark:hover:text-white">Healthy Recipes</a></li>
        <li><a href="/planner" className="hover:text-gray-900 dark:hover:text-white">Meal Planner</a></li>
        <li><a href="/faq" className="hover:text-gray-900 dark:hover:text-white">FAQs</a></li>
      </ul>
    </div>

  </div>

  {/* Bottom Bar */}
  <div className="border-t border-gray-200 dark:border-gray-800 mt-12 py-6 text-sm">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-gray-500">
        © 2025 DietSync. AI-driven nutrition, built for real life.
      </p>

      <div className="flex gap-4">
        <a href="/terms" className="hover:text-gray-900 dark:hover:text-white">
          Terms
        </a>
        <a href="/privacy" className="hover:text-gray-900 dark:hover:text-white">
          Privacy
        </a>
      </div>
    </div>
  </div>
</footer>



    </div>
  );
}
