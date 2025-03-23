import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider
    publishableKey={clerkPubKey}
    afterSignInUrl="/profile-setup"
    afterSignUpUrl="/profile-setup"
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
);
