import { useState } from "react";
import type { UserProfile } from "../types/user";
import api from "../api/axios";

type Props = {
  userProfile: UserProfile;
  onSave: (updated: UserProfile) => void;
  onBack: () => void;
};

const dietOptions = [
  "Vegetarian", "Vegan", "Keto", "Paleo", "Mediterranean", "Low-Carb"
];

const allergyOptions = [
  "Peanuts", "Dairy", "Eggs", "Soy", "Gluten", "Seafood"
];

const budgetOptions = ["$", "$$", "$$$"];

export function ProfileSettingsPage({ userProfile, onSave, onBack }: Props) {
  const [form, setForm] = useState<UserProfile>(userProfile);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const toggleArray = (key: keyof UserProfile, value: string) => {
    const arr = form[key] as string[];
    setForm({
      ...form,
      [key]: arr.includes(value)
        ? arr.filter(v => v !== value)
        : [...arr, value],
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");

      const res = await api.post("/api/profile", form);

      onSave(res.data);
      onBack();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-2">Profile Settings</h1>
      <p className="text-gray-600 mb-6">
        Update your preferences to get better meal recommendations
      </p>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Name */}
      <div className="mb-6">
        <label className="block mb-2 text-sm">Name</label>
        <input
          className="w-full px-4 py-3 border rounded-lg"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      </div>

      {/* Diet */}
      <div className="mb-6">
        <label className="block mb-2 text-sm">Diet Preference</label>
        <div className="grid grid-cols-2 gap-3">
          {dietOptions.map(opt => (
            <button
              key={opt}
              onClick={() => toggleArray("dietPreference", opt)}
              className={`px-4 py-3 rounded-lg border ${
                form.dietPreference.includes(opt)
                  ? "bg-green-100 border-green-600"
                  : "border-gray-300"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div className="mb-6">
        <label className="block mb-2 text-sm">Allergies</label>
        <div className="grid grid-cols-2 gap-3">
          {allergyOptions.map(opt => (
            <button
              key={opt}
              onClick={() => toggleArray("allergies", opt)}
              className={`px-4 py-3 rounded-lg border ${
                form.allergies.includes(opt)
                  ? "bg-green-100 border-green-600"
                  : "border-gray-300"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="mb-8">
        <label className="block mb-2 text-sm">Budget</label>
        <div className="flex gap-3">
          {budgetOptions.map(b => (
            <button
              key={b}
              onClick={() => setForm({ ...form, budget: b })}
              className={`px-6 py-3 rounded-lg border ${
                form.budget === b
                  ? "bg-green-100 border-green-600"
                  : "border-gray-300"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button onClick={onBack} className="text-gray-600">
          ← Back
        </button>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 text-white px-8 py-3 rounded-lg"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
