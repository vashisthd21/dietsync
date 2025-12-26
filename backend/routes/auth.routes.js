import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import { checkEmail } from "../controllers/auth.controller.js";
import { updateProfile } from "../controllers/user.controller.js";
import { generateToken } from "../utils/generateToken.js";
import {
  sendOtp,
  verifyOtp,
} from "../controllers/otp.controller.js";
import User from "../models/User.models.js";
import { signupWithEmail } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.put("/profile", protect, updateProfile);
/* ---------------- GOOGLE AUTH (UNCHANGED) ---------------- */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "https://dietsync.vercel.app//login",
  }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`https://dietsync.vercel.app/mealfeed?token=${token}`);
  }
);

/* ---------------- EMAIL OTP ---------------- */
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/signup", signupWithEmail);
router.post("/check-email", checkEmail);
/* ---------------- EMAIL SIGNUP ---------------- */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    // ❌ Email not verified
    if (!user || !user.emailVerified) {
      return res.status(403).json({
        message: "Please verify your email first",
      });
    }

    // ❌ Already signed up
    if (user.password) {
      return res.status(400).json({
        message: "User already exists. Please login.",
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.name = name;
    user.password = hashedPassword;
    await user.save();

    res.status(201).json({
      message: "Signup successful",
      isNewUser: true,
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
});

export default router;
