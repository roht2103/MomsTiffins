import React, { useState } from "react";
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

const ProfileSetup = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [foodPreferences, setFoodPreferences] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare user data
      const userData = {
        clerkUserId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        location,
        mobileNumber,
        foodPreferences,
        role: user.publicMetadata?.role || "client",
      };

      // Send data to backend
      const response = await axios.post(
        "http://localhost:5000/api/profile-setup",
        userData
      );

      showAlert(
        "Profile setup successful",
        "Your profile has been created successfully."
      );

      // Navigate to appropriate dashboard
      navigate(
        userData.role === "client" ? "/client-dashboard" : "/mother-dashboard"
      );
    } catch (error) {
      // Handle errors
      console.error("Profile setup error:", error);

      showAlert(
        "Error",
        error.response?.data?.message || "Failed to setup profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold mb-2">Mother's Tiffin</h1>
          <p className="text-muted-foreground">
            Where homemade meets happiness!
          </p>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold text-center mb-6">
            Food Lover Profile Setup
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Location
              </label>
              <Input
                type="text"
                placeholder="Your delivery address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Mobile Number
              </label>
              <Input
                type="tel"
                placeholder="Your contact number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Food Preferences (Optional)
              </label>
              <Input
                type="text"
                placeholder="E.g. Vegetarian, No spicy food"
                value={foodPreferences}
                onChange={(e) => setFoodPreferences(e.target.value)}
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

export default ProfileSetup;
