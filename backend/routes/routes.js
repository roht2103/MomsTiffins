import express from "express"
import {handleCreateNewClient, handleUpdateUserLocation, handleUpdateSubscription} from "../controller/clientController.js"

import {handleFetchNearByMothers} from "../controller/fetchNearbyMother.js" 
import {handleUpdateClientProfile} from "../controller/clientController.js"

//mother imports
import {
    handleUpdateTodaysMenu,
    handleGetTodaysMenu,
    handleCreateNewMother,
    handleGetUser,
    handleGetUserProfile,
    handleMotherProfileSetup,
    handleUpdateStatus,
    handleUpdateMainMenu,
  } from "../controller/motherController.js";
  
  

const router = express.Router() ; 

//client calls
router.post("/createclient", handleCreateNewClient ) ;
router.post("/update-location", handleUpdateUserLocation ) ;
router.put("/user/update-profile", handleUpdateClientProfile) ;
router.put("/updatesubscription", handleUpdateSubscription ) ;

//Mother calls

router.post("/signup", handleCreateNewMother);
router.post("/get-user", handleGetUser);
router.post("/user-profile", handleGetUserProfile);
router.post("/profile-setup", handleMotherProfileSetup);
router.post("/update-todays-menu", handleUpdateTodaysMenu);
router.get("/get-todays-menu/:email", handleGetTodaysMenu);
router.get("/update-status", handleUpdateStatus);
// router.post("/update-main-menu", handleUpdateMainMenu);


//fetching nearby mother 
router.get("/fetch-nearby-mothers" , handleFetchNearByMothers) ;


export default  router  ;