import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  description: { type: String },
  imageURL: { type: String },
});

const motherSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    kitchenName: { type: String, unique: true },
    mobileNumber: { type: String },
    speciality: { type: String }, // Specialty in food
    activeCustomers: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    role: { type: String, default: "mother" },
    profileComplete: { type: Boolean, default: false },

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
    logoURL: {
      type: String,
      default: "",
    },

    todaysMenu: [
      {
        itemImage: { type: String, required: true },
        itemName: { type: String, required: true },
        itemPrice: { type: Number, required: true },
        itemDescription: { type: String, required: true },
        itemRating: { type: Number, default: 0, min: 0, max: 5 },
      },
    ],
    menu: {
      breakfast: [menuItemSchema],
      lunch: [menuItemSchema],
      dinner: [menuItemSchema],
    },
    clients: [{ email: { type: String } }],
    monthlyRate: { type: Number, default: 0 },
    monthlyIncome: { type: Number, default: 0 },
    isActive: {
      type: Boolean,
      default: false,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [-1, -1], // Allow it to be empty initially
      },
    },
  },
  { timestamps: true }
);

motherSchema.index({ location: "2dsphere" }); // Geospatial index

export default mongoose.model("Mother", motherSchema, "Mother");
