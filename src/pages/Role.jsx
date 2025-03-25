import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MothersWelcomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg px-4">
        {/* Welcome Card */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md text-center">
          <h1 className="text-gray-800 text-3xl md:text-4xl font-bold mb-4">
            Welcome to Mother's Tiffin
          </h1>
          <p className="text-gray-500 text-lg md:text-xl mb-8">
            Where homemade meets happiness!
          </p>

          <div className="flex flex-col gap-4 mb-8">
            <button
              className="bg-white border-2 border-red-400 hover:bg-red-400 hover:text-white hover:-translate-y-1 transform transition-all duration-300 rounded-lg p-4 md:p-6 cursor-pointer flex items-center gap-4"
              onClick={() => navigate("/signin-client")}
            >
              <span className="text-3xl md:text-4xl">🍱</span>
              <span className="text-lg font-medium">
                I want to eat delicious homemade food
              </span>
            </button>

            <button
              className="bg-white border-2 border-teal-400 hover:bg-teal-400 hover:text-white hover:-translate-y-1 transform transition-all duration-300 rounded-lg p-4 md:p-6 cursor-pointer flex items-center gap-4"
              onClick={() => navigate("/signin-mother")}
            >
              <span className="text-3xl md:text-4xl">👩‍🍳</span>
              <span className="text-lg font-medium">
                I want to serve my delicious food
              </span>
            </button>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100">
            <p className="text-gray-700">Already have an account?</p>
            <button
              className="text-red-400 font-semibold mt-2 hover:underline cursor-pointer"
              onClick={openModal}
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md mx-4 p-6 md:p-8 rounded-xl relative">
            <span
              className="absolute right-4 top-2 text-3xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>

            <h2 className="text-2xl font-bold mb-6 text-center">
              Choose Login Type
            </h2>

            <div className="flex flex-col gap-4 mt-6">
              <button
                className="bg-white border-2 border-red-400 hover:bg-red-400 hover:text-white transition-all duration-300 rounded-lg p-4 flex items-center gap-4"
                onClick={() => (window.location.href = "/signin-client")}
              >
                <span className="text-2xl">🍽️</span>
                <span className="font-medium">Login as Customer</span>
              </button>

              <button
                className="bg-white border-2 border-red-400 hover:bg-red-400 hover:text-white transition-all duration-300 rounded-lg p-4 flex items-center gap-4"
                onClick={() => (window.location.href = "/signin-mother")}
              >
                <span className="text-2xl">👩‍🍳</span>
                <span className="font-medium">Login as Mother</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MothersWelcomePage;
