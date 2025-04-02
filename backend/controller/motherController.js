import  Mother from "../models/kitchenModel"

export const handleUpdateTodaysMenu = async (req, res)=>{
    const { email, lunch, lunchImg, dinner, dinnerImg } = req.body;

    try {
      const updatedMother = await Mother.findOneAndUpdate(
        { email: email }, // Find mother by email
        {
          $set: {
            "todaysMenu.lunch.name": lunch,
            "todaysMenu.lunch.image": lunchImg,
            "todaysMenu.dinner.name": dinner,
            "todaysMenu.dinner.image": dinnerImg,
          },
        },
        { new: true } // Return updated document
      );
  
      if (!updatedMother) {
        return res.status(404).json({ message: "Mother not found" });
      }
  
      res.status(200).json({
        message: "Today's menu updated successfully",
        todaysMenu: updatedMother.todaysMenu,
      });
    } catch (error) {
      console.error("Error updating today's menu:", error);
      res.status(500).json({ message: "Internal server error" });
    }
}


export const handleGetTodaysMenu = async (req, res)=>{
    const { email } = req.params; // Fetch email from URL parameter

  try {
    const mother = await Mother.findOne({ email: email });

    if (!mother) {
      return res.status(404).json({ message: "Mother not found" });
    }

    res.status(200).json({ todaysMenu: mother.todaysMenu });
  } catch (error) {
    console.error("Error fetching today's menu:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}