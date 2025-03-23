import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const ProfileSetup = () => {
  const { user } = useUser();
  const [role, setRole] = useState("");
  const [details, setDetails] = useState({});
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role.");
      return;
    }

    try {
      await user.update({
        unsafeMetadata: {
          role,
          ...details,
        },
      });

      // Redirect based on role
      if (role === "mother") {
        navigate("/mother-dashboard");
      } else {
        navigate("/client-dashboard");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Mother's Tiffin
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Where homemade meets happiness!
          </p>
        </div>

        {!role ? (
          <div className="space-y-4">
            <Card
              className="border-2 border-red-200 hover:border-red-400 transition-all cursor-pointer"
              onClick={() => handleRoleSelect("client")}
            >
              <CardContent className="flex items-center p-6">
                <span className="text-3xl mr-4">🍱</span>
                <span className="text-xl font-medium">
                  I want to eat delicious homemade food
                </span>
              </CardContent>
            </Card>

            <Card
              className="border-2 border-teal-200 hover:border-teal-400 transition-all cursor-pointer"
              onClick={() => handleRoleSelect("mother")}
            >
              <CardContent className="flex items-center p-6">
                <span className="text-3xl mr-4">👩‍🍳</span>
                <span className="text-xl font-medium">
                  I want to serve my delicious food
                </span>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                {role === "mother"
                  ? "Chef Profile Setup"
                  : "Food Lover Profile Setup"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {role === "mother" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="menu">Weekly Menu Highlights</Label>
                      <Input
                        required
                        id="menu"
                        placeholder="E.g. North Indian, South Indian, Chinese"
                        onChange={(e) =>
                          setDetails({ ...details, menu: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Your Location</Label>
                      <Input
                        required
                        id="location"
                        placeholder="Your full address"
                        onChange={(e) =>
                          setDetails({ ...details, location: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="area">Service Area</Label>
                      <Input
                        required
                        id="area"
                        placeholder="E.g. Within 5km radius of Indiranagar"
                        onChange={(e) =>
                          setDetails({ ...details, area: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="charges">Monthly Subscription (₹)</Label>
                      <Input
                        required
                        id="charges"
                        type="number"
                        placeholder="E.g. 3000"
                        onChange={(e) =>
                          setDetails({ ...details, charges: e.target.value })
                        }
                      />
                    </div>
                  </>
                )}

                {role === "client" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="location">Your Location</Label>
                      <Input
                        required
                        id="location"
                        placeholder="Your delivery address"
                        onChange={(e) =>
                          setDetails({ ...details, location: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input
                        required
                        id="mobile"
                        type="tel"
                        placeholder="Your contact number"
                        onChange={(e) =>
                          setDetails({ ...details, mobile: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferences">
                        Food Preferences (Optional)
                      </Label>
                      <Input
                        required
                        id="preferences"
                        placeholder="E.g. Vegetarian, No spicy food"
                        onChange={(e) =>
                          setDetails({
                            ...details,
                            preferences: e.target.value,
                          })
                        }
                      />
                    </div>
                  </>
                )}

                <div className="pt-4 space-y-2">
                  <Button type="submit" className="w-full">
                    Save & Continue
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => setRole("")}
                  >
                    Go Back
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProfileSetup;
