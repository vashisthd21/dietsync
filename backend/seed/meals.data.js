const allMeals = [
  {
    id: '1',
    name: 'Veggie Omelette',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800&h=600&fit=crop',
    calories: 270,
    protein: 20,
    carbs: 22,
    fat: 22,
    sodium: 180,
    ingredients: [
      '2 eggs',
      '1/4 cup spinach',
      '1/4 cup mushroom',
      '1/4 cup bell pepper',
      '2 spinach'
    ],
    instructions: [
      'Beat eggs in a bowl with a pinch of salt and pepper',
      'Heat a non-stick pan over medium heat with a small amount of olive oil',
      'Sauté vegetables until softened, about 3-4 minutes',
      'Pour eggs over vegetables and cook until edges set',
      'Gently fold omelette in half and cook for another minute',
      'Slide onto plate and serve immediately'
    ],
    whyRecommended: 'Low in sodium and provides a good source of protein, which can help maintain healthy blood pressure',
    tags: ['breakfast', 'high-protein', 'low-sodium']
  },
  {
    id: '2',
    name: 'Greek Yogurt Bowl',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop',
    calories: 320,
    protein: 18,
    carbs: 45,
    fat: 8,
    ingredients: [
      '1 cup Greek yogurt',
      '1/2 cup blueberries',
      '1/4 cup granola',
      '1 tbsp honey',
      '1 tbsp chia seeds'
    ],
    instructions: [
      'Place Greek yogurt in a bowl',
      'Top with fresh blueberries',
      'Sprinkle granola and chia seeds over the top',
      'Drizzle with honey',
      'Mix gently and enjoy'
    ],
    whyRecommended: 'Rich in probiotics and antioxidants to support digestive health',
    tags: ['breakfast', 'quick', 'vegetarian']
  },
  {
    id: '3',
    name: 'Avocado Toast',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&h=600&fit=crop',
    calories: 350,
    protein: 12,
    carbs: 35,
    fat: 20,
    ingredients: [
      '2 slices whole grain bread',
      '1 ripe avocado',
      '2 eggs',
      '1 tomato, sliced',
      'Salt, pepper, red pepper flakes'
    ],
    instructions: [
      'Toast bread until golden brown',
      'Mash avocado with salt, pepper, and a squeeze of lemon',
      'Fry or poach eggs to your preference',
      'Spread avocado on toast',
      'Top with eggs and tomato slices',
      'Season with red pepper flakes'
    ],
    whyRecommended: 'Healthy fats and fiber support heart health',
    tags: ['breakfast', 'vegetarian', 'quick']
  },

  // Lunch
  {
    id: '4',
    name: 'Quinoa Salad',
    image: 'https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?w=800&h=600&fit=crop',
    calories: 350,
    protein: 10,
    carbs: 325,
    fat: 12,
    sodium: 180,
    ingredients: [
      '1 cup cooked quinoa',
      '1 cup mixed greens',
      '1/2 cup cherry tomatoes',
      '1/4 cup cucumber',
      '2 tbsp olive oil',
      '1 tbsp lemon juice'
    ],
    instructions: [
      'Cook quinoa according to package directions and let cool',
      'Chop all vegetables into bite-sized pieces',
      'Combine quinoa and vegetables in a large bowl',
      'Whisk together olive oil, lemon juice, salt, and pepper',
      'Pour dressing over salad and toss well',
      'Serve chilled or at room temperature'
    ],
    whyRecommended: 'Low in sodium and high in fiber, perfect for managing hypertension',
    tags: ['lunch', 'vegan', 'low-sodium', 'high-fiber']
  },
  {
    id: '5',
    name: 'Grilled Chicken Wrap',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&h=600&fit=crop',
    calories: 420,
    protein: 35,
    carbs: 38,
    fat: 14,
    ingredients: [
      '4 oz grilled chicken breast',
      '1 whole wheat tortilla',
      '1/4 cup hummus',
      '1 cup mixed greens',
      '1/4 cup shredded carrots',
      '1/4 cup cucumber'
    ],
    instructions: [
      'Grill chicken breast with your favorite seasonings',
      'Warm tortilla slightly',
      'Spread hummus on tortilla',
      'Add greens, carrots, and cucumber',
      'Slice chicken and place on top',
      'Roll tightly and cut in half'
    ],
    whyRecommended: 'Lean protein and vegetables provide balanced nutrition',
    tags: ['lunch', 'high-protein', 'quick']
  },
  {
    id: '6',
    name: 'Mediterranean Bowl',
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800&h=600&fit=crop',
    calories: 480,
    protein: 22,
    carbs: 52,
    fat: 18,
    ingredients: [
      '1 cup cooked farro',
      '1/2 cup chickpeas',
      '1/4 cup feta cheese',
      '1/2 cup cherry tomatoes',
      '1/4 cup olives',
      '2 tbsp tahini dressing'
    ],
    instructions: [
      'Cook farro according to package instructions',
      'Drain and rinse chickpeas',
      'Arrange farro in a bowl',
      'Top with chickpeas, tomatoes, olives, and feta',
      'Drizzle with tahini dressing',
      'Garnish with fresh herbs if desired'
    ],
    whyRecommended: 'Mediterranean diet is heart-healthy and anti-inflammatory',
    tags: ['lunch', 'vegetarian', 'mediterranean']
  },

  // Dinner
  {
    id: '7',
    name: 'Grilled Salmon',
    image: 'https://images.unsplash.com/photo-1580959375944-abd7e991f971?w=800&h=600&fit=crop',
    calories: 400,
    protein: 34,
    carbs: 120,
    fat: 18,
    sodium: 120,
    ingredients: [
      '6 oz salmon fillet',
      '2 cups asparagus',
      '1 cup green beans',
      '1 tbsp olive oil',
      '1 lemon',
      'Garlic, salt, pepper'
    ],
    instructions: [
      'Preheat grill or oven to 400°F',
      'Season salmon with salt, pepper, and garlic',
      'Toss vegetables with olive oil and seasonings',
      'Grill salmon for 4-5 minutes per side',
      'Roast vegetables until tender, about 15 minutes',
      'Serve with lemon wedges'
    ],
    whyRecommended: 'Low in sodium and provides omega-3 fatty acids which help reduce blood pressure',
    tags: ['dinner', 'high-protein', 'low-sodium', 'pescatarian']
  },
  {
    id: '8',
    name: 'Herb-Crusted Chicken',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&h=600&fit=crop',
    calories: 440,
    protein: 38,
    carbs: 35,
    fat: 16,
    ingredients: [
      '6 oz chicken breast',
      '1 cup broccoli',
      '1 medium sweet potato',
      '2 tbsp fresh herbs',
      '1 tbsp olive oil'
    ],
    instructions: [
      'Preheat oven to 375°F',
      'Mix herbs with olive oil and coat chicken',
      'Bake chicken for 25-30 minutes until cooked through',
      'Steam broccoli until tender-crisp',
      'Roast sweet potato cubes until golden',
      'Serve chicken with vegetables'
    ],
    whyRecommended: 'Lean protein with complex carbs for sustained energy',
    tags: ['dinner', 'high-protein', 'gluten-free']
  },
  {
    id: '9',
    name: 'Vegetarian Stir-Fry',
    image: 'https://images.unsplash.com/photo-1593759608136-45eb2ad9507d?w=800&h=600&fit=crop',
    calories: 380,
    protein: 16,
    carbs: 54,
    fat: 12,
    ingredients: [
      '1 cup tofu, cubed',
      '2 cups mixed vegetables',
      '1 cup brown rice',
      '2 tbsp soy sauce (low sodium)',
      '1 tbsp sesame oil',
      'Ginger and garlic'
    ],
    instructions: [
      'Cook brown rice according to package directions',
      'Press tofu to remove excess water, then cube',
      'Heat sesame oil in a wok or large pan',
      'Stir-fry tofu until golden, then remove',
      'Add vegetables and stir-fry until tender-crisp',
      'Return tofu to pan, add sauce, and toss to combine',
      'Serve over brown rice'
    ],
    whyRecommended: 'Plant-based protein and lots of vegetables for nutrition',
    tags: ['dinner', 'vegan', 'low-sodium']
  },

  // Snacks
  {
    id: '10',
    name: 'Apple Slices with Almond Butter',
    image: 'https://images.unsplash.com/photo-1569420067112-b57b4f024595?w=800&h=600&fit=crop',
    calories: 220,
    protein: 6,
    carbs: 28,
    fat: 10,
    ingredients: [
      '1 medium apple',
      '2 tbsp almond butter',
      'Cinnamon (optional)'
    ],
    instructions: [
      'Wash and slice apple into wedges',
      'Arrange on a plate',
      'Serve with almond butter for dipping',
      'Sprinkle with cinnamon if desired'
    ],
    whyRecommended: 'Healthy fats and fiber keep you satisfied',
    tags: ['snacks', 'vegan', 'quick']
  },
  {
    id: '11',
    name: 'Hummus & Veggies',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&h=600&fit=crop',
    calories: 180,
    protein: 8,
    carbs: 22,
    fat: 7,
    ingredients: [
      '1/2 cup hummus',
      '1 cup baby carrots',
      '1 cup bell pepper strips',
      '1 cup cucumber slices'
    ],
    instructions: [
      'Wash and prepare all vegetables',
      'Cut bell peppers and cucumber into strips',
      'Arrange vegetables on a platter',
      'Serve with hummus for dipping'
    ],
    whyRecommended: 'Low-calorie, nutrient-dense snack',
    tags: ['snacks', 'vegan', 'low-calorie']
  },
  {
    id: '12',
    name: 'Trail Mix',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&h=600&fit=crop',
    calories: 280,
    protein: 10,
    carbs: 32,
    fat: 14,
    ingredients: [
      '1/4 cup almonds',
      '1/4 cup walnuts',
      '2 tbsp dark chocolate chips',
      '2 tbsp dried cranberries',
      '1 tbsp pumpkin seeds'
    ],
    instructions: [
      'Mix all ingredients in a bowl',
      'Portion into small containers for easy snacking',
      'Store in an airtight container'
    ],
    whyRecommended: 'Heart-healthy nuts and antioxidants',
    tags: ['snacks', 'high-protein', 'portable']
  }
];
export default allMeals;