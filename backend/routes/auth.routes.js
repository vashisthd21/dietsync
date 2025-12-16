import express from "express";
import passport from "passport";
import { generateToken } from "../utils/generateToken.js";

const router = express.Router();

// 🔓 PUBLIC
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// 🔓 CALLBACK (NO protect)
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`http://localhost:5173/dashboard?token=${token}`);

  }
);

export default router;
