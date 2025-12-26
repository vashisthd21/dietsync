import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    sodium: Number,

    ingredients: [String],
    instructions: [String],

    tags: [String],

    whyRecommended: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Meal", mealSchema);
