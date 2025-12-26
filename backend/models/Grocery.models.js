import mongoose from "mongoose";

const grocerySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: String,
      default: "1",
    },

    category: {
      type: String,
      default: "Pantry",
    },

    estimatedPrice: {
      type: Number,
      default: 0,
    },

    checked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Grocery", grocerySchema);
