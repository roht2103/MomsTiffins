import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import React from "react";
import { Button } from "./ui/button";
import { Home, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="p-4 shadow-md bg-white sticky top-0 z-50 w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl">🍱</span>
          <span className="text-2xl font-bold text-gray-800">
            Mother's Tiffin
          </span>
        </Link>

        {/* Signed Out - Move Links to the Right */}
        <SignedOut>
          <div className="flex ml-auto space-x-6 items-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-red-500 transition-colors font-medium flex items-center gap-1"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-red-500 transition-colors font-medium"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-red-500 transition-colors font-medium"
            >
              Contact
            </Link>
          </div>
        </SignedOut>

        {/* Signed In - Center the Links & Keep User Avatar at Right */}
        <SignedIn>
          <div className="flex-1 flex justify-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-red-500 transition-colors font-medium flex items-center gap-1"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-red-500 transition-colors font-medium"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-red-500 transition-colors font-medium"
            >
              Contact
            </Link>
          </div>

          {/* User Avatar on Right */}
          <div className="ml-auto flex items-center space-x-4">
            <p>{user?.fullName || "User"}</p>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9",
                },
              }}
            />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
