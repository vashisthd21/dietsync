import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";

import connectDB from "./config/db.js";
import "./config/passport.js";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import recommendRoutes from "./routes/recommend.routes.js";
import homeRoutes from "./routes/home.routes.js";
import dailyRoutes from "./routes/daily.routes.js";
import { protect } from "./middlewares/auth.middleware.js";

const app = express();
const PORT = process.env.PORT || 5050;

// 🔥 CONNECT TO MONGODB FIRST
connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(passport.initialize());

// 🔓 PUBLIC
app.use("/auth", authRoutes);

// 🔐 PROTECTED
app.use("/api/profile", protect, profileRoutes);
app.use("/api/recommend", protect, recommendRoutes);
app.use("/api/home", protect, homeRoutes);
app.use("/api/daily", protect, dailyRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
