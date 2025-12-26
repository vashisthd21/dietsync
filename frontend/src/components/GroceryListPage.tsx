import { useEffect, useState } from "react";
import {
  Leaf,
  Plus,
  Trash2,
  Check,
  Download,
  Printer,
} from "lucide-react";
import api from "../api/axios";
import type { UserProfile } from "../types/user";

/* ================= TYPES ================= */

type GroceryListPageProps = {
  userProfile: UserProfile;
  onNavigate: (page: "mealfeed" | "planner" | "grocery") => void;
};

type GroceryItem = {
  _id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
  estimatedPrice: number;
};

/* ================= CONSTANTS ================= */

const categories = [
  "All",
  "Vegetables",
  "Fruits",
  "Dairy & Eggs",
  "Meat",
  "Seafood",
  "Grains",
  "Pantry",
];

/* ================= COMPONENT ================= */

export function GroceryListPage(
  _: GroceryListPageProps) {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newItemName, setNewItemName] = useState("");
  const [showAddItem, setShowAddItem] = useState(false);

  /* ================= FETCH GROCERIES ================= */

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const res = await api.get("/api/grocery");
        setItems(res.data);
      } catch (err) {
        console.error("Failed to load groceries", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroceries();
  }, []);

  /* ================= ACTIONS ================= */

  const toggleItem = async (id: string) => {
    try {
      const res = await api.patch(`/api/grocery/toggle/${id}`);
      setItems((prev) =>
        prev.map((item) => (item._id === id ? res.data : item))
      );
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await api.delete(`/api/grocery/${id}`);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const addItem = async () => {
    if (!newItemName.trim()) return;

    try {
      const res = await api.post("/api/grocery/add", {
        name: newItemName,
        quantity: "1",
        category: "Pantry",
        estimatedPrice: 0,
      });

      setItems((prev) => [...prev, res.data]);
      setNewItemName("");
      setShowAddItem(false);
    } catch (err) {
      console.error("Add item failed", err);
    }
  };

  /* ================= DERIVED DATA ================= */

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const totalPrice = items.reduce(
    (sum, item) => sum + (item.checked ? 0 : item.estimatedPrice),
    0
  );

  const checkedCount = items.filter((item) => item.checked).length;

  const itemsByCategory = categories.slice(1).map((category) => ({
    category,
    items: items.filter((item) => item.category === category),
  }));

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* ================= HEADER ================= */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <div className="flex items-center gap-4">
            <Leaf className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-semibold">Grocery List</h1>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border dark:border-gray-600 rounded-lg flex items-center gap-2">
              <Printer className="w-5 h-5" /> Print
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
              <Download className="w-5 h-5" /> Export
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ================= NAV ================= */}
        {/* <div className="flex gap-4 mb-8">
          <button onClick={() => onNavigate("mealfeed")}>Meal Feed</button>
          <button onClick={() => onNavigate("planner")}>WeeklyPlanner</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Grocery
          </button>
        </div> */}

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard label="Total Items" value={items.length} />
          <StatCard label="In Cart" value={checkedCount} />
          <StatCard label="Estimated" value={`₹${totalPrice.toFixed(2)}`} />
        </div>

        {/* ================= FILTER ================= */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === cat
                  ? "bg-green-600 text-white"
                  : "bg-white dark:bg-gray-800 border dark:border-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================= LIST ================= */}
        {loading ? (
          <p className="text-center py-20 text-gray-500">Loading...</p>
        ) : (
          <div className="space-y-6">
            {(selectedCategory === "All"
              ? itemsByCategory
              : [{ category: selectedCategory, items: filteredItems }]
            ).map(
              ({ category, items }) =>
                items.length > 0 && (
                  <div
                    key={category}
                    className="bg-white dark:bg-gray-800 rounded-2xl"
                  >
                    <div className="px-6 py-4 border-b dark:border-gray-700">
                      <h3 className="text-lg">{category}</h3>
                    </div>
                    <ul className="divide-y dark:divide-gray-700">
                      {items.map((item) => (
                        <li
                          key={item._id}
                          className="px-6 py-4 flex items-center gap-4"
                        >
                          <button
                            onClick={() => toggleItem(item._id)}
                            className={`w-6 h-6 border-2 rounded flex items-center justify-center ${
                              item.checked
                                ? "bg-green-600 border-green-600"
                                : "border-gray-400"
                            }`}
                          >
                            {item.checked && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </button>

                          <div className="flex-1">
                            <div
                              className={
                                item.checked
                                  ? "line-through text-gray-400"
                                  : ""
                              }
                            >
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.quantity}
                            </div>
                          </div>

                          <div className="w-20 text-right">
                            ₹{item.estimatedPrice}
                          </div>

                          <button
                            onClick={() => removeItem(item._id)}
                            className="text-red-500"
                          >
                            <Trash2 />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
            )}
          </div>
        )}

        {/* ================= ADD ITEM ================= */}
        {showAddItem ? (
          <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-2xl">
            <input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Item name"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={addItem}
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Add
              </button>
              <button onClick={() => setShowAddItem(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddItem(true)}
            className="mt-6 w-full border-2 border-dashed rounded-2xl py-4 flex justify-center gap-2"
          >
            <Plus /> Add Item
          </button>
        )}
      </div>
    </div>
  );
}

/* ================= HELPER ================= */

function StatCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}
