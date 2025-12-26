import express from "express";
import GroceryItem from "../models/GroceryItem.models.js";
import UserGrocery from "../models/UserGrocery.models.js";
import Notification from "../models/Notification.models.js";
import { emitNotification } from "../socket.js";

const router = express.Router();
// routes/grocery.js
// import Grocery from "../models/Grocery.models.js"; // Import the model with 'name' field

router.post("/add-bulk", async (req, res) => {
  try {
    const { items } = req.body; 
    
    // items is an array of { name, quantity, category }
    const groceryDocs = items.map(ing => ({
      user: req.user._id,
      name: ing.name, // The Grocery model uses 'name' as a string
      quantity: ing.quantity || "1",
      category: ing.category || "Meal Ingredients",
      checked: false
    }));

    // Bulk insert all ingredients at once
    const savedItems = await Grocery.insertMany(groceryDocs);

    // Create a notification (optional)
    const notification = await Notification.create({
      user: req.user._id,
      title: "Grocery Updated",
      message: `${savedItems.length} ingredients added from meal selection.`,
    });
    emitNotification(req.user._id, notification);

    res.status(200).json({ success: true, count: savedItems.length });
  } catch (err) {
    console.error("Bulk Add Error:", err);
    res.status(500).json({ error: "Failed to save ingredients to your list" });
  }
});
/* =====================
   REMAINING ROUTES (Existing)
===================== */
router.get("/items", async (req, res) => {
  const items = await GroceryItem.find();
  res.json(items);
});

router.get("/", async (req, res) => {
  const list = await UserGrocery.find({ user: req.user._id }).populate("item");
  res.json(list);
});

router.delete("/:id", async (req, res) => {
  await UserGrocery.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;