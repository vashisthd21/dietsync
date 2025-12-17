import {
  Leaf,
  Calendar,
  ShoppingCart,
  User,
  Flame,
  CheckCircle,
  List,
} from "lucide-react";

type DashboardPageProps = {
  userName: string;
  onNavigate: (page: "mealfeed" | "planner" | "grocery" | "profile") => void;
};

export function DashboardPage({ userName, onNavigate }: DashboardPageProps) {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* ===== Header ===== */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Welcome back, {userName} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Here’s an overview of your diet planning activity
        </p>
      </div>

      {/* ===== Quick Stats ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard
          label="Avg Daily Calories"
          value="2,100 kcal"
          icon={Flame}
          color="text-orange-600"
          bg="bg-orange-100 dark:bg-orange-900/30"
        />
        <StatCard
          label="Meals Planned This Week"
          value="12"
          icon={CheckCircle}
          color="text-green-600"
          bg="bg-green-100 dark:bg-green-900/30"
        />
        <StatCard
          label="Items in Grocery List"
          value="18"
          icon={List}
          color="text-blue-600"
          bg="bg-blue-100 dark:bg-blue-900/30"
        />
      </div>

      {/* ===== Main Actions ===== */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Meal Feed"
          description="Discover meals curated for your goals"
          icon={Leaf}
          onClick={() => onNavigate("mealfeed")}
        />
        <DashboardCard
          title="Weekly Planner"
          description="Plan your meals for the entire week"
          icon={Calendar}
          onClick={() => onNavigate("planner")}
        />
        <DashboardCard
          title="Grocery List"
          description="Track ingredients you need to buy"
          icon={ShoppingCart}
          onClick={() => onNavigate("grocery")}
        />
        <DashboardCard
          title="Profile Settings"
          description="Manage preferences & health goals"
          icon={User}
          onClick={() => onNavigate("profile")}
        />
      </div>
    </div>
  );
}

/* ===================== SUB COMPONENTS ===================== */

type StatCardProps = {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  bg: string;
};

function StatCard({ label, value, icon: Icon, color, bg }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg}`}
      >
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {value}
        </p>
      </div>
    </div>
  );
}

type CardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
  onClick: () => void;
};

function DashboardCard({ title, description, icon: Icon, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl p-6
                 border border-gray-200 dark:border-gray-700
                 shadow-sm hover:shadow-xl transition-all duration-200
                 hover:-translate-y-1"
    >
      <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30
                      flex items-center justify-center mb-4
                      group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
      </div>

      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {description}
      </p>
    </div>
  );
}

// export default DashboardPage;