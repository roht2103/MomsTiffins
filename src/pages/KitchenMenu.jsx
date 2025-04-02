import React from "react";
import { 
  FaUtensils, 
  FaArrowLeft, 
  FaStar, 
  FaBreadSlice, 
  FaGlassCheers,
  FaPlus,
  FaShoppingBasket,
  FaCircle,
  FaLeaf,
  FaHeart,
  FaClock
} from "react-icons/fa";

const KitchenMenu = () => {
  // Kitchen information
  const kitchenInfo = {
    name: "Marathi Zaika",
    cuisine: "Authentic Maharashtrian Cuisine",
    rating: 4.8,
    reviewCount: 247,
    heroImage: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  };

  // Festival special banner
  const festivalSpecial = {
    title: "Gudi Padwa Special",
    subtitle: "Celebrate the Maharashtrian New Year with traditional flavors",
    description: "Our special Gudi Padwa menu features traditional sweets and savories prepared with authentic recipes passed down through generations. The star of our festival menu is the delicious Puran Poli - a sweet flatbread stuffed with a mixture of chana dal, jaggery, and cardamom.",
    image: "https://cdn.prod.website-files.com/64931d2aee18510b47f4bb1f/66c8b8f253827b985e6d1a48_Puran-Poli-Ganesh-Chaturthi-Recipe-Cover-Image.jpg"
  };

  // Menu categories with items
  const menuCategories = [
    {
      id: 1,
      name: "Gudi Padwa Special Menu",
      icon: <FaBreadSlice />,
      items: [
        {
          id: 101,
          name: "Puran Poli",
          price: "₹80",
          description: "Sweet flatbread stuffed with chana dal, jaggery and cardamom - the quintessential Gudi Padwa delicacy",
          rating: 4.9,
          image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmadhurasrecipe.com%2Fholi-special-traditional-puranpoli%2F&psig=AOvVaw39HCcPh9eHNlI9Mn_lkH_b&ust=1743651705007000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMCzn_e2uIwDFQAAAAAdAAAAABAh",
          isVeg: true,
          isPopular: true,
          prepTime: "20 min"
        },
        {
          id: 102,
          name: "Shrikhand",
          price: "₹90",
          description: "Creamy strained yogurt flavored with saffron, cardamom and nuts - a festive favorite",
          rating: 4.7,
          image: "https://samosastreet.com/wp-content/uploads/Kesar-Shrikhand-2.jpg",
          isVeg: true,
          isPopular: false,
          prepTime: "15 min"
        },
        {
          id: 103,
          name: "Matki Usal",
          price: "₹110",
          description: "Sprouted moth beans curry with traditional Maharashtrian spices, served with pav",
          rating: 4.6,
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzA_sNEnODojmMKrFAA_LG3g2oD3m80dzbPA&s",
          isVeg: true,
          isPopular: false,
          prepTime: "25 min"
        }
      ]
    },
    {
      id: 2,
      name: "Maharashtrian Main Course",
      icon: <FaUtensils />,
      items: [
        {
          id: 201,
          name: "Pithla Bhakri",
          price: "₹120",
          description: "Chickpea flour curry served with traditional jowar (sorghum) flatbread",
          rating: 4.8,
          image: "https://nanchi.blog/wp-content/uploads/2020/03/pithla-bhakri-thali-sinhagad-fort-pune.jpg?w=1024",
          isVeg: true,
          isPopular: true,
          prepTime: "20 min"
        },
        {
          id: 202,
          name: "Misal Pav",
          price: "₹130",
          description: "Spicy sprouted beans curry topped with farsan, onions and served with pav",
          rating: 4.9,
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQTJ_MJKzQW_0JD367Q36UEtSo-YdmcVZ_gg&s",
          isVeg: true,
          isPopular: true,
          prepTime: "30 min"
        },
        {
          id: 203,
          name: "Bharli Vangi",
          price: "₹150",
          description: "Baby eggplants stuffed with coconut-peanut masala in a spicy gravy",
          rating: 4.7,
          image: "https://i0.wp.com/kalimirchbysmita.com/wp-content/uploads/2018/12/Bharli-Vangi-01.jpg?resize=1537%2C1024",
          isVeg: true,
          isPopular: false,
          prepTime: "35 min"
        },
        {
          id: 204,
          name: "Kombdi Vade",
          price: "₹180",
          description: "Malvani style chicken curry served with deep-fried bread (vade)",
          rating: 4.8,
          image: "https://www.whiskaffair.com/wp-content/uploads/2020/04/Kombdi-Vade-2-3.jpg",
          isVeg: false,
          isPopular: true,
          prepTime: "40 min"
        }
      ]
    },
    {
      id: 3,
      name: "Beverages & Desserts",
      icon: <FaGlassCheers />,
      items: [
        {
          id: 301,
          name: "Sol Kadhi",
          price: "₹60",
          description: "Refreshing kokum and coconut milk drink - perfect digestive after spicy meals",
          rating: 4.5,
          image: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/shaheen_ali/Solkadhi_Recipe_Kokum_And_Coconut_Milk_Drink.jpg",
          isVeg: true,
          isPopular: false,
          prepTime: "10 min"
        },
        {
          id: 302,
          name: "Ukadiche Modak",
          price: "₹100 (3 pcs)",
          description: "Steamed rice flour dumplings stuffed with coconut and jaggery - Ganesh Chaturthi special",
          rating: 4.9,
          image: "https://www.awesomecuisine.com/wp-content/uploads/2018/05/Modak.jpg",
          isVeg: true,
          isPopular: true,
          prepTime: "45 min"
        }
      ]
    }
  ];

  return (
    <div className="bg-orange-50 min-h-screen font-sans">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        {/* Back Button */}
        <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-3 rounded-lg font-medium flex items-center gap-2 hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md mb-6">
          <FaArrowLeft />
          <span>Back to Kitchens</span>
        </button>
        
        {/* Kitchen Hero Section */}
        <section className="relative h-72 md:h-80 rounded-3xl overflow-hidden mb-8 flex items-center justify-center shadow-lg">
      <div 
        className="absolute inset-0  bg-opacity-50 bg-cover bg-center"
        style={{ backgroundImage: `url(${kitchenInfo.heroImage})` ,  backdropfilter: `blur(10px) `, backgroundBlendMode :`multiply`}}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold  mb-2 drop-shadow-xl">{kitchenInfo.name}</h1>
        <p className="text-lg md:text-xl opacity-90 mb-4 font-light">{kitchenInfo.cuisine}</p>
        <div className="inline-flex items-center gap-2  bg-opacity-30 backdrop-blur-md px-6 py-2 rounded-full shadow-lg text-white">
          <FaStar className="text-yellow-400 text-lg" />
          <span className="text-lg font-semibold">{kitchenInfo.rating}</span>
          <span className="text-sm opacity-80">({kitchenInfo.reviewCount} reviews)</span>
        </div>
      </div>
    </section>

        {/* Festival Special Banner */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-8 shadow-lg border border-orange-200">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <img 
                src={festivalSpecial.image} 
                alt={festivalSpecial.title}
                className="w-full md:w-56 h-56 object-cover rounded-2xl border-2 border-orange-400 shadow-md transform rotate-2 hover:rotate-0 transition-all duration-300"
              />
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium mb-3">
                  <span>🎉</span>
                  <span>Limited Time Offer</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-red-700 mb-2">{festivalSpecial.title}</h3>
                <p className="text-orange-800 text-lg mb-4 font-medium">{festivalSpecial.subtitle}</p>
                <p className="text-gray-700 mb-6 leading-relaxed">{festivalSpecial.description}</p>
                <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-3 hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md">
                  <FaShoppingBasket />
                  <span>Order Festival Specials</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Categories */}
        <div className="space-y-16">
          {menuCategories.map(category => (
            <section key={category.id}>
              <h2 className="text-2xl md:text-3xl font-bold text-red-700 mb-8 flex items-center gap-4 relative pb-3">
                <span className="text-orange-500 text-3xl">{category.icon}</span>
                <span>{category.name}</span>
                <span className="absolute bottom-0 left-0 w-24 h-1 bg-orange-400 rounded-full"></span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-2 duration-300 group">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-0 right-0 m-3">
                        {item.isPopular && (
                          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-16 opacity-60"></div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {item.isVeg ? (
                              <span className="flex items-center text-green-600 text-xs font-medium">
                                <FaLeaf className="text-xs mr-1" />
                                Pure Veg
                              </span>
                            ) : (
                              <span className="flex items-center text-red-600 text-xs font-medium">
                                <FaCircle className="text-xs mr-1" />
                                Non-Veg
                              </span>
                            )}
                            <span className="flex items-center text-amber-600 text-xs font-medium">
                              <FaClock className="text-xs mr-1" />
                              {item.prepTime}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                        </div>
                        <span className="font-bold text-red-600 text-xl">{item.price}</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-5 leading-relaxed">{item.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1 text-amber-500 font-medium">
                          <FaStar className="fill-current" />
                          {item.rating}
                        </span>
                        <div className="flex gap-2">
                          <button className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-colors">
                            <FaHeart />
                          </button>
                          <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:from-red-700 hover:to-red-800 transition-all shadow-sm">
                            <FaPlus />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      
      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
          <FaShoppingBasket className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default KitchenMenu;