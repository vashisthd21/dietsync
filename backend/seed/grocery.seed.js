import mongoose from "mongoose";
import GroceryItem from "../models/GroceryItem.models.js";
import "dotenv/config";
import connectDB from "../config/db.js";

const groceries = [
  { name: "Milk", category: "Dairy & Eggs", estimatedPrice: 60 },
  { name: "Eggs", category: "Dairy & Eggs", estimatedPrice: 70 },
  { name: "Bread", category: "Pantry", estimatedPrice: 40 },
  { name: "Rice", category: "Grains", estimatedPrice: 80 },
  { name: "Chicken Breast", category: "Meat", estimatedPrice: 220 },
  { name: "Tomatoes", category: "Vegetables", estimatedPrice: 30 },
  { name: "Onions", category: "Vegetables", estimatedPrice: 25 },
  { name: "Apples", category: "Fruits", estimatedPrice: 120 },
];

await connectDB();
await GroceryItem.insertMany(groceries);

console.log("✅ Grocery items seeded");
process.exit();
