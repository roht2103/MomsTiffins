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
      default: "client", 
    },
    profileComplete: { 
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
        required: true, 
      }, 
    },
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" }); // Geospatial index

export default mongoose.model("User", userSchema, "User");
