import React from "react";
import { MapPin, Star } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useState, useEffect } from "react";

const ClientDashboard = () => {
  const { user } = useUser();
  const [client, setClient] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!user) return;
    let email = user.primaryEmailAddress.emailAddress;

    const fetchClientData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/get-user",
          {
            email,
          }
        );

        setClient(response.data);
      } catch (err) {
        setError("Failed to fetch user data.");
      }
    };

    fetchClientData();
  }, [user]);
  const subscribedMother = {
    name: "Mrs. Sarah Johnson",
    rating: 4.8,
    reviews: 120,
    specialty: "North Indian, Gujarati",
  };

  const nearbyMothers = [
    {
      name: "Mrs. Patel",
      rating: 4.5,
      reviews: 90,
      specialty: "Gujarati",
    },
    {
      name: "Mrs. Singh",
      rating: 4.7,
      reviews: 150,
      specialty: "Punjabi",
    },
    {
      name: "Mrs. Sharma",
      rating: 4.6,
      reviews: 80,
      specialty: "North Indian",
    },
    {
      name: "Mrs. Chaudhari",
      rating: 0,
      reviews: 0,
      specialty: "",
    },
    {
      name: "Mrs. Singhania",
      rating: 0,
      reviews: 0,
      specialty: "",
    },
    {
      name: "Mrs. Darve",
      rating: 0,
      reviews: 0,
      specialty: "",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white">
      {/* Your Location Section */}
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Your Location</h2>
        <div className="flex items-center text-gray-600">
          <MapPin className="mr-2 text-pink-500" />
          <span>123 Main Street, New York, NY 10001</span>
        </div>
      </div>

      {/* Subscribed Mother Section */}
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Your Subscribed Mother</h2>
        <div className="flex items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mr-4"></div>
          <div>
            <h3 className="text-lg font-medium">{subscribedMother.name}</h3>
            <div className="flex items-center text-yellow-500">
              <Star className="fill-current" />
              <span className="ml-1">
                {subscribedMother.rating} ({subscribedMother.reviews} reviews)
              </span>
            </div>
            <p className="text-gray-600">
              Specialty: {subscribedMother.specialty}
            </p>
            <button className="mt-2 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition">
              View Menu
            </button>
          </div>
        </div>
      </div>

      {/* Nearby Mothers Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Nearby Mothers</h2>
        <div className="grid grid-cols-3 gap-4">
          {nearbyMothers.map((mother, index) => (
            <div key={index} className="border rounded-lg p-3 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-2"></div>
              <h3 className="font-medium">{mother.name}</h3>
              {mother.rating > 0 ? (
                <div className="flex justify-center items-center text-yellow-500">
                  <Star className="fill-current" />
                  <span className="ml-1">
                    {mother.rating} ({mother.reviews} reviews)
                  </span>
                </div>
              ) : (
                <p className="text-gray-400">No reviews</p>
              )}
              {mother.specialty && (
                <p className="text-gray-600 text-sm">
                  Specialty: {mother.specialty}
                </p>
              )}
              <button className="mt-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
