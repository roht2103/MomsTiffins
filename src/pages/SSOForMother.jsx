import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SSOCallbackMother = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const updateMetadata = async () => {
      if (!isSignedIn || !user) return;

      try {
        // Set metadata for the new user
        await user.update({
          unsafeMetadata: {
            role: "mother", // Set user role dynamically
          },
        });

        // Redirect to dashboard after updating metadata
        navigate("/mother-dashboard");
      } catch (error) {
        console.error("Error updating metadata:", error);
      }
    };

    updateMetadata();
  }, [isSignedIn, user, navigate]);

  return <p>Processing your login...</p>; // Show a loading message
};

export default SSOCallbackMother;
