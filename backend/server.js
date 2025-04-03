import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { useInRouterContext } from "react-router-dom";
import router from "./routes/routes.js";

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
app.use("/api", router);
//fetch nearby mothers
app.use("/api", router)

app.get("/", (req, res) => {
  res.end("Hello there!!!");
})

app.use("/api", router); 

app.use("/api/signup", router);
app.use("/api/get-user", router);
app.use("/api/user-profile", router);
app.use("/api/profile-setup", router);
app.use("/update-todays-menu", router);
app.use("/get-todays-menu/:email", router);
app.use("api/update-main-menu", router);
app.use("/api/get-main-menu", router);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
