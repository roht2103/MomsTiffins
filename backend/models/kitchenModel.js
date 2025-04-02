import mongoose from "mongoose";

const motherSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    kitchenName: { type: String, required: true, unique: true },
    mobileNumber: { type: String },
    speciality: { type: String }, // Specialty in food
    activeCustomers: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    role: { type: String, default: "mother" },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    menu: {
      type: Object,
      default: {},
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    todaysMenu: {
      type: Object,
      default: {},
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
  },
  { timestamps: true }
);

motherSchema.index({ location: "2dsphere" }); // Geospatial index

export default mongoose.model("Mother", motherSchema, "Mother");
