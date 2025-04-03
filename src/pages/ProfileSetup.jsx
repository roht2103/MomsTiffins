import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function showAlert(title, description) {
  return (
    <Alert>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

const MotherProfileSetup = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [kitchenName, setKitchenName] = useState("");
  const [logoURL, setLogoURL] = useState("");
  const [monthlyRate, setMonthlyRate] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [location, setLocation] = useState({
    type: "Point",
    coordinates: [-1, -1],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingRole, setIsFetchingRole] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/get-user",
          {
            email: user?.primaryEmailAddress?.emailAddress,
          }
        );

        if (response.data.role !== "mother") {
          navigate("/not-authorized"); // Redirect if not a mother
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        showAlert("Error", "Failed to fetch user role.");
      } finally {
        setIsFetchingRole(false);
      }
    };

    if (user) {
      fetchUserRole();
    }
  }, [user, navigate]);

  // 📍 Get current location using Geolocation API
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      showAlert("Error", "Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ type: "Point", coordinates: [latitude, longitude] });

        showAlert("Success", `Location set: (${latitude}, ${longitude})`);
      },
      (error) => {
        console.error("Error getting location:", error);
        showAlert(
          "Error",
          "Failed to get location. Please allow location access."
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = {
        clerkUserId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        location,
        mobileNumber,
        speciality,
        kitchenName,
        logoURL,
        monthlyRate,
        role: "mother",
      };

      await axios.post("http://localhost:5000/api/profile-setup", userData);

      showAlert(
        "Profile setup successful",
        "Your tiffin provider profile has been created successfully."
      );

      navigate("/mother-dashboard");
    } catch (error) {
      console.error("Profile setup error:", error);
      showAlert(
        "Error",
        error.response?.data?.message || "Failed to setup profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading until role is fetched
  if (isFetchingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold mb-2">Mother's Tiffin</h1>
          <p className="text-muted-foreground">
            Where homemade meets happiness!
          </p>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold text-center mb-6">
            Tiffin Provider Profile Setup
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Your kitchen name"
                value={kitchenName}
                onChange={(e) => setKitchenName(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Your kitchen Logo URL"
                value={logoURL}
                onChange={(e) => setLogoURL(e.target.value)}
                required
              />
            </div>

            <div>
              <Input
                type="number"
                placeholder="Monthly Rate"
                value={monthlyRate}
                onChange={(e) => setMonthlyRate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Your Location (Latitude, Longitude)
              </label>
              <Input
                type="text"
                value={`[${location.coordinates[1]}, ${location.coordinates[0]}]`}
                readOnly
              />
              <Button onClick={handleGetLocation} className="mt-2 w-full">
                Get Current Location 📍
              </Button>
            </div>

            <div>
              <Input
                type="tel"
                placeholder="Your contact number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <Input
                type="text"
                placeholder="E.g. Gujarati Food, Punjabi Dishes"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save & Continue"}
            </Button>
          </form>

          <div className="text-center mt-4">
            <Button
              variant="link"
              onClick={() => navigate(-1)}
              className="text-muted-foreground"
            >
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MotherProfileSetup;
