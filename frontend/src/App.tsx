import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { OnboardingPage } from "./components/OnboardingPage";
import { HomePage } from "./components/HomePage";
import { DashboardPage } from "./components/DashboardPage";
import { MealFeedPage } from "./components/MealFeedPage";
import { WeeklyPlannerPage } from "./components/WeeklyPlannerPage";
import { GroceryListPage } from "./components/GroceryListPage";
import { ProfileSettingsPage } from "./components/ProfileSettings";
import { Sidebar } from "./components/Sidebar";
import { FeedbackModel } from "./components/FeedbackModel";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";

import api from "./api/axios";

import type { Page } from "./types/navigation";
import type { UserProfile } from "./types/user";

export default function App() {
  const [pageStack, setPageStack] = useState<Page[]>(["landing"]);
  const currentPage = pageStack[pageStack.length - 1];

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  console.log(loadingProfile);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const goTo = (page: Page) => {
    // 🔥 STRICT GATEKEEPER: Force onboarding if profile is incomplete
    const restrictedPages: Page[] = ["planner", "grocery", "home", "mealfeed"];
    if (userProfile && !userProfile.onboardingCompleted && restrictedPages.includes(page)) {
      setPageStack(["onboarding"]);
      return;
    }
    setPageStack((prev) => (prev[prev.length - 1] === page ? prev : [...prev, page]));
  };

  const goBack = () => setPageStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));

  const fetchUserProfile = async () => {
    setLoadingProfile(true);
    try {
      const res = await api.get("/api/profile");
      setUserProfile(res.data);
      if (res.data.onboardingCompleted) {
        setPageStack(["dashboard"]);
      } else {
        setPageStack(["onboarding"]);
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        setPageStack(["onboarding"]);
      } else {
        localStorage.removeItem("token");
        setPageStack(["landing"]);
      }
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token") || localStorage.getItem("token");
    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, "", "/");
      fetchUserProfile();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUserProfile(null);
    setPageStack(["landing"]);
  };

  const dashboardPages: Page[] = ["dashboard", "home", "mealfeed", "planner", "grocery", "profile"];
  const showSidebar = userProfile && dashboardPages.includes(currentPage);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
        
        {/* Sidebar */}
        {showSidebar && (
          <Sidebar
            currentPage={currentPage}
            onNavigate={goTo}
            onLogout={handleLogout}
            onboardingCompleted={userProfile.onboardingCompleted}
            theme={theme}
            toggleTheme={toggleTheme}
            user={{
              name: userProfile.name,
              email: userProfile.email,
              avatar: userProfile.avatar,
            }}
          />
        )}

        {/* 🔥 MAIN CONTENT: Added transition and padding-left to offset sidebar */}
        <main 
          className={`flex-1 h-screen overflow-y-auto transition-all duration-500 ease-in-out ${
            showSidebar ? "pl-20" : "pl-0"
          }`}
        >
          <div className="w-full min-h-full">
            {currentPage === "landing" && (
              <LandingPage onLogin={() => goTo("login")} onSignup={() => goTo("signup")} theme={theme} toggleTheme={toggleTheme} />
            )}

            {currentPage === "login" && (
              <LoginPage onGoogleLogin={() => (window.location.href = "http://localhost:5050/auth/google")} onLoginSuccess={fetchUserProfile} onGoToSignup={() => goTo("signup")} onBackToHome={() => goTo("landing")} />
            )}

            {currentPage === "signup" && (
              <SignupPage onGoogleSignup={() => (window.location.href = "http://localhost:5050/auth/google")} onSignupSuccess={() => setPageStack(["onboarding"])} onGoToLogin={() => goTo("login")} onBackToHome={() => goTo("landing")} />
            )}

            {currentPage === "onboarding" && (
              <OnboardingPage isLoggedIn={!!userProfile} onComplete={async (p) => { try { await api.post("/api/profile", p); fetchUserProfile(); } catch (e) { console.error(e); } }} onBack={() => userProfile ? setPageStack(["dashboard"]) : setPageStack(["landing"])} />
            )}

            {currentPage === "dashboard" && userProfile && (
              <DashboardPage userName={userProfile.name} onboardingCompleted={userProfile.onboardingCompleted} onNavigate={goTo} />
            )}

            {currentPage === "home" && userProfile && (
              <HomePage userName={userProfile.name} dietPreference={userProfile.dietPreference} medicalConditions={userProfile.medicalConditions} budget={userProfile.budget} onNavigate={(p) => p === "feedback" ? setShowFeedback(true) : goTo(p === "mealFeed" ? "mealfeed" : p === "weeklyPlanner" ? "planner" : "grocery")} />
            )}

            {currentPage === "mealfeed" && userProfile && (
              <MealFeedPage userProfile={userProfile} theme={theme} toggleTheme={toggleTheme} onOpenFeedback={() => setShowFeedback(true)} onNavigate={goTo} />
            )}

            {currentPage === "planner" && userProfile && <WeeklyPlannerPage userProfile={userProfile} onNavigate={goTo} />}
            {currentPage === "grocery" && userProfile && <GroceryListPage userProfile={userProfile} onNavigate={goTo} />}
            {currentPage === "profile" && userProfile && <ProfileSettingsPage userProfile={userProfile} onSave={setUserProfile} onBack={goBack} />}
          </div>
        </main>
      </div>

      {showFeedback && <FeedbackModel open={showFeedback} onClose={() => setShowFeedback(false)} />}
    </div>
  );
}