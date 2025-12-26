import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: String,
    email: {
      type: String,
      unique: true,
    },
    avatar: String,
    dietPreference: [String],
    allergies: [String],
    goals: {
    type: String,
    enum: ["Weight Loss", "Weight Gain", "Maintenance"],
    },
    dailyCalorieTarget: {
      type: Number,
      default: 2000,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
