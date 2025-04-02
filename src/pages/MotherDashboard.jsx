import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Plus } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";

const MotherDashboard = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [menu, setMenu] = useState({ lunch: [], dinner: [] });
  const [modalOpen, setModalOpen] = useState(false);
  const [newMenu, setNewMenu] = useState({
    lunch: "",
    dinner: "",
    lunchImg: "",
    dinnerImg: "",
  });

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/get-user",
          {
            email: user?.primaryEmailAddress?.emailAddress,
          }
        );

        console.log("User Data:", response.data);
        setUserData(response.data);
        setMenu(response.data.todaysMenu || {});
        console.log("Menu Data:", response.data.todaysMenu.lunch.name);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    if (user) {
      fetchUserRole();
    }
  }, [user]);

  // const fetchMenu = async () => {
  //   try {
  //     const response = await axios.get(
  //       http://localhost:5000/api/get-todays-menu/${userData.email}
  //     );
  //     setMenu(response.data.todaysMenu);
  //     console.log("Menu Data:", response.data);
  //   } catch (error) {
  //     console.error("Error fetching menu:", error);
  //   }
  // };

  const handleAddMenu = async () => {
    try {
      await axios.post("http://localhost:5000/api/update-todays-menu", {
        email: userData.email,
        lunch: newMenu.lunch,
        dinner: newMenu.dinner,
        lunchImg: newMenu.lunchImg,
        dinnerImg: newMenu.dinnerImg,
      });

      setModalOpen(false);
      // fetchMenu();
    } catch (error) {
      console.error("Error adding menu:", error);
    }
  };

  return (
    <div className="px-10">
      {/* Profile Section */}
      <Card className="mb-6">
        <CardContent className="flex items-center sm:justify-normal justify-center flex-wrap gap-6 p-6">
          <div className="w-36 h-36 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
            150 × 150
          </div>
          <div>
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
        </CardContent>
      </Card>

      {/* Today's Menu Section */}
      <Card className="mb-6">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Today's Menu</CardTitle>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <Plus size={16} className="mr-2" /> Update Today's Menu
          </button>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold">Lunch</h2>
            <p>{menu.lunch.name}</p>
            {menu.lunch.image && (
              <img
                src={menu.lunch.image}
                alt="Lunch"
                className="h-40 mt-2 rounded"
              />
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold">Dinner</h2>
            <p>{menu.dinner.name}</p>
            {menu.dinner.image && (
              <img
                src={menu.dinner.image}
                alt="Dinner"
                className="h-40 mt-2 rounded"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Customer Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Statistics</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-bold text-red-500">
            <div className="flex flex-col items-center w-fit">
              <p>{userData?.activeCustomers}</p>
              <p className="text-sm text-gray-500">Active Customers</p>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Income */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Income</CardTitle>
          </CardHeader>
          <CardContent className="text-green-600 text-2xl font-bold">
            ₹45,000
            <p className="text-sm text-gray-500">March 2024</p>
            <p className="text-sm text-green-500">↑ 15% vs Last Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Delivery Coverage</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700">
            <p>
              📍 <b>Primary:</b> Andheri East
            </p>
            <p>
              📍 <b>New Areas:</b> Bandra, Juhu
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
        {/* Delivery Coverage */}

        {/* Rating Breakdown */}
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

      {/* Modal for Adding Menu */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Today's Menu</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddMenu();
              }}
            >
              {/* Lunch Menu */}

              <input
                type="text"
                placeholder="Lunch Menu"
                className="border p-2 w-full mb-2 rounded"
                value={newMenu.lunch}
                required
                onChange={(e) =>
                  setNewMenu({ ...newMenu, lunch: e.target.value })
                }
              />

              {/* Lunch Image URL */}

              <input
                type="url"
                placeholder="Lunch Image URL"
                className="border p-2 w-full mb-2 rounded"
                value={newMenu.lunchImg}
                required
                onChange={(e) =>
                  setNewMenu({ ...newMenu, lunchImg: e.target.value })
                }
              />

              {/* Dinner Menu */}

              <input
                type="text"
                placeholder="Dinner Menu"
                className="border p-2 w-full mb-2 rounded"
                value={newMenu.dinner}
                required
                onChange={(e) =>
                  setNewMenu({ ...newMenu, dinner: e.target.value })
                }
              />

              {/* Dinner Image URL */}

              <input
                type="url"
                placeholder="Dinner Image URL"
                className="border p-2 w-full mb-2 rounded"
                value={newMenu.dinnerImg}
                required
                onChange={(e) =>
                  setNewMenu({ ...newMenu, dinnerImg: e.target.value })
                }
              />

              {/* Buttons */}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MotherDashboard;