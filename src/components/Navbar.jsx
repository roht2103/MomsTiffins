import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
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
  return (
    <nav className="p-4 shadow-md bg-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl">🍱</span>
          <span className="text-2xl font-bold text-gray-800">
            Mother's Tiffin
          </span>
        </Link>

        {/* Navigation Links - Only shown when signed in */}
        <SignedIn>
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="text-gray-600 hover:text-red-500 transition-colors font-medium flex items-center gap-1"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-red-500 transition-colors font-medium"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-red-500 transition-colors font-medium"
            >
              Contact
            </Link>
          </div>
        </SignedIn>

        {/* Auth Buttons and User Menu */}
        <div className="flex items-center space-x-4">
          <SignedOut>
            <div className="flex space-x-3">
              <Button variant="outline" className="font-medium">
                <SignInButton mode="modal" />
              </Button>
              <Button className="bg-red-500 hover:bg-red-600 text-white font-medium">
                <SignUpButton mode="modal" />
              </Button>
            </div>
          </SignedOut>

          <SignedIn>
            {/* Mobile Menu */}
            <div className="md:hidden mr-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/">Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/about">About Us</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/contact">Contact</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* User Button with custom appearance */}
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
