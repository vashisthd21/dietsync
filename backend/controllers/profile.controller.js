import Profile from "../models/Profile.model.js";

/* ---------------- GET PROFILE ---------------- */
export const getProfile = async (req, res) => {
  const profile = await Profile.findOne({ userId: req.user._id });

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.json(profile);
};

/* ---------------- CREATE / UPDATE PROFILE ---------------- */
export const upsertProfile = async (req, res) => {
  const profile = await Profile.findOneAndUpdate(
    { userId: req.user._id },
    {
      ...req.body,
      userId: req.user._id,
      email: req.user.email,
      onboardingCompleted: true,
    },
    { upsert: true, new: true }
  );

  res.json(profile);
};
