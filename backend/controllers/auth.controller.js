import User from "../models/User.models.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signupWithEmail = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  // 🚫 Email already exists
  if (existingUser) {
    if (existingUser.googleId) {
      return res.status(409).json({
        type: "GOOGLE_ACCOUNT",
        message:
          "This email is already registered via Google. Please sign in using Google.",
      });
    }

    return res.status(409).json({
      type: "EMAIL_ACCOUNT",
      message: "Account already exists. Please log in.",
    });
  }

  // ✅ Create new email/password user
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    emailVerified: true, // already verified via OTP
  });

  const token = generateToken(user);

  res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      onboardingCompleted: false,
    },
  });
};

export const checkEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    // ✅ Email is free
    return res.json({ exists: false });
  }

  if (user.googleId) {
    // ❌ Registered via Google
    return res.status(409).json({
      exists: true,
      provider: "google",
      message:
        "This email is already registered via Google. Please sign in using Google.",
    });
  }

  // ❌ Registered via email/password
  return res.status(409).json({
    exists: true,
    provider: "password",
    message: "This email is already registered. Please sign in.",
  });
};
