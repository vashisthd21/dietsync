export type Meal = {
  _id: string;
  name: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sodium?: number;
  ingredients: string[];
  instructions: string[];
  whyRecommended: string;
  tags: string[];
};