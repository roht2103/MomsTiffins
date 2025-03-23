import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-6">Welcome to Tiffin Service</h1>

      {/* <SignedOut>
        <SignUpButton mode="modal">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Sign Up
          </button>
        </SignUpButton>

        <SignInButton mode="modal">
          <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn> */}
    </div>
  );
};

export default Home;
