# 🥗 DietSync – Personalized Diet & Meal Planning Platform

DietSync is a smart, user-centric diet planning web application that helps users make healthier food choices based on their **diet preferences, medical conditions, and budget**.  
It focuses on clean UI, smooth UX, and real-world usability to make diet planning simple and effective.

---

## 🚀 Features

### 🏠 Home
- Personalized greeting and daily overview
- Diet preference, medical conditions, and budget snapshot
- Today’s calorie progress and planned meals
- Weekly consistency tracker
- Health insights tailored to the user
- Quick navigation to all major sections

---

### 🍽 Meal Feed (Personalized Recommendations)
- Curated meals based on:
  - Diet type (Vegetarian, etc.)
  - Medical conditions (Hypertension, Low Sodium, etc.)
  - Budget preferences
- Search meals by name
- Filter meals by:
  - Breakfast
  - Lunch
  - Dinner
  - Snacks
- Detailed nutritional information per meal

---

### 📅 Weekly Planner
- Plan meals for the entire week
- Organized day-wise meal scheduling
- Helps maintain consistency and discipline

---

### 🛒 Grocery List
- Auto-generated grocery list from planned meals
- Reduces food waste
- Budget-friendly shopping support

---

### 💬 Feedback System
- Floating “Share Feedback” button
- Multi-step feedback modal:
  - Star rating (no pre-selected stars)
  - Text-based feedback
  - Recommendation likelihood (NPS scale)
- Smooth animations and clear visual indicators

---

### 🎨 UI & UX
- Clean and modern interface
- Light & Dark mode support
- Fixed sidebar with intuitive navigation
- Only main content scrolls (sidebar remains static)
- Fully responsive design

---

## 🛠 Tech Stack

### Frontend
- **React (Vite)**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React Icons**

### UI Utilities
- **clsx** – Conditional class handling
- **tailwind-merge** – Merging Tailwind classes safely

### Design
- UI inspired from **Figma designs**
- Custom reusable UI components (Card, Button, Badge, Progress)

---

## 🧠 Design Philosophy

DietSync is built with a **real-world problem-solving approach**:
- Focus on health-aware meal planning
- Support for users with medical conditions
- Budget-conscious recommendations
- Clear separation between Home, Meal Feed, and Planning pages

---

## 📂 Project Structure

src/
├── components/
│ ├── HomePage.tsx
│ ├── MealFeedPage.tsx
│ ├── WeeklyPlannerPage.tsx
│ ├── GroceryListPage.tsx
│ ├── Sidebar.tsx
│ └── FeedbackModal.tsx
│
├── ui/
│ ├── card.tsx
│ ├── button.tsx
│ ├── badge.tsx
│ ├── progress.tsx
│ └── utils.ts
│
├── types/
│ ├── navigation.ts
│ ├── user.ts
│ └── meal.ts
│
├── data/
│ └── meals.ts
│
├── App.tsx
└── main.tsx