import express from "express";
import {
  handleCreateNewClient,
  handleUpdateUserLocation,
} from "../controller/clientController.js";
import {
  handleUpdateTodaysMenu,
  handleGetTodaysMenu,
  handleCreateNewMother,
  handleGetUser,
  handleGetUserProfile,
  handleMotherProfileSetup,
  handleUpdateMainMenu,
} from "../controller/motherController.js";

const router = express.Router();

//client calls
router.post("/createclient", handleCreateNewClient);
router.post("/update-location", handleUpdateUserLocation);

//Mother calls
router.post("/signup", handleCreateNewMother);
router.post("/get-user", handleGetUser);
router.post("/user-profile", handleGetUserProfile);
router.post("/profile-setup", handleMotherProfileSetup);
router.post("/update-todays-menu", handleUpdateTodaysMenu);
router.get("/get-todays-menu/:email", handleGetTodaysMenu);
router.post("/update-main-menu", handleUpdateMainMenu);

export default router;
