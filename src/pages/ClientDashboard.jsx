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
  FaUserAlt
} from "react-icons/fa";

const ClientDashboard = () => {
  const { user } = useUser();
  const [client, setClient] = useState(null);
  const [error, setError] = useState("");

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
            const { latitude, longitude } = position.coords;
            console.log("User Location:", { latitude, longitude });
  
            // Update location in DB
            await axios.post("http://localhost:5000/api/user/update-location", {
              email: email,
              location: {
                type: "Point",
                coordinates: [longitude, latitude],
              },
            });
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

  // Kitchen data
  const subscribedKitchen = {
    id: 1,
    name: "Spice Delight",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    specialty: "North Indian, Gujarati",
    deliveryTime: "30-40 min",
    subscribed: true
  };

  const nearbyKitchens = [
    {
      id: 2,
      name: "Gujarati Rasoi",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      specialty: "Authentic Gujarati Thali",
      deliveryTime: "25-35 min",
      subscribed: false
    },
    {
      id: 3,
      name: "Punjabi Dhaba",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      specialty: "Punjabi Comfort Food",
      deliveryTime: "20-30 min",
      subscribed: false
    },
    {
      id: 4,
      name: "South Spice",
      image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      specialty: "South Indian Specialties",
      deliveryTime: "35-45 min",
      subscribed: false
    },
    {
      id: 5,
      name: "Bengali Bhoj",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      specialty: "Traditional Bengali Cuisine",
      deliveryTime: "40-50 min",
      subscribed: false
    }
  ];

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

  return (
    <div className="bg-gray-50 min-h-screen">
      

      <main className="max-w-7xl mx-auto py-8 px-6">
        {/* Location Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
            <FaMapMarkerAlt className="text-pink-500" />
            Your Location
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-6 max-w-md transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 text-xl">
              <FaHome />
            </div>
            <div>
              <p className="font-medium">123 Main Street</p>
              <p className="text-gray-500 text-sm">New York, NY 10001</p>
            </div>
          </div>
        </section>

        {/* Subscribed Kitchen Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
            <FaHeart className="text-pink-500" />
            Your Subscribed Kitchen
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {subscribedKitchen && (
              <div className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 relative ${subscribedKitchen.subscribed ? 'border-2 border-yellow-400' : ''}`}>
                {subscribedKitchen.subscribed && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">
                    Subscribed
                  </div>
                )}
                <img 
                  src={subscribedKitchen.image} 
                  alt={subscribedKitchen.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{subscribedKitchen.name}</h3>
                      <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                        <FaPepperHot className="text-pink-500" />
                        {subscribedKitchen.specialty}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-100 text-gray-800 px-2 py-1 rounded-full text-sm font-medium">
                      <FaStar className="text-yellow-400 text-xs" />
                      <span>{subscribedKitchen.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <FaClock />
                      {subscribedKitchen.deliveryTime}
                    </span>
                    <button className="px-4 py-2 border border-pink-500 text-pink-500 rounded-lg font-medium text-sm hover:bg-pink-50 transition-all flex items-center gap-1">
                      View Menu
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Nearby Kitchens Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
            <FaStoreAlt className="text-pink-500" />
            Nearby Kitchens
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyKitchens.map(kitchen => (
              <div key={kitchen.id} className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <img 
                  src={kitchen.image} 
                  alt={kitchen.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{kitchen.name}</h3>
                      <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                        <FaPepperHot className="text-pink-500" />
                        {kitchen.specialty}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-100 text-gray-800 px-2 py-1 rounded-full text-sm font-medium">
                      <FaStar className="text-yellow-400 text-xs" />
                      <span>{kitchen.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <FaClock />
                      {kitchen.deliveryTime}
                    </span>
                    <button className="px-3 py-1.5 bg-pink-500 text-white rounded-lg font-medium text-sm hover:bg-pink-600 transition-all">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
            <FaStar className="text-pink-500" />
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={review.avatar} 
                    alt={review.user} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{review.user}</p>
                    <p className="text-gray-500 text-xs">{review.date}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < Math.floor(review.rating) ? "fill-current" : i < review.rating ? "fill-current opacity-50" : "opacity-30"} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{review.text}"</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClientDashboard;