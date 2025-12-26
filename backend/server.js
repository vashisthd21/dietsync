import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import http from "http";

import connectDB from "./config/db.js";
import "./config/passport.js";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import recommendRoutes from "./routes/recommend.routes.js";
import homeRoutes from "./routes/home.routes.js";
import dailyRoutes from "./routes/daily.routes.js";
import mealRoutes from "./routes/meal.routes.js";
import plannerRoutes from "./routes/planner.routes.js";
import groceryRoutes from "./routes/grocery.routes.js";

import { protect } from "./middlewares/auth.middleware.js";
import { initSocket } from "./socket.js";

const app = express();
const PORT = process.env.PORT || 5050;

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());


app.use("/auth", authRoutes);

// 🔐 PROTECTED
app.use("/api/profile", protect, profileRoutes);
app.use("/api/recommend", protect, recommendRoutes);
app.use("/api/home", protect, homeRoutes);
app.use("/api/daily", protect, dailyRoutes);
app.use("/api/meals", protect, mealRoutes);
app.use("/api/planner", protect, plannerRoutes);
app.use("/api/grocery", protect, groceryRoutes);
// app.use("/api/notifications", protect, notificationRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
