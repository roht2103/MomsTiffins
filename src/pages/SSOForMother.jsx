import { useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SSOCallbackMother = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    const updateMetadata = async () => {
      if (!isSignedIn || !user) return;

      try {

        await handleRedirectCallback();

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
