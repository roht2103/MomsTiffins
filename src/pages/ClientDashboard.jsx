import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaHeart,
  FaStoreAlt,
  FaStar,
  FaClock,
  FaPepperHot,
  FaHome,
  FaUserAlt,
  FaUtensils
} from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [client, setClient] = useState(null);
  const [error, setError] = useState("");
  const [currentLocation, setCurrentLocation] = useState("fetching...");
  const [nearbyMothers, setNearbyMothers] = useState([]);
  const [loadingMothers, setLoadingMothers] = useState(false);

  useEffect(() => {
    if (!user) return;
    let email = user.primaryEmailAddress.emailAddress;

    const setClientInDB = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/createuser/createclient", {
          clerkUserId: user.id,
          email: email,
          profileComplete: false,
        });

        await setClient(response.data);

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            let { latitude, longitude } = position.coords;
            console.log("lat = ", latitude, "lon = " , longitude) ;
            latitude = 18.655604 ;
            longitude = 73.766148;
            updateLocationDetails(latitude, longitude);
            await axios.post("http://localhost:5000/api/user/update-location", {
              email: email,
              location: {
                type: "Point",
                coordinates: [longitude, latitude],
              },
            });
            fetchNearbyMothers(latitude, longitude);
          },
          (error) => {
            console.error("Error fetching location:", error);
            alert("Location is mandatory...");
          }
        );
      } catch (err) {
        setError("Failed to fetch user data.");
      }
    };

    setClientInDB();
  }, [user]);

  const fetchNearbyMothers = async (latitude, longitude) => {
    try {
      setLoadingMothers(true);
      const response = await axios.get(
        `http://localhost:5000/api/fetch-nearby-mothers?latitude=${latitude}&longitude=${longitude}`
      );
      if (response.data.success) {
        setNearbyMothers(response.data.data);
      } else {
        setError("Failed to fetch nearby mothers");
      }
    } catch (err) {
      setError("Error fetching nearby mothers");
      console.error("Error fetching nearby mothers:", err);
    } finally {
      setLoadingMothers(false);
    }
  };

  function updateLocationDetails(lat, lon) {
    const apiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=98ce63fee65544d5a668dbc0a362176c`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.features && data.features.length > 0) {
          const address = data.features[0].properties.formatted;
          setCurrentLocation(`${address}`);
        } else {
          setCurrentLocation(`Address not found (${lat}, ${lon})`);
        }
      })
      .catch(error => {
        console.error("Error fetching address:", error);
        setCurrentLocation(`Error fetching address (${lat}, ${lon})`);
      });
  }

  const subscribedKitchen = {
    id: 1,
    name: "Spice Delight",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    specialty: "North Indian, Gujarati",
    deliveryTime: "30-40 min",
    subscribed: true
  };

  const reviews = [
    {
      id: 1,
      user: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/women/43.jpg",
      date: "2 days ago",
      rating: 5,
      text: "The food from Spice Delight is amazing! The flavors are authentic and it truly feels like home-cooked meals. Their dal tadka is to die for!"
    },
    {
      id: 2,
      user: "Priya Mehta",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      date: "1 week ago",
      rating: 4.5,
      text: "Punjabi Dhaba serves the best butter chicken in town! The naan is perfectly fluffy and the portions are generous. Highly recommended!"
    },
    {
      id: 3,
      user: "Rahul Sharma",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "3 weeks ago",
      rating: 5,
      text: "Gujarati Rasoi's thali is incredible value for money. The variety and taste remind me of my grandmother's cooking. The service is prompt too!"
    }
  ];

  // Icons for different sections
  const sectionIcons = {
    location: <FaMapMarkerAlt className="text-red-500" />,
    subscribed: <FaHeart className="text-red-500" />,
    nearby: <FaStoreAlt className="text-red-500" />,
    reviews: <FaStar className="text-red-500" />
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Welcome Section */}
        <section className="mb-12 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user?.firstName || 'Food Lover'}!</h1>
          <p className="text-xl text-red-100">Discover delicious home-cooked meals near you</p>
        </section>

        {/* Location Section */}
        <div className="flex">
          <section className="mb-12 w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                {sectionIcons.location}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Your Location</h2>
            </div>

            {/* Two-column layout */}
            <div className="flex flex-wrap gap-6">
              {/* Location Card */}
              <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-center gap-4 w-full sm:w-[48%] transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-600 text-xl">
                  <FaHome />
                </div>
                <p className="font-medium text-gray-800">{"Army Institute of Technology (AIT)  Alandi Rd, Dighi, Pune, Pimpri-Chinchwad, Maharashtra 411015"}</p>
              </div>

              {/* Incomplete Profile Card */}
              {client && !client.user.profileComplete && (
                <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex justify-between items-center w-full sm:w-[48%] transition-all hover:shadow-lg hover:-translate-y-1">
                  <p className="font-medium text-gray-800">Incomplete Profile</p>
                  <button
                    onClick={() => navigate("/profile-setup-client")}
                    className="px-5 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <FaUserAlt />
                    Complete Profile
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>



        {/* Subscribed Kitchen Section */}
        {/* Compact Subscribed Kitchen Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              <FaHeart className="text-sm" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Your Subscribed Kitchen</h2>
          </div>

          {subscribedKitchen && (
            <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg border border-gray-100 ${subscribedKitchen.subscribed ? 'border-l-4 border-red-600' : ''}`}>
              {/* Compact layout */}
              <div className="flex flex-col sm:flex-row">
                {/* Image - Reduced height */}
                <div className="sm:w-2/5 relative">
                  <img
                    src={subscribedKitchen.image}
                    alt={subscribedKitchen.name}
                    className="w-full h-68 object-cover"
                  />
                  {subscribedKitchen.subscribed && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                      <FaHeart className="text-xs" />
                      <span>Subscribed</span>
                    </div>
                  )}
                </div>

                {/* Content - Compact layout */}
                <div className="sm:w-3/5 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{subscribedKitchen.name}</h3>
                    <div className="flex items-center gap-1 bg-yellow-50 text-gray-800 px-2 py-0.5 rounded-full text-xs font-medium">
                      <FaStar className="text-yellow-400" size={12} />
                      <span>{subscribedKitchen.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                    <FaPepperHot className="text-red-500" size={12} />
                    <span className="line-clamp-1">{subscribedKitchen.specialty}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <FaClock className="text-red-400" size={12} />
                    <span>{subscribedKitchen.deliveryTime}</span>
                  </div>

                  <button
                    onClick={() => navigate("/menu", { state: { kitchen: subscribedKitchen } })}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <FaUtensils size={12} />
                    <span>View Menu</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
        {/* Nearby Mothers Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              {sectionIcons.nearby}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Nearby Mothers</h2>
          </div>
          {loadingMothers ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full mb-4"></div>
                <p className="text-gray-600">Loading nearby kitchens...</p>
              </div>
            </div>
          ) : nearbyMothers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyMothers.map(mother => (
                <div
                  key={mother._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-gray-100"
                  onClick={() => navigate("/menu", { state: { kitchen: mother } })}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={mother.logoURL}
                      alt={mother.kitchenName}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="font-bold text-white">{mother.kitchenName}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-gray-600 text-sm flex items-center gap-2">
                          <GiMeal className="text-red-500" />
                          {mother.speciality}
                        </p>
                        <p className="text-gray-500 text-xs mt-2">
                          {Math.round(mother.distance)}m away • {mother.activeCustomers} customers
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 text-gray-800 px-2 py-1 rounded-full text-sm font-medium border border-yellow-100">
                        <FaStar className="text-yellow-400 text-xs" />
                        <span>{mother.rating}</span>
                      </div>
                    </div>
                    <button
                      className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle subscribe logic here
                      }}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                <FaStoreAlt size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No nearby kitchens found</h3>
              <p className="text-gray-500">We couldn't find any kitchens in your area. Try again later.</p>
            </div>
          )}
        </section>

        {/* Reviews Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              {sectionIcons.reviews}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.user}
                    className="w-12 h-12 rounded-full object-cover border-2 border-red-100"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{review.user}</p>
                    <p className="text-gray-500 text-xs">{review.date}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.floor(review.rating) ? "fill-current" : i < review.rating ? "fill-current opacity-50" : "opacity-30"}
                    />
                  ))}
                </div>
                <p className="text-gray-700">"{review.text}"</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClientDashboard;