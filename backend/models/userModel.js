import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      default: "",
    },
    mobileNumber: {
      type: String,
      default: "",
    },
    foodPreferences: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["client", "mother"],
      default: "client",
    },
    profileComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
