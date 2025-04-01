import express from "express"
import {handleCreateNewClient, handleUpdateUserLocation} from "../controller/clientController.js"


const router = express.Router() ; 

 
router.post("/createclient", handleCreateNewClient ) ;
router.post("/update-location", handleUpdateUserLocation )

export default  router  ;