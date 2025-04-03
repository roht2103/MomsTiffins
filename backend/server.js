import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { useInRouterContext } from "react-router-dom";
import router from "./routes/routes.js";
import Client from "./models/userModel.js";
import Mother from "./models/kitchenModel.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.use("/api/createuser", router);
app.use("/api/user", router);

app.use("/api/signup", router);
app.use("/api/get-user", router);
app.use("/api/user-profile", router);
app.use("/api/profile-setup", router);
app.use("/update-todays-menu", router);
app.use("/get-todays-menu/:email", router);
app.use("api/update-main-menu", router);
app.use("/api/get-main-menu", router);

app.get("/", (req, res) => {
  res.end("Hello there!!!");
});

// // Define Client Schema
// const clientSchema = new mongoose.Schema({
//   clerkUserId: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   location: { type: String },
//   mobileNumber: { type: String },
//   foodPreferences: { type: Array },
//   role: { type: String, required: true },
//   profileComplete: { type: Boolean, default: false },
// });

// // Define Mother Schema
// const motherSchema = new mongoose.Schema({
//   clerkUserId: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   location: { type: String },
//   mobileNumber: { type: String },
//   specialty: { type: String }, // Specialty in food
//   rating: { type: Number, default: 0 },
//   reviews: { type: Number, default: 0 },
//   role: { type: String, required: true },
//   profileComplete: { type: Boolean, default: false },
// });

// Create Models
// const Client = mongoose.model("Client", clientSchema, "clients");
// const Mother = mongoose.model("Mother", motherSchema, "mothers");

// Route to handle user signup based on role
// app.post("/api/signup", async (req, res) => {
//   try {
//     const { clerkUserId, email, firstName, lastName, role } = req.body;

//     // Validate role
//     if (!["client", "mother"].includes(role)) {
//       return res.status(400).json({ message: "Invalid role" });
//     }

//     if (role === "client") {
//       // Check if client already exists
//       let existingClient = await Client.findOne({ clerkUserId });
//       if (existingClient) {
//         return res.status(400).json({ message: "Client already exists" });
//       }

//       // Create new client
//       const client = new Client({
//         clerkUserId,
//         email,
//         firstName,
//         lastName,
//         role,
//         profileComplete: false,
//       });

//       await client.save();
//       console.log("Client registered successfully");
//       return res
//         .status(201)
//         .json({ message: "Client registered successfully", client });
//     } else if (role === "mother") {
//       console.log("Mother role detected");
//       // Check if mother already exists
//       let existingMother = await Mother.findOne({ clerkUserId });
//       if (existingMother) {
//         return res.status(400).json({ message: "Mother already exists" });
//       }

//       // Create new mother
//       const mother = new Mother({
//         clerkUserId,
//         email,
//         firstName,
//         lastName,
//         role,
//         profileComplete: false,
//       });

//       await mother.save();
//       console.log("Mother registered successfully");
//       return res
//         .status(201)
//         .json({ message: "Mother registered successfully", mother });
//     }
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// Route to update client profile
// app.post("/api/profile-setup", async (req, res) => {
//   try {
//     const {
//       clerkUserId,
//       email,
//       location,
//       mobileNumber,
//       foodPreferences,
//       speciality,
//       role,
//     } = req.body;
//     let user;
//     if (role === "client") {
//       console.log("Client role detected");
//       user = await Client.findOne({ $or: [{ clerkUserId }, { email }] });
//     } else {
//       console.log("Mother role detected");
//       user = await Mother.findOne({ $or: [{ clerkUserId }, { email }] });
//     }

//     if (!user) {
//       return res.status(404).json({ message: "Client not found" });
//     }

//     user.location = location;
//     user.mobileNumber = mobileNumber;
//     role === "client"
//       ? (user.foodPreferences = foodPreferences)
//       : (user.speciality = speciality);
//     user.profileComplete = true;

//     await user.save();

//     res.status(200).json({ message: "Profile updated successfully", user });
//   } catch (error) {
//     console.error("Profile Setup Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.post("/api/get-user", async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   try {
//     let user = await Client.findOne({ email }).select("-password");

//     if (user) {
//       console.log("User found in Client model:", user);
//       return res.json({ ...user.toObject(), role: "client" });
//     }

//     user = await Mother.findOne({ email }).select("-password");

//     if (user) {
//       console.log("User found in Mother model:", user);
//       return res.json({ ...user.toObject(), role: "mother" });
//     }

//     console.log("User not found");
//     return res.status(404).json({ message: "User not found" });
//   } catch (error) {
//     console.error("Get User Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// Route to fetch client profile completion status
// app.post("/api/user-profile", async (req, res) => {
//   const { email, role } = req.body;
//   try {
//     let user;
//     if (role === "client") {
//       user = await Client.findOne({ email });
//     } else {
//       user = await Mother.findOne({ email });
//     }
//     if (!user) {
//       console.log("user not found: ", email);
//       return res.status(404).json({ message: "Client not found" });
//     }
//     res.json({ profileComplete: user.profileComplete });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     console.log(error);
//   }
// });

app.use("/api", router);
app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
