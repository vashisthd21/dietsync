import { useMemo, useState } from "react";
import type { UserProfile } from "../types/user";
import api from "../api/axios";
import { Camera, Trash2, ShieldCheck, AlertCircle, Save, XCircle, Edit3 } from "lucide-react";

type Props = {
  userProfile: UserProfile;
  onSave: (updated: UserProfile) => void;
  onBack: () => void;
};

const dietOptions = ["Vegetarian", "Vegan", "Keto", "Paleo", "Mediterranean", "Low-Carb"];
const allergyOptions = ["Peanuts", "Dairy", "Eggs", "Soy", "Gluten", "Seafood"];
const healthOptions = ["Diabetes", "Hypertension", "PCOS", "Thyroid", "Heart Health", "None"];
const budgetOptions = [
  { label: "Budget-friendly", value: "budget" },
  { label: "Balanced", value: "balanced" },
  { label: "Premium", value: "premium" },
];

export function ProfileSettingsPage({ userProfile, onSave }: Props) {
  // 1. Added isEditing state (starts false)
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<UserProfile>(userProfile);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(userProfile.avatar);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isDirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(userProfile),
    [form, userProfile]
  );

  const toggleArray = (key: keyof UserProfile, value: string) => {
    // 2. Prevent toggling if not in editing mode
    if (!isEditing) return;
    const arr = (form[key] as string[]) || [];
    setForm({
      ...form,
      [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    });
  };

  const handleAvatarUpload = (file: File) => {
    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);
    setForm({ ...form, avatar: file as any });
  };

  const removeAvatar = () => {
  setAvatarPreview(undefined);
  setForm({ ...form, avatar: undefined });
};

