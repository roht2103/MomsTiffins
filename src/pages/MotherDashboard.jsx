import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import MenuModal from "../components/MenuModal";
// import MainMenuModel from "../components/MainMenuModel";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MotherDashboard = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [mainMenuItems, setMainMenuItems] = useState([]);
  // const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();
  const d = new Date();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // Fetch user role and menu
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/get-user",
          {
            email: user?.primaryEmailAddress?.emailAddress,
          }
        );

        setUserData(response.data);
        fetchMenu(response.data.email);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    if (user) {
      fetchUserRole();
    }
  }, [user]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (
        userData?.location.coordinates[0] &&
        userData?.location.coordinates[1]
      ) {
        try {
          const apiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${userData.location.coordinates[0]}&lon=${userData.location.coordinates[1]}&apiKey=98ce63fee65544d5a668dbc0a362176c`;
          const response = await axios.get(apiUrl);
          const address = response.data?.features?.[0]?.properties?.formatted;
          setLocation(address || "Unknown Location");
          console.log("Location fetched:", address);
        } catch (error) {
          console.error("Error fetching location:", error);
          setLocation("Location unavailable");
        }
      }
    };

    fetchLocation();
  }, [userData]);

  // Fetch today's menu
  const fetchMenu = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/get-todays-menu/${email}`
      );
      setMenuItems(response.data.todaysMenu || []);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  // Save menu to database
  const handleSaveMenu = async (menuItems) => {
    try {
      await axios.post("http://localhost:5000/api/update-todays-menu", {
        email: user?.primaryEmailAddress?.emailAddress,
        menuItems,
      });
      alert("Menu Updated Successfully!");
      fetchMenu(user?.primaryEmailAddress?.emailAddress);
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  // Save Main Menu to Database
  // const handleSaveMainMenu = async (updatedMenu) => {
  //   try {
  //     await axios.post("http://localhost:5000/api/update-main-menu", {
  //       email: user?.primaryEmailAddress?.emailAddress,
  //       mainMenu: updatedMenu,
  //     });
  //     alert("Main Menu Updated Successfully!");
  //     // fetchMainMenu(user?.primaryEmailAddress?.emailAddress);
  //   } catch (error) {
  //     console.error("Error updating main menu:", error);
  //   }
  // };

  return (
    <div className="px-10">
      {/* Profile Section */}
      <Card className="mb-6">
        <CardContent className="flex items-center sm:justify-normal justify-center flex-wrap gap-6 p-6">
          <div className="flex items-center justify-center text-gray-500">
            <img
              className="w-36 h-36 bg-gray-300 rounded-full"
              src={userData?.logoURL}
              alt="Kitchen Logo"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{userData?.kitchenName}</h1>
            <h1 className="text-xl font-semibold">
              Mrs. {user?.fullName || "User"}
            </h1>
            <p className="text-gray-600">Speciality: {userData?.speciality}</p>
            <div className="flex items-center mt-2">
              <Star className="text-yellow-500" />
              <span className="text-lg font-semibold ml-1">
                {userData?.rating}
              </span>
              <span className="text-gray-500 ml-2">
                ({userData?.reviews} reviews)
              </span>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/profile-setup")}>
            <Pencil className="" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Today's Menu Section */}
      <Card className="mb-6">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Today's Menu</CardTitle>
          <span className="flex gap-2">
            <Button variant="destructive" onClick={() => handleSaveMenu([])}>
              Reset Today's Menu
            </Button>
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              Manage Today's Menu
            </Button>
          </span>
          <MenuModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveMenu}
          />
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {menuItems.length > 0 ? (
            menuItems.map((item, index) => (
              <div key={index} className="border p-3 rounded-lg">
                {item.itemImage && (
                  <img
                    src={item.itemImage}
                    alt="Menu Item"
                    className="h-40 w-full object-cover rounded-lg mb-2"
                  />
                )}
                <h3 className="text-lg font-semibold">{item.itemName}</h3>
                <p className="text-gray-600">₹{item.itemPrice}</p>
                {item.itemDescription && (
                  <p className="text-sm text-gray-500">
                    {item.itemDescription}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No menu available for today.</p>
          )}
        </CardContent>
      </Card>

      {/* Main Menu Section */}
      {/* <Card className="mb-6">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Today's Menu</CardTitle>
          <span className="flex gap-2">
            <Button
              variant="destructive"
              onClick={() =>
                handleSaveMainMenu({ breakfast: [], lunch: [], dinner: [] })
              }
            >
              Reset Main Menu
            </Button>
            <Button variant="outline" onClick={() => setIsMainModalOpen(true)}>
              Manage Main Menu
            </Button>
          </span>
          <MainMenuModel
            isOpen={isMainModalOpen}
            onClose={() => setIsMainModalOpen(false)}
            onSave={handleSaveMainMenu}
          />
        </CardHeader> */}
      {/* <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {menuItems.length > 0 ? (
            menuItems.map((item, index) => (
              <div key={index} className="border p-3 rounded-lg">
                {item.itemImage && (
                  <img
                    src={item.itemImage}
                    alt="Menu Item"
                    className="h-40 w-full object-cover rounded-lg mb-2"
                  />
                )}
                <h3 className="text-lg font-semibold">{item.itemName}</h3>
                <p className="text-gray-600">₹{item.itemPrice}</p>
                {item.itemDescription && (
                  <p className="text-sm text-gray-500">
                    {item.itemDescription}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No menu available for today.</p>
          )}
        </CardContent> */}
      {/* </Card> */}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Customer Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Statistics</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-evenly text-xl font-bold text-red-500">
            <div className="flex flex-col items-center w-fit">
              <p>{userData?.activeCustomers}</p>
              <p className="text-sm text-center text-gray-500">
                Active Customers
              </p>
            </div>
            <div className="flex flex-col items-center w-fit">
              <p>{userData?.clients.length}</p>
              <p className="text-sm text-center text-gray-500">
                Total Customers
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Income */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Income</CardTitle>
          </CardHeader>
          <CardContent className="text-green-600 text-2xl font-bold">
            {userData?.monthlyIncome}
            <p className="text-sm text-gray-500">
              {month[d.getMonth()] + " " + d.getFullYear()}
            </p>
          </CardContent>
        </Card>

        {/* Delivery Coverage */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Coverage</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700">
            <p>
              📍 <b>Primary:</b> {location || "Fetching..."}
            </p>
            <p>
              📍 <b>Coverage:</b> Within 4 km radius
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Rating Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Rating Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Star className="text-yellow-500" />{" "}
              <span className="font-bold">5</span>
              <div className="w-full bg-gray-200 h-2 rounded-lg overflow-hidden">
                <div
                  className="bg-yellow-500 h-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <span>90</span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <Star className="text-yellow-500" />{" "}
              <span className="font-bold">4</span>
              <div className="w-full bg-gray-200 h-2 rounded-lg overflow-hidden">
                <div
                  className="bg-yellow-500 h-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
              <span>24</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MotherDashboard;
