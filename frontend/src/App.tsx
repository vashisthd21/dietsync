import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { OnboardingPage } from "./components/OnboardingPage";
import { HomePage } from "./components/HomePage";
import { DashboardPage } from "./components/DashboardPage";
import { MealDetailPage } from "./components/MealDetailPage";
import { WeeklyPlannerPage } from "./components/WeeklyPlannerPage";
import { GroceryListPage } from "./components/GroceryListPage";
import { Sidebar } from "./components/Sidebar";
import { FeedbackModel } from "./components/FeedbackModel";
import api from "./api/axios";

import type { Page } from "./types/navigation";
import type { UserProfile } from "./types/user";
import type { Meal } from "./types/meal";

export default function App() {
  /* ---------------- Initial Page Sync ---------------- */
  const getInitialPage = (): Page => {
    if (window.location.pathname === "/dashboard") return "dashboard";
    return "landing";
  };

  const [pageStack, setPageStack] = useState<Page[]>([getInitialPage()]);
  const currentPage = pageStack[pageStack.length - 1];

  /* ---------------- State ---------------- */
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  /* ---------------- Theme ---------------- */
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  /* ---------------- Fetch Profile ---------------- */
  const fetchUserProfile = async () => {
    setLoadingProfile(true);
    try {
      const res = await api.get("/api/profile");
      setUserProfile(res.data);
      setPageStack(["dashboard"]);
    } catch (err: any) {
      if (err.response?.status === 404) {
        // 🆕 New user
        setUserProfile(null);
        setPageStack(["onboarding"]);
      } else {
        console.error("Failed to load profile", err);
        localStorage.removeItem("token");
        setPageStack(["landing"]);
      }
    } finally {
      setLoadingProfile(false);
    }
  };

  /* ---------------- Google OAuth Sync ---------------- */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromGoogle = params.get("token");
    const storedToken = localStorage.getItem("token");

    if (tokenFromGoogle) {
      localStorage.setItem("token", tokenFromGoogle);
      window.history.replaceState({}, "", "/dashboard");
      fetchUserProfile();
    } else if (storedToken) {
      fetchUserProfile();
    }
  }, []);

  /* ---------------- Navigation helpers ---------------- */
  const goTo = (page: Page) => {
    setPageStack((prev) =>
      prev[prev.length - 1] === page ? prev : [...prev, page]
    );
  };

  const goBack = () => {
    setPageStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  /* ---------------- Onboarding ---------------- */
  const handleOnboardingComplete = async (profile: UserProfile) => {
    try {
      await api.post("/api/profile", profile);
      setUserProfile(profile);
      setPageStack(["dashboard"]);
    } catch (err) {
      console.error("Failed to save profile", err);
    }
  };

const handleLogout = () => {
  localStorage.removeItem("token");

  // 🔥 THIS IS THE MISSING LINE
  delete api.defaults.headers.common["Authorization"];

  setUserProfile(null);
  setSelectedMeal(null);
  setShowFeedback(false);
  setPageStack(["landing"]);

  window.history.replaceState({}, "", "/");
};


  /* ---------------- HomePage Navigation ---------------- */
  const homePageNavigate = (
    page: "mealFeed" | "weeklyPlanner" | "groceryList" | "feedback"
  ) => {
    if (page === "feedback") {
      setShowFeedback(true);
      return;
    }

    const pageMap: Record<string, Page> = {
      mealFeed: "dashboard",
      weeklyPlanner: "planner",
      groceryList: "grocery",
    };

    goTo(pageMap[page]);
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* ---------------- Sidebar ---------------- */}
        {userProfile && !["landing", "onboarding"].includes(currentPage) && (
          <Sidebar
            currentPage={currentPage}
            onNavigate={(page) => {
              if (page === "feedback") {
                setShowFeedback(true);
              } else {
                goTo(page);
              }
            }}
            onLogout={handleLogout}
            theme={theme}
            toggleTheme={toggleTheme}
            user={{ name: userProfile.name, email: userProfile.email, avatar: userProfile.avatar }}
          />
        )}

        {/* ---------------- Main ---------------- */}
        <main className="flex-1 h-screen overflow-y-auto">
          {currentPage === "landing" && (
            <LandingPage
              onGetStarted={() => goTo("onboarding")}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          )}

          {currentPage === "onboarding" && (
            <OnboardingPage
              onComplete={handleOnboardingComplete}
              onBack={goBack}
            />
          )}

          {currentPage === "home" && userProfile && (
            <HomePage
              userName={userProfile.name}

              dietPreference={userProfile.dietPreference}
              medicalConditions={userProfile.medicalConditions}
              budget={userProfile.budget}
              onNavigate={homePageNavigate}
            />
          )}

          {currentPage === "dashboard" && (
            loadingProfile ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                Loading your profile...
              </div>
            ) : (
              userProfile && (
                <DashboardPage
                  userProfile={userProfile}
                  theme={theme}
                  toggleTheme={toggleTheme}
                  onMealClick={(meal) => {
                    setSelectedMeal(meal);
                    goTo("meal-detail");
                  }}
                  onOpenFeedback={() => setShowFeedback(true)}
                />
              )
            )
          )}

          {currentPage === "meal-detail" && selectedMeal && (
            <MealDetailPage
              meal={selectedMeal}
              onBack={goBack}
              onNavigate={goTo}
            />
          )}

          {currentPage === "planner" && userProfile && (
            <WeeklyPlannerPage userProfile={userProfile} onNavigate={goTo} />
          )}

          {currentPage === "grocery" && userProfile && (
            <GroceryListPage userProfile={userProfile} onNavigate={goTo} />
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
