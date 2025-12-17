import mongoose from "mongoose";

const PlannerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    meal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    mealType: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner"],
      default: "Lunch",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Planner", PlannerSchema);
