import mongoose from "mongoose";

const groceryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  estimatedPrice: Number,
});

export default mongoose.model("GroceryItem", groceryItemSchema);