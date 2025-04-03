
import  client from "../models/userModel.js"
import Mother from "../models/kitchenModel.js"

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

export const handleUpdateClientProfile = async (req, res) => {
  const { email, phoneNumber, profileComplete } = req.body;

  // Validate required fields
  if (!email || !phoneNumber || typeof profileComplete !== 'boolean') {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: email, phoneNumber, and profileComplete'
    });
  }
  console.log(phoneNumber) ;

  try {
    // Update the client profile in the database
    const updatedClient = await client.findOneAndUpdate(
      { email: email },
      {
        $set: {
          mobileNumber: phoneNumber,
          profileComplete: profileComplete,
          updatedAt: new Date()
        }
      },
      { new: true } // Return the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({
        success: false,
        message: 'Client not found with the provided email'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        phoneNumber: updatedClient.phoneNumber,
        profileComplete: updatedClient.profileComplete
      }
    });

  } catch (error) {
    console.error('Error updating client profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while updating profile',
      error: error.message
    });
  }
};

export const handleUpdateSubscription = async (req, res) => {
  const { clientEmail, kitchenEmail, kitchenName } = req.body;

  // Validate required fields
  if (!clientEmail || !kitchenEmail || !kitchenName) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: clientEmail, kitchenEmail, and kitchenName'
    });
  }

  try {
    // First check if the client exists
    const existingClient = await client.findOne({ email: clientEmail });
    if (!existingClient) {
      return res.status(404).json({
        success: false,
        message: 'Client not found with the provided email'
      });
    }

    // Prepare update object based on current state
    const updateObj = {
      'subscribedMother': {
        email: kitchenEmail,
        kitchenName: kitchenName,
        subscribedAt: new Date()
      }
    };

    // Update the client's subscription in the database
    const updatedClient = await client.findOneAndUpdate(
      { email: clientEmail },
      { $set: updateObj },
      { new: true } // Return the updated document
    );

    return res.status(200).json({
      success: true,
      message: 'Subscription updated successfully',
      data: {
        subscribedMother: updatedClient.subscribedMother
      }
    });

  } catch (error) {
    console.error('Error updating subscription:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while updating subscription',
      error: error.message
    });
  }
};