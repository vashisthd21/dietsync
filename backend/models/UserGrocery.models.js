import mongoose from "mongoose";

const userGrocerySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroceryItem",
      required: true,
    },
    quantity: {
      type: String,
      default: "1",
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserGrocery", userGrocerySchema);
