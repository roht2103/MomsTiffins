import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import React from "react";
import { Button } from "./ui/button";
const Navbar = () => {
  return (
    <nav className="p-4 shadow-md bg-white flex justify-between items-center border-2 border-red-400">
      <Link to="/" className="text-2xl font-bold text-gray-700">
        Tiffin Service
      </Link>

      <div>
        <SignedOut>
          <span className="flex space-x-4">
            <Button>
              <SignUpButton />
            </Button>
            <Button>
              <SignInButton />
            </Button>
          </span>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
