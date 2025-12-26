export type UserProfile = {
  _id: string; 
  name: string;
  age: number;
  email: string;
  avatar?: string;
  dietPreference: string[];
  allergies: string[];
  medicalConditions: string[];
  budget: string;
  tastePreferences: string[];
  onboardingCompleted: boolean; // 🔥 Add this line
};

// Also update the Input type for Onboarding
export type UserProfileInput = Omit<UserProfile, '_id' | 'onboardingCompleted'> & {
  onboardingCompleted?: boolean; 
};