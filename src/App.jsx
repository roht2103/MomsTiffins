import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useUser, useAuth, SignIn, SignUp } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSetup from "./pages/ProfileSetup";
import MotherDashboard from "./pages/MotherDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Home from "./pages/Home";
import NavBar from "./components/Navbar";
import React from "react";

const Layout = () => (
  <div>
    <NavBar />
    <main>
      <Outlet />{" "}
      {/* This is the key change - using Outlet instead of {children} */}
    </main>
  </div>
);

const App = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (isSignedIn && user) {
      const userRole = user?.unsafeMetadata?.role;
      setRole(userRole);

      if (!userRole) {
        navigate("/profile-setup");
      } else if (userRole === "mother") {
        navigate("/mother-dashboard");
      } else {
        navigate("/client-dashboard");
      }
    }
  }, [isSignedIn, user, navigate]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={isSignedIn ? <Navigate to="/profile-setup" /> : <Home />}
        />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/mother-dashboard" element={<MotherDashboard />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
      </Route>

      {/* Auth routes outside of Layout */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* Redirect based on role */}
      <Route
        path="*"
        element={
          role === "mother" ? (
            <Navigate to="/mother-dashboard" />
          ) : role === "client" ? (
            <Navigate to="/client-dashboard" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

export default App;