// Inside ProfileSettingsPage.tsx
const handleSave = async () => {
  try {
    setSaving(true);
    
    // We use FormData because JSON cannot carry a File/Image object
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("budget", form.budget);
    formData.append("dietPreference", JSON.stringify(form.dietPreference));
    formData.append("allergies", JSON.stringify(form.allergies));
    formData.append("medicalConditions", JSON.stringify(form.medicalConditions));

    if (form.avatar && typeof form.avatar !== "string") {
      formData.append("avatar", form.avatar);
    }

    

    // THE UPDATE REQUEST IS HERE:
    const res = await api.put("/api/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    onSave(res.data);
    setIsEditing(false); // Switch back to read-only mode
    setSuccess("Profile updated!");
  } catch (err) {
    setError("Failed to save profile");
  } finally {
    setSaving(false);
  }
};
const handleDeleteAccount = async () => {
      const confirmed = confirm(
        "This will permanently delete your account and all associated data. This action cannot be undone."
      );

      if (!confirmed) return;

      try {
        await api.delete("/api/profile");
        localStorage.clear();
        window.location.href = "/";
      } catch {
        setError("Failed to delete account. Please try again.");
      }
    };
  // const handleBack = () => {
  //   if (isDirty && !confirm("You have unsaved changes. Discard them?")) return;
  //   onBack();
  // };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-32">
      <div className="max-w-4xl mx-auto px-6 pt-10">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row items-center gap-8 mb-12 p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="relative group">
            <div className={`w-32 h-32 rounded-full overflow-hidden border-4 ${isEditing ? 'border-emerald-500' : 'border-emerald-500/20'} shadow-2xl relative`}>
              <img
                src={avatarPreview || "/avatar-placeholder.png"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="Profile"
              />
              {/* Only show upload overlay if editing */}
              {isEditing && (
                <label className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300">
                  <Camera className="text-white w-8 h-8 mb-1" />
                  <span className="text-[10px] text-white font-bold uppercase tracking-widest">Update</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files && handleAvatarUpload(e.target.files[0])}
                  />
                </label>
              )}
            </div>
            {isEditing && avatarPreview && (
              <button
                onClick={removeAvatar}
                className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-slate-800 text-rose-500 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 hover:scale-110 transition-transform"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>

          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">{form.name}</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-3">{form.email}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
              {/* 4. The Toggle Button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs transition-all ${
                  isEditing 
                  ? "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400" 
                  : "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:scale-105"
                }`}
              >
                {isEditing ? <XCircle size={14} /> : <Edit3 size={14} />}
                {isEditing ? "Cancel Editing" : "Update Profile"}
              </button>
            </div>
          </div>
        </div>

        {/* ================= SECTIONS ================= */}
        <div className="grid grid-cols-1 gap-8">
          <Card title="Basic Identity" subtitle="Update your personal details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                value={form.name}
                disabled={!isEditing} // 5. Disable based on state
                placeholder="Radhika Sharma"
                onChange={(v: string) => setForm({ ...form, name: v })}
              />
              <Input label="Email Address" value={form.email} disabled />
            </div>
          </Card>

          <Card title="Dietary Lifestyle" subtitle="Used to personalize your meal feed and planner">
            <ChipGrid
              options={dietOptions}
              selected={form.dietPreference}
              disabled={!isEditing} // 6. Pass disabled prop
              onToggle={(opt: string) => toggleArray("dietPreference", opt)}
            />
          </Card>

          <Card
            title="Medical Restrictions"
            subtitle="We prioritize these exclusions for your safety"
            variant="warning"
          >
            <ChipGrid
              options={allergyOptions}
              selected={form.allergies}
              disabled={!isEditing}
              onToggle={(opt: string) => toggleArray("allergies", opt)}
            />
          </Card>

          <Card title="Health Focus" subtitle="Optional conditions for specialized optimization">
            <ChipGrid
              options={healthOptions}
              selected={form.medicalConditions}
              disabled={!isEditing}
              onToggle={(opt: string) => {
                if (!isEditing) return;
                if (opt === "None") {
                  setForm({ ...form, medicalConditions: ["None"] });
                } else {
                  toggleArray("medicalConditions", opt);
                  setForm((prev) => ({
                    ...prev,
                    medicalConditions: prev.medicalConditions?.filter((v) => v !== "None"),
                  }));
                }
              }}
            />
          </Card>

          <Card title="Budget Strategy" subtitle="How should we source ingredients?">
            <div className="flex flex-wrap gap-4">
              {budgetOptions.map((b) => (
                <button
                  key={b.value}
                  disabled={!isEditing}
                  onClick={() => setForm({ ...form, budget: b.value })}
                  className={`flex-1 min-w-[120px] py-4 px-6 rounded-2xl font-bold text-sm transition-all border ${
                    form.budget === b.value
                      ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20 scale-[1.02]"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50"
                  } ${!isEditing && form.budget !== b.value ? "opacity-40 grayscale" : ""}`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </Card>

          <Card
            title="Account Closure"
            subtitle="Permanently remove your account and all associated data"
            variant="danger"
          >
            <button
              onClick={handleDeleteAccount}
              disabled={!isEditing}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 
                bg-white dark:bg-slate-900 text-rose-600 font-semibold 
                border border-rose-200 dark:border-rose-800 
                rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 
                transition disabled:opacity-50"
            >
              <XCircle size={18} />
              Permanently Delete Account
            </button>

          </Card>
        </div>

        {/* ================= MESSAGES ================= */}
        {error && (
          <div className="mt-8 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl flex items-center gap-3 text-rose-600 dark:text-rose-400 animate-in fade-in slide-in-from-bottom-2">
            <AlertCircle size={20} />
            <span className="text-sm font-bold">{error}</span>
          </div>
        )}
        
        {success && (
          <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400 animate-in fade-in slide-in-from-bottom-2">
            <ShieldCheck size={20} />
            <span className="text-sm font-bold">{success}</span>
          </div>
        )}

        {/* ================= SAVE BAR ================= */}
        {/* 7. Added isEditing check here so bar only shows while editing */}
        {isEditing && isDirty && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-2xl bg-slate-900/90 dark:bg-emerald-500/90 backdrop-blur-xl py-4 px-8 rounded-3xl shadow-2xl flex items-center justify-between border border-white/10 dark:border-white/20 animate-in slide-in-from-bottom-10 duration-500 z-50">
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm tracking-tight">Unsaved Changes</p>
              <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Profile out of sync</p>
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <button 
                onClick={() => { setForm(userProfile); setIsEditing(false); }} 
                className="flex-1 sm:flex-none px-6 py-2.5 text-white/80 hover:text-white font-bold text-sm transition-colors"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-2.5 bg-white text-slate-900 dark:text-emerald-900 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {saving ? "..." : <Save size={16} />}
                {saving ? "Saving" : "Apply"}
              </button>
            </div>
          </div>
        )}

        <footer className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-full">
            <ShieldCheck size={14} className="text-emerald-500" />
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
              Secured with DietSync Encryption
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ================= UPDATED UI COMPONENTS ================= */

function Input({ label, value, onChange, disabled, placeholder }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
        {label}
      </label>
      <input
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        // 8. Added conditional styling for disabled state
        className={`w-full px-5 py-3.5 border rounded-2xl font-medium transition-all outline-none 
          ${disabled 
            ? "bg-transparent border-transparent text-slate-600 dark:text-slate-300 cursor-default" 
            : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          }`}
      />
    </div>
  );
}

function ChipGrid({ options, selected = [], onToggle, disabled }: any) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map((opt: string) => {
        const isActive = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            disabled={disabled}
            className={`py-3 px-4 rounded-2xl font-bold text-xs transition-all border ${
              isActive
                ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20"
                : "bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-700 hover:border-emerald-500/40"
            } ${disabled && !isActive ? "opacity-30 grayscale cursor-default" : ""}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// Keep Card component as is...
function Card({ title, subtitle, variant, children }: any) {
  const isWarning = variant === "warning";
  const isDanger = variant === "danger";

  return (
    <div className={`rounded-[2rem] p-8 shadow-sm border transition-all duration-300 ${
      isDanger ? "bg-rose-50/30 dark:bg-rose-950/5 border-rose-100 dark:border-rose-900/20" : 
      "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
    }`}>
      <div className="mb-6">
        <h2 className={`text-xl font-bold tracking-tight ${
          isDanger ? "text-rose-600 dark:text-rose-400" : "text-slate-900 dark:text-white"
        }`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-sm mt-1 font-medium ${
            isWarning ? "text-amber-600 dark:text-amber-400" : "text-slate-500 dark:text-slate-400"
          }`}>
            {subtitle}
          </p>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}