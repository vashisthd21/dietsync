import { useState } from 'react';
import { ArrowLeft, Clock, Users, ChefHat, RefreshCw, Plus, Calendar, ShoppingCart } from 'lucide-react';
import type { Meal } from '../types/meal';


type MealDetailPageProps = {
  meal: Meal;
  onBack: () => void;
  onNavigate: (page: 'mealfeed' | 'planner' | 'grocery') => void;
};

const alternativeIngredients: { [key: string]: string[] } = {
  'eggs': ['silken tofu', 'flax eggs', 'chia eggs'],
  'spinach': ['kale', 'arugula', 'swiss chard'],
  'mushroom': ['zucchini', 'eggplant', 'bell peppers'],
  'bell pepper': ['cherry tomatoes', 'zucchini', 'carrots'],
  'salmon': ['cod', 'halibut', 'tilapia'],
  'chicken': ['turkey', 'tofu', 'tempeh'],
  'quinoa': ['brown rice', 'farro', 'bulgur'],
  'broccoli': ['green beans', 'asparagus', 'brussels sprouts'],
};

export function MealDetailPage({ meal, onBack, onNavigate }: MealDetailPageProps) {
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [servings, setServings] = useState(2);

  const getIngredientKey = (ingredient: string) => {
    const lowerIngredient = ingredient.toLowerCase();
    for (const key in alternativeIngredients) {
      if (lowerIngredient.includes(key)) {
        return key;
      }
    }
    return null;
  };

  const handleIngredientClick = (ingredient: string) => {
    const key = getIngredientKey(ingredient);
    if (key && alternativeIngredients[key]) {
      setSelectedIngredient(ingredient);
    }
  };

  const getAlternatives = (ingredient: string) => {
    const key = getIngredientKey(ingredient);
    return key ? alternativeIngredients[key] : [];
  };

  const scaledValue = (value: number) => Math.round(value * (servings / 2));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-xl">Back to Feed</h2>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Hero Image */}
        <div className="relative h-96 rounded-3xl overflow-hidden mb-8 shadow-xl">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-5xl mb-4">{meal.name}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>30 mins</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{servings} servings</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5" />
                <span>Easy</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Why Recommended */}
            {meal.whyRecommended && (
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
                <h3 className="text-xl mb-2 text-orange-900">Why Recommended</h3>
                <p className="text-orange-800">{meal.whyRecommended}</p>
              </div>
            )}

            {/* Ingredients */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl">Ingredients</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 hover:border-green-500 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{servings}</span>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 hover:border-green-500 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <ul className="space-y-3">
                {meal.ingredients.map((ingredient, i) => {
                  const hasAlternatives = getAlternatives(ingredient).length > 0;
                  const isSelected = selectedIngredient === ingredient;
                  
                  return (
                    <li key={i}>
                      <div
                        onClick={() => hasAlternatives && handleIngredientClick(ingredient)}
                        className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                          hasAlternatives
                            ? 'cursor-pointer hover:bg-green-50 border border-transparent hover:border-green-300'
                            : ''
                        } ${isSelected ? 'bg-green-50 border-green-300' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-600 rounded-full" />
                          <span className="text-gray-900">{ingredient}</span>
                        </div>
                        {hasAlternatives && (
                          <RefreshCw className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      
                      {isSelected && (
                        <div className="ml-8 mt-2 p-3 bg-white border border-green-200 rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">Alternatives:</p>
                          <div className="flex flex-wrap gap-2">
                            {getAlternatives(ingredient).map((alt, j) => (
                              <button
                                key={j}
                                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors"
                              >
                                {alt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Click on ingredients to see alternatives
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl mb-6">Instructions</h3>
              <ol className="space-y-4">
                {meal.instructions.map((instruction, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Nutrition Facts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-xl mb-4">Nutrition Facts</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b">
                  <span className="text-gray-600">Calories</span>
                  <span className="text-2xl">{scaledValue(meal.calories)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Protein</span>
                  <span className="text-lg">{scaledValue(meal.protein)}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Carbs</span>
                  <span className="text-lg">{scaledValue(meal.carbs)}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Fat</span>
                  <span className="text-lg">{scaledValue(meal.fat)}g</span>
                </div>
                {meal.sodium && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sodium</span>
                    <span className="text-lg">{scaledValue(meal.sodium)}mg</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t space-y-3">
                <button
                  onClick={() => onNavigate('planner')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Add to Planner
                </button>
                <button
                  onClick={() => onNavigate('grocery')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Grocery List
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {meal.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
