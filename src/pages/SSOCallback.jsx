import { useClerk, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SSOCallback = () => {
  const { user } = useUser();
  const { handleRedirectCallback } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    async function handleCallback() {
      try {
        // Handle the redirect from the OAuth provider
        await handleRedirectCallback();
        // Redirect to home or wherever you want after successful authentication
        await user.update({
          unsafeMetadata: {
            role: "client", // Set user role dynamically
          },
        });

        navigate("/client-dashboard");
      } catch (err) {
        console.error("Error handling redirect callback:", err);
        // Redirect to sign-in page if there's an error
        navigate("/signin-client");
        console.log("Error in SSOCALLback...");
      }
    }

    handleCallback();
  }, [handleRedirectCallback, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Processing your login...</p>
      </div>
    </div>
  );
};

export default SSOCallback;
