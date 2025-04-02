import express from "express"
import {handleCreateNewClient, handleUpdateUserLocation} from "../controller/clientController.js"
import {handleUpdateTodaysMenu, handleGetTodaysMenu} from "../controller/motherController.js"

const router = express.Router() ; 

//client calls
router.post("/createclient", handleCreateNewClient ) ;
router.post("/update-location", handleUpdateUserLocation ) ;

//Mother calls
router.post("/update-todays-menu", handleUpdateTodaysMenu) ;
router.get("/get-todays-menu/:email", handleGetTodaysMenu)

export default  router  ;