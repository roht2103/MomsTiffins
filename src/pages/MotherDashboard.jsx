import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Pencil, Wifi, WifiOff, ChefHat, Users, DollarSign, MapPin } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import MenuModal from "../components/MenuModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const MotherDashboard = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const d = new Date();
  const month = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Fetch user role and menu
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/mother/get-user",
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
      if (userData?.location.coordinates[0] && userData?.location.coordinates[1]) {
        try {
          const apiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${userData.location.coordinates[0]}&lon=${userData.location.coordinates[1]}&apiKey=98ce63fee65544d5a668dbc0a362176c`;
          const response = await axios.get(apiUrl);
          const address = response.data?.features?.[0]?.properties?.formatted;
          setLocation(address || "Unknown Location");
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
      await axios.post("http://localhost:5000/api/mother/update-todays-menu", {
        email: user?.primaryEmailAddress?.emailAddress,
        menuItems,
      });
      alert("Menu Updated Successfully!");
      fetchMenu(user?.primaryEmailAddress?.emailAddress);
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  // Toggle online status
  const toggleOnlineStatus = async () => {
    setIsLoading(true);
    try {
      console.log(userData.isActive) ;
      
      const newStatus = !userData.isActive;
      console.log(newStatus) ;
      await axios.post("http://localhost:5000/api/mother/status/update-status", {
        email: userData.email,
        isActive: newStatus
      });
      setUserData(prev => ({ ...prev, isActive: newStatus }));
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-12 py-6 bg-gray-50 min-h-screen">
      {/* Header with Status Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kitchen Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="online-mode" 
              checked={userData?.isActive ?? false}
              onCheckedChange={toggleOnlineStatus}
              disabled={isLoading}
            />
            <Label htmlFor="online-mode" className="flex items-center gap-2">
              {userData?.isActive ? (
                <>
                  <Wifi className="h-4 w-4 text-green-500" />
                  <span className="text-green-600">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-red-500" />
                  <span className="text-red-600">Offline</span>
                </>
              )}
            </Label>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate("/profile-setup")}
            className="flex items-center gap-2"
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Section */}
      <Card className="mb-6 border-0 shadow-lg">
        <CardContent className="flex flex-col sm:flex-row items-center sm:justify-start justify-center gap-6 p-6">
          <div className="relative">
            <img
              className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white shadow-md"
              src={userData?.logoURL || "https://via.placeholder.com/150"}
              alt="Kitchen Logo"
            />
            {userData?.isActive && (
              <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1.5 border-2 border-white">
                <Wifi className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{userData?.kitchenName}</h1>
            <p className="text-lg text-gray-600">
              <ChefHat className="inline mr-2 h-5 w-5 text-amber-500" />
              Mrs. {user?.fullName || "User"}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3">
              <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                <Star className="text-amber-500 h-4 w-4" />
                <span className="ml-1 font-semibold text-gray-700">
                  {userData?.rating || "0.0"}
                </span>
                <span className="text-gray-500 ml-1 text-sm">
                  ({userData?.reviews || 0} reviews)
                </span>
              </div>
              <div className="bg-blue-50 px-3 py-1 rounded-full">
                <span className="text-gray-700 font-medium">
                  Speciality: <span className="text-blue-600">{userData?.speciality || "Not specified"}</span>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Customer Statistics */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold text-blue-600">{userData?.activeCustomers || 0}</p>
                <p className="text-sm text-gray-500">Active</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-gray-700">{userData?.clients?.length || 0}</p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
            </div>
            <Progress value={(userData?.activeCustomers / (userData?.clients?.length || 1)) * 100} className="h-2 mt-3" />
          </CardContent>
        </Card>

        {/* Monthly Income */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Monthly Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              ₹{userData?.monthlyIncome?.toLocaleString() || "0"}
            </p>
            <p className="text-sm text-gray-500">
              {month[d.getMonth()]} {d.getFullYear()}
            </p>
          </CardContent>
        </Card>

        {/* Delivery Coverage */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-500" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 line-clamp-2">
              {location || "Fetching location..."}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Coverage: 4 km radius
            </p>
          </CardContent>
        </Card>

        {/* Status Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              {userData?.isActive ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500" />
              )}
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              {userData?.isActive ? (
                <span className="text-green-600">Online</span>
              ) : (
                <span className="text-red-600">Offline</span>
              )}
            </p>
            <p className="text-sm text-gray-500">
              {userData?.isActive ? "Accepting orders" : "Not accepting orders"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Menu Section */}
      <Card className="mb-6 border-0 shadow-lg">
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-amber-500" />
              Today's Menu
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => handleSaveMenu([])}
                className="gap-2"
              >
                Clear Menu
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => setIsModalOpen(true)}
                className="gap-2"
              >
                Manage Menu
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {menuItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {menuItems.map((item, index) => (
                <div key={index} className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative aspect-square">
                    <img
                      src={item.itemImage || "https://via.placeholder.com/300"}
                      alt={item.itemName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <h3 className="text-lg font-semibold text-white">{item.itemName}</h3>
                      <p className="text-white">₹{item.itemPrice}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    {item.itemDescription && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.itemDescription}
                      </p>
                    )}
                    <div className="flex items-center mt-3">
                      <Star className="h-4 w-4 text-amber-500" />
                      <span className="ml-1 text-sm font-medium text-gray-700">
                        {item.itemRating.toFixed(1)}/5
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ChefHat className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-500">No menu items for today</h3>
              <p className="text-sm text-gray-400 mt-1">
                Add items to start receiving orders
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setIsModalOpen(true)}
              >
                Add Menu Items
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rating Breakdown */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" />
            Rating Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-4">
                <div className="flex items-center w-16">
                  <Star className="text-amber-500 h-4 w-4" />
                  <span className="ml-1 font-medium">{stars}</span>
                </div>
                <Progress 
                  value={stars === 5 ? 80 : stars === 4 ? 50 : stars === 3 ? 20 : stars === 2 ? 5 : 0} 
                  className="h-2 flex-1" 
                />
                <span className="text-sm text-gray-500 w-8 text-right">
                  {stars === 5 ? 90 : stars === 4 ? 24 : stars === 3 ? 5 : stars === 2 ? 1 : 0}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <MenuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMenu}
      />
    </div>
  );
};

export default MotherDashboard;