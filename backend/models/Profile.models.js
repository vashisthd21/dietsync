import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: String,
    age: Number,
    email: String,
    avatar: String,
    dietPreference: [String],
    allergies: [String],
    medicalConditions: [String],
    budget: String,
    tastePreferences: [String],
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
