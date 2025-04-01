import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import axios from "axios";

const MotherDashboard = () => {
  const { user } = useUser();
  const [userData, setUserData] = React.useState(null);

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
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    if (user) {
      fetchUserRole();
    }
  }, [user]);

  return (
    <div className="px-10">
      {/* Profile Section */}
      <Card className="mb-6">
        <CardContent className="flex items-center sm:justify-normal justify-center flex-wrap gap-6 p-6">
          <div className="w-36 h-36 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
            150 × 150
          </div>
          <div>
            <h1 className="text-2xl font-bold">
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Customer Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Statistics</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between text-xl font-bold text-red-500">
            <div>
              <p>45</p>
              <p className="text-sm text-gray-500">Active Customers</p>
            </div>
            <div>
              <p>12</p>
              <p className="text-sm text-gray-500">New This Month</p>
            </div>
            <div>
              <p>3</p>
              <p className="text-sm text-gray-500">Pending Orders</p>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
        {/* Delivery Coverage */}
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
    </div>
  );
};

export default MotherDashboard;
