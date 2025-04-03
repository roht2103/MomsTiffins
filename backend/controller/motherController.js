import Mother from "../models/kitchenModel.js";

export const handleCreateNewMother = async (req, res) => {
  try {
    const { clerkUserId, email, firstName, lastName, role } = req.body;

    // Check if client already exists
    let existingClient = await Mother.findOne({ clerkUserId });
    if (existingClient) {
      return res.status(400).json({ message: "Client already exists" });
    }
    console.log("Mother role detected");
    // Check if mother already exists
    let existingMother = await Mother.findOne({ clerkUserId });
    if (existingMother) {
      return res.status(400).json({ message: "Mother already exists" });
    }

    // Create new mother
    const mother = new Mother({
      clerkUserId,
      email,
      firstName,
      lastName,
      role,
      profileComplete: false,
    });

    await mother.save();
    console.log("Mother registered successfully");
    return res
      .status(201)
      .json({ message: "Mother registered successfully", mother });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const handleGetUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await Mother.findOne({ email }).select("-password");

    if (user) {
      console.log("User found in Mother model:", user);
      return res.json({ ...user.toObject(), role: "mother" });
    }

    console.log("User not found");
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const handleGetUserProfile = async (req, res) => {
  const { email, role } = req.body;
  try {
    const user = await Mother.findOne({ email });

    if (!user) {
      console.log("user not found: ", email);
      return res.status(404).json({ message: "Mother not found" });
    }
    res.json({ profileComplete: user.profileComplete });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const handleMotherProfileSetup = async (req, res) => {
  try {
    const {
      clerkUserId,
      email,
      location,
      mobileNumber,
      kitchenName,
      speciality,
      monthlyRate,
      logoURL,
      role,
    } = req.body;
    const user = await Mother.findOne({ $or: [{ clerkUserId }, { email }] });

    if (!user) {
      return res.status(404).json({ message: "Client not found" });
    }

    user.location = location;
    user.logoURL = logoURL;
    user.monthlyRate = monthlyRate;
    user.mobileNumber = mobileNumber;
    user.kitchenName = kitchenName;
    user.speciality = speciality;
    user.profileComplete = true;
    user.isActive = true; // Set isActive to true

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Profile Setup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const handleUpdateTodaysMenu = async (req, res) => {
  const { email, menuItems } = req.body; // menuItems is an array

  try {
    const updatedMother = await Mother.findOneAndUpdate(
      { email },
      { $set: { todaysMenu: menuItems } }, // Replace existing menu
      { new: true }
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
};

export const handleGetTodaysMenu = async (req, res) => {
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
};

// Update Main Menu
export const handleUpdateMainMenu = async (req, res) => {
  try {
    const { email, mainMenu } = req.body;

    if (!email || !mainMenu) {
      return res
        .status(400)
        .json({ message: "Email and menu data are required" });
    }

    console.log(mainMenu);

    // Update menu for the user
    const User = await Mother.findOne({ email });

    User.breakfast = mainMenu.breakfast;
    User.lunch = mainMenu.lunch;
    User.dinner = mainMenu.dinner;

    await User.save();

    const updatedUser = await Mother.findOne({ email });

    res
      .status(200)
      .json({ message: "Main menu updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating main menu:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};