
import  client from "../models/userModel.js"

export const handleGetUserDetail = (req, res)=>{


}
export const handleCreateNewClient = async (req, res) =>{

    try {
        const { clerkUserId, email,  profileComplete } = req.body;
        // Check if user already exists
        let user = await client.findOne({ email });
        if (user) {
            return res.json({message : "User alredy exists", user}).status(204);     
        }
        
        const newUser = await client.create({
            clerkUserId,
            email,
            profileComplete,
          });
      
        console.log("user saved") 
        res.status(200).json({ message: "User saved successfully", newUser });
      } catch (error) {
          console.log(error)
        res.status(500).json({ error: "Internal Server Error" , err : error});
      }
} 
    
export const handleUpdateUserLocation = async (req, res) =>{
    const { email, location } = req.body;

  try {
    await client.findOneAndUpdate(
      { email },
      { $set: { location } }, 
      { new : true}
    );

    res.json({ message: "Location updated successfully" });
  } catch (err) {
    console.log(err) 
    res.status(500).json({ error: "Failed to update location", err });
  }
}

