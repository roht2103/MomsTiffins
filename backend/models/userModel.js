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
    subscribedMother: { 
       email : {type :  String },
       name : {type :  String}  ,
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
        default: [-1,-1], // Allow it to be empty initially
      },
    },
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" }); // Geospatial index
const client = mongoose.model("client", userSchema, "client"); 

export default client;
