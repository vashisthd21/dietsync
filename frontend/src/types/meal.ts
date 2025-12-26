export type Meal = {
  _id: string;

  /* Core */
  name: string;
  image: string;

  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sodium?: number;

  ingredients: string[];
  instructions: string[];

  tags: string[];
  whyRecommended?: string;

  /* Metadata */
  servingSize?: string;
  dietaryPreference?: "Vegetarian" | "Non-Vegetarian";
  category?: string;

  /* ML */
  similarity?: number; // 0–1 (used for AI confidence)

  /* Optional timestamps */
  createdAt?: string;
  updatedAt?: string;
};
