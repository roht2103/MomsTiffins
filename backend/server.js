import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

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

// Define Client Schema
const clientSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  location: { type: String },
  mobileNumber: { type: String },
  foodPreferences: { type: Array },
  role: { type: String, required: true },
  profileComplete: { type: Boolean, default: false },
});

// Create Client Model
const Client = mongoose.model("Client", clientSchema, "clients");

// Route to store new clients in the `clients` collection
app.post("/api/signup", async (req, res) => {
  try {
    const {
      clerkUserId,
      email,
      location,
      mobileNumber,
      foodPreferences,
      role,
    } = req.body;

    // Check if client already exists
    let client = await Client.findOne({ clerkUserId });
    if (client) {
      return res.status(400).json({ message: "Client already exists" });
    }

    // Create new client
    client = new Client({
      clerkUserId,
      email,
      location,
      mobileNumber,
      foodPreferences,
      role,
      profileComplete: false,
    });

    await client.save();

    res.status(201).json({ message: "Client registered successfully", client });
    console.log("Client registered successfully");
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to update client profile
app.post("/api/profile-setup", async (req, res) => {
  try {
    const {
      clerkUserId,
      email,
      location,
      mobileNumber,
      foodPreferences,
      role,
    } = req.body;

    // Find client by Clerk user ID or email
    let client = await Client.findOne({ $or: [{ clerkUserId }, { email }] });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Update client details
    client.location = location;
    client.mobileNumber = mobileNumber;
    client.foodPreferences = foodPreferences;
    client.role = role;
    client.profileComplete = true;

    // Save the updated client
    await client.save();

    res.status(200).json({ message: "Profile updated successfully", client });
  } catch (error) {
    console.error("Profile Setup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.use(express.json()); // Ensure JSON body parsing middleware is used

app.post("/api/get-user", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const client = await Client.findOne({ email }).select("-password"); // Exclude password field if present
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to fetch client profile completion status
app.post("/api/user-profile", async (req, res) => {
  const { email } = req.body;
  try {
    const client = await Client.findOne({ email });
    if (!client) {
      console.log("Client not found");
      return res.status(404).json({ message: "Client not found" });
    }
    res.json({ profileComplete: client.profileComplete });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
