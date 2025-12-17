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
  /* ---------------- Page Stack ---------------- */
  const [pageStack, setPageStack] = useState<Page[]>(["landing"]);
  const currentPage = pageStack[pageStack.length - 1];

  /* ---------------- State ---------------- */
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  /* ---------------- Theme ---------------- */
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  /* ---------------- Navigation helpers ---------------- */
  const goTo = (page: Page) => {
    setPageStack((prev) =>
      prev[prev.length - 1] === page ? prev : [...prev, page]
    );
  };

  const goBack = () => {
    setPageStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  /* ---------------- Fetch Profile ---------------- */
  const fetchUserProfile = async () => {
    setLoadingProfile(true);
    try {
      const res = await api.get("/api/profile");
      setUserProfile(res.data);

      // ✅ After login / refresh → Dashboard
      setPageStack(["dashboard"]);
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

  /* ---------------- OAuth Sync ---------------- */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token") || localStorage.getItem("token");

    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, "", "/");
      fetchUserProfile();
    }
  }, []);

  /* ---------------- Logout ---------------- */
  const handleLogout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUserProfile(null);
    setPageStack(["landing"]);
  };

  /* ---------------- Sidebar visible pages ---------------- */
  const dashboardPages: Page[] = [
    "dashboard",
    "home",
    "mealfeed",
    "planner",
    "grocery",
    "profile",
  ];

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* ---------------- Sidebar ---------------- */}
        {userProfile && dashboardPages.includes(currentPage) && (
          <Sidebar
            currentPage={currentPage}
            onNavigate={goTo}
            onLogout={handleLogout}
            theme={theme}
            toggleTheme={toggleTheme}
            user={{
              name: userProfile.name,
              email: userProfile.email,
              avatar: userProfile.avatar,
            }}
          />
        )}

        {/* ---------------- Main ---------------- */}
        <main className="flex-1 overflow-y-auto">
          {/* Landing */}
          {currentPage === "landing" && (
            <LandingPage
              onLogin={() => goTo("login")}
              onSignup={() => goTo("signup")}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          )}

          {/* Login */}
          {currentPage === "login" && (
            <LoginPage
              onGoogleLogin={() =>
                (window.location.href = "http://localhost:5050/auth/google")
              }
              onLoginSuccess={fetchUserProfile}
              onGoToSignup={() => goTo("signup")}
              onBackToHome={() => goTo("landing")}
            />
          )}

          {/* Signup */}
          {currentPage === "signup" && (
            <SignupPage
              onGoogleSignup={() =>
                (window.location.href = "http://localhost:5050/auth/google")
              }
              onSignupSuccess={() => setPageStack(["onboarding"])}
              onGoToLogin={() => goTo("login")}
              onBackToHome={() => goTo("landing")}
            />
          )}

          {/* Onboarding */}
          {currentPage === "onboarding" && (
            <OnboardingPage
              onComplete={fetchUserProfile}
              onBack={goBack}
            />
          )}

          {/* Dashboard */}
          {currentPage === "dashboard" && userProfile && (
            <DashboardPage
              userName={userProfile.name}
              onNavigate={goTo}
            />
          )}

          {/* Home (separate page) */}
          {currentPage === "home" && userProfile && (
            <HomePage
              userName={userProfile.name}
              dietPreference={userProfile.dietPreference}
              medicalConditions={userProfile.medicalConditions}
              budget={userProfile.budget}
              onNavigate={(page) => {
                if (page === "feedback") {
                  setShowFeedback(true);
                } else {
                  const map = {
                    mealFeed: "mealfeed",
                    weeklyPlanner: "planner",
                    groceryList: "grocery",
                  } as const;
                  goTo(map[page]);
                }
              }}
            />
          )}

          {/* Meal Feed */}
          {currentPage === "mealfeed" && userProfile && (
            <MealFeedPage
              userProfile={userProfile}
              theme={theme}
              toggleTheme={toggleTheme}
              onOpenFeedback={() => setShowFeedback(true)}
            />
          )}

          {/* Planner */}
          {currentPage === "planner" && userProfile && (
            <WeeklyPlannerPage
              userProfile={userProfile}
              onNavigate={goTo}
            />
          )}

          {/* Grocery */}
          {currentPage === "grocery" && userProfile && (
            <GroceryListPage
              userProfile={userProfile}
              onNavigate={goTo}
            />
          )}

          {/* Profile */}
          {currentPage === "profile" && userProfile && (
            <ProfileSettingsPage
              userProfile={userProfile}
              onSave={setUserProfile}
              onBack={goBack}
            />
          )}
        </main>
      </div>

      {/* ---------------- Feedback Modal ---------------- */}
      {showFeedback && (
        <FeedbackModel
          open={showFeedback}
          onClose={() => setShowFeedback(false)}
        />
      )}
    </div>
  );
}
