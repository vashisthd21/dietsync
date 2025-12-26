import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: String,
    message: String,
    read: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["grocery", "planner", "system"],
      default: "system",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
