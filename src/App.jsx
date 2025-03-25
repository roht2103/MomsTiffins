import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useUser, useAuth, SignIn, SignUp } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSetup from "./pages/ProfileSetup";
import MotherDashboard from "./pages/MotherDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Home from "./pages/Home";
import ClientSignIn from "./pages/ClientSignIn";

import NavBar from "./components/Navbar";
import React from "react";
import Role from "./pages/Role"
import SSOCallback from "./pages/SSOCallback";
import SignupClient from "./pages/SignupClient";
import MotherSignin from "./pages/MotherSignin";
import MotherSignup from "./pages/MotherSignup";
import SSOCallbackMother from "./pages/SSOForMother";

// const Layout = () => (
//   <div>
//     <NavBar />
//     <main>
//       <Outlet />{" "}
//       {/* This is the key change - using Outlet instead of {children} */}
//     </main>
//   </div>
// );

const App = () => {
  // const { isSignedIn } = useAuth();
  // const { user } = useUser();
  // const navigate = useNavigate();
  // const [role, setRole] = useState(null);

  // useEffect(() => {
  //   if (isSignedIn && user) {
  //     const userRole = user?.unsafeMetadata?.role;
  //     setRole(userRole);

  //     if (!userRole) {
  //       navigate("/profile-setup");
  //     } else if (userRole === "mother") {
  //       navigate("/mother-dashboard");
  //     } else {
  //       navigate("/client-dashboard");
  //     }
  //   }
  // }, [isSignedIn, user, navigate]);

  return (
    <Routes>
      

      <Route path="/" element={<Role />}>1 </Route>
      <Route path="/signin-client" element={<ClientSignIn />} />
      <Route path="/sso-callback" element={<SSOCallback />} />
      <Route path="/client-dashboard" element={<ClientDashboard />} />
      <Route path="/mother-dashbaord" element={<MotherDashboard />} />
      <Route path="/signup-client" element={<SignupClient />} />
      <Route path="/signin-mother" element={ <MotherSignin/>} />
      <Route path="/signup-mother" element={< MotherSignup/>} />
      <Route path="/sso-callback-for-mothers" element={< SSOCallbackMother/>} />
    </Routes>
  );
};

export default App;
