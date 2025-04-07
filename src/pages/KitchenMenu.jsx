import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { 
  FaStar, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaShoppingCart,
  FaHeart,
  FaUtensils,
  FaSun,
  FaMoon,
  FaClock
} from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { useCart } from "../context/CartContext";
import { useUser } from "@clerk/clerk-react";


const MenuPage = () => {
  const location = useLocation();
  const kitchen = location.state?.kitchen;
  const { cart, addToCart } = useCart();
  const [subscribe, setSubscribe] = useState("Subscribe to Kitchen")
  
  const { user } = useUser() ;
  
  if (!kitchen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Kitchen Not Found</h2>
          <p className="text-gray-600">The kitchen you're looking for doesn't exist or may have been removed.</p>
        </div>
      </div>
    );
  }

  // Icons for different meal types
  const mealIcons = {
    breakfast: <FaSun className="text-yellow-400" />,
    lunch: <GiMeal className="text-red-400" />,
    dinner: <FaMoon className="text-indigo-400" />
  };

  const handleAddToCart = (item) => {
    if (cart.kitchenId && cart.kitchenId !== kitchen._id) {
      if (window.confirm(
        `Your cart contains items from ${cart.kitchenName}. 
        Adding this item will clear your current cart. Continue?`
      )) {
        addToCart(item, kitchen);
      }
    } else {
      addToCart(item, kitchen);
    }
  };

  const updateSubscription =async (e)=>{

    const response = await axios.put("http://localhost:5000/api/menu/updatesubscription", {
      kitchenName : kitchen.kitchenName ,
      kitchenEmail :  kitchen.email ,
      clientEmail : user.primaryEmailAddress.emailAddress 
    })
    console.log(response)
    if(response.data.success){
      setSubscribe("Subscribed");

    }

  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Modern Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={kitchen.logoURL}
          alt={kitchen.kitchenName}
          className="w-full h-full object-cover object-center filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <FaStar className="text-yellow-300" />
                {kitchen.rating}
              </span>
              <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                {Math.round(kitchen.distance)}m away
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
              {kitchen.kitchenName}
            </h1>
            <p className="text-xl text-gray-200 mb-4 flex items-center gap-2">
              <FaUtensils className="text-red-300" />
              {kitchen.speciality}
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
              onClick={(e)=> updateSubscription(e)}
            >
              <FaHeart />
              {subscribe}
            </button>
          </div>
        </div>
      </div>

      {/* Kitchen Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-red-600">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">About {kitchen.firstName}'s Kitchen</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                    <FaStar />
                  </div>
                  <span>{kitchen.rating} rating ({kitchen.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                    <FaMapMarkerAlt />
                  </div>
                  <span>{Math.round(kitchen.distance)}m from your location</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                    <FaPhone />
                  </div>
                  <span>{kitchen.mobileNumber}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors shadow-md">
                <FaShoppingCart />
                View Subscription Plans
              </button>
              <button className="border border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                <FaClock />
                Check Delivery Time
              </button>
            </div>
          </div>
        </div>

        {/* Today's Special Section */}
        {kitchen.todaysMenu && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <FaStar size={14} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Today's Special</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(kitchen.todaysMenu).map(([mealType, items]) => (
                <div key={mealType} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:border-red-100 transition-all">
                  <div className="p-5 bg-gradient-to-r from-red-50 to-white">
                    <h3 className="font-semibold text-lg text-red-700 capitalize flex items-center gap-2">
                      {mealIcons[mealType] || <FaUtensils />}
                      {mealType} Specials
                    </h3>
                  </div>
                  <div className="p-5">
                    {items.map((item, index) => (
                      <div key={index} className="mb-6 last:mb-0 group">
                        <div className="flex gap-4">
                          {item.imageURL && (
                            <div className="flex-shrink-0">
                              <img
                                src={item.imageURL}
                                alt={item.name}
                                className="w-20 h-20 rounded-lg object-cover shadow-sm group-hover:shadow-md transition-shadow"
                              />
                            </div>
                          )}
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors">{item.name}</h4>
                                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                              </div>
                              <span className="font-bold text-red-600">₹{item.price}</span>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-1 text-yellow-400">
                                <FaStar size={14} />
                                <span className="text-gray-700 text-sm">{item.rating}</span>
                              </div>
                              <button 
                                onClick={() => handleAddToCart(item)}
                                className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full transition-colors shadow-sm flex items-center gap-1"
                              >
                                <FaShoppingCart size={12} />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Menu Sections */}
        <div className="space-y-12">
          {['breakfast', 'lunch', 'dinner'].map((mealType) => (
            kitchen.menu[mealType] && kitchen.menu[mealType].length > 0 && (
              <div key={mealType} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-red-50 to-white border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800 capitalize flex items-center gap-3">
                    {mealIcons[mealType] || <FaUtensils />}
                    {mealType} Menu
                  </h2>
                </div>
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {kitchen.menu[mealType].map((item, index) => (
                    <div 
                      key={index} 
                      className="border rounded-lg p-4 hover:shadow-lg transition-all hover:border-red-100 group"
                    >
                      <div className="relative mb-3 overflow-hidden rounded-lg">
                        {item.imageURL ? (
                          <img
                            src={item.imageURL}
                            alt={item.name}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-40 bg-red-50 flex items-center justify-center text-red-200">
                            <FaUtensils size={32} />
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-white/90 text-red-600 px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                          ₹{item.price}
                        </div>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors">{item.name}</h3>
                          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1 text-yellow-400">
                          <FaStar size={14} />
                          <span className="text-gray-700 text-sm">{item.rating}</span>
                        </div>
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full transition-colors shadow-sm flex items-center gap-1"
                        >
                          <FaShoppingCart size={12} />
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;