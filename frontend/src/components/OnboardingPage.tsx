import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Logo from '../assets/logo1.svg?react';
import type { UserProfileInput } from "../types/user";

type OnboardingPageProps = {
  onComplete: (profile: UserProfileInput) => void;
  onBack: () => void;
  isLoggedIn?: boolean; // Pass this from your Auth state
};

const medicalConditionsOptions = [
  'Migraine','Hypertension', 'Diabetes Type 2', 'High Cholesterol', 'Heart Disease',
  'Celiac Disease', 'IBS', 'GERD', 'Kidney Disease', 'None'
];

const allergiesOptions = [
  'Peanuts', 'Tree Nuts', 'Dairy', 'Eggs', 'Soy', 'Wheat', 'Fish', 'Shellfish', 'None'
];

const dietPreferenceOptions = [
  'No Preference', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo', 'Mediterranean', 'Low-Carb'
];

const budgetOptions = [
  'Budget-Friendly ($)', 'Moderate ($$)', 'Premium ($$$)'
];

const tastePreferencesOptions = [
  'Sweet', 'Savory', 'Spicy', 'Mild', 'Tangy', 'Rich & Creamy', 'Light & Fresh'
];

export function OnboardingPage({ onComplete, onBack, isLoggedIn }: OnboardingPageProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    dietPreference: [] as string[],
    allergies: [] as string[],
    medicalConditions: [] as string[],
    budget: '',
    tastePreferences: [] as string[],
  });

  const totalSteps = 5;

  // 🔥 FUNCTIONAL SKIP: Sends current form data to redirect to dashboard
  const handleSkipSetup = () => {
    console.log(isLoggedIn);
    onComplete({
      name: formData.name || 'User',
      email: formData.email,
      age: parseInt(formData.age) || 0,
      dietPreference: formData.dietPreference,
      allergies: formData.allergies,
      medicalConditions: formData.medicalConditions,
      budget: formData.budget,
      tastePreferences: formData.tastePreferences,
      onboardingCompleted: false, // Mark onboarding as incomplete
    });
  };
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete({
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age) || 30,
        dietPreference: formData.dietPreference,
        allergies: formData.allergies,
        medicalConditions: formData.medicalConditions,
        budget: formData.budget,
        tastePreferences: formData.tastePreferences,
      });
    }
  };

  // 🔥 FUNCTIONAL BACK: Redirects based on auth status if on step 1
  const handleBack = () => {
    if (step === 1) {
      onBack(); // Logic for Landing vs Dashboard happens in the parent calling this
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    } else {
      return [...array, item];
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name.trim() !== '' && formData.age.trim() !== '';
      case 2:
        return formData.dietPreference.length > 0;
      case 3:
        return formData.allergies.length > 0;
      case 4:
        return formData.medicalConditions.length > 0;
      case 5:
        return formData.budget !== '' && formData.tastePreferences.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <Logo className="w-8 h-8 text-green-600" />
          <span className="text-3xl font-semibold tracking-tight">
            <span className="text-green-600">Diet</span>
            <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
              Sync
            </span>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {step} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-600 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl mb-2">Tell us about yourself</h2>
              <p className="text-gray-600">
                Help us personalize your meal recommendations
              </p>
            </div>

            {/* 🔥 SKIP SETUP BUTTON IS NOW FUNCTIONAL */}
            <button
              onClick={handleSkipSetup}
              className="px-5 py-2.5 rounded-full border-2 border-green-600 text-green-700 font-semibold hover:bg-green-50 transition text-sm"
            >
              Skip setup →
            </button>
          </div>

          <div className="mt-4 mb-8 rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-800">
            <strong>Why we ask this:</strong>
            <p className="mt-1">
              Your preferences help us create personalized meal plans, calorie goals,
              and health-aware food recommendations. You can always update this later.
            </p>
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2 text-gray-700">What's your name?</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Age</label>
                <input
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 2: Diet Preference */}
          {step === 2 && (
            <div>
              <label className="block text-sm mb-4 text-gray-700">
                What's your diet preference? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {dietPreferenceOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        dietPreference: toggleArrayItem(formData.dietPreference, option),
                      })
                    }
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      formData.dietPreference.includes(option)
                        ? 'border-green-600 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Allergies */}
          {step === 3 && (
            <div>
              <label className="block text-sm mb-4 text-gray-700">Any allergies? (Select all that apply)</label>
              <div className="grid grid-cols-2 gap-3">
                {allergiesOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData({
                      ...formData,
                      allergies: toggleArrayItem(formData.allergies, option)
                    })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      formData.allergies.includes(option)
                        ? 'border-green-600 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Medical Conditions */}
          {step === 4 && (
            <div>
              <label className="block text-sm mb-4 text-gray-700">Any medical conditions? (Select all that apply)</label>
              <div className="grid grid-cols-2 gap-3">
                {medicalConditionsOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData({
                      ...formData,
                      medicalConditions: toggleArrayItem(formData.medicalConditions, option)
                    })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      formData.medicalConditions.includes(option)
                        ? 'border-green-600 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Budget & Taste */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-4 text-gray-700">What's your budget?</label>
                <div className="grid grid-cols-3 gap-3">
                  {budgetOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setFormData({ ...formData, budget: option })}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        formData.budget === option
                          ? 'border-green-600 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-4 text-gray-700">Taste preferences (Select all that apply)</label>
                <div className="grid grid-cols-2 gap-3">
                  {tastePreferencesOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setFormData({
                        ...formData,
                        tastePreferences: toggleArrayItem(formData.tastePreferences, option)
                      })}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        formData.tastePreferences.includes(option)
                          ? 'border-green-600 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-12">
            <div className="flex items-center gap-4">
              {/* 🔥 BACK BUTTON IS NOW FUNCTIONAL */}
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            </div>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg transition-all ${
                canProceed()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {step === totalSteps ? 'Complete' : 'Next'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}