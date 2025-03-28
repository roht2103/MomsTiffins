import mongoose from "mongoose";

const motherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
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

export default mongoose.model("Mother", motherSchema, "Mother" );
