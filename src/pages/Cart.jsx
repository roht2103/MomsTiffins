import React from 'react';
import { FaShoppingCart, FaUtensils, FaArrowRight, FaTimes , FaMinus, FaPlus} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  if (!cart.kitchenId) {
    return (
      <div className="fixed bottom-8 right-8 bg-white  rounded-4xl shadow-2xl border border-gray-100  transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative ">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-400 mb-2">
              <FaShoppingCart size={24} />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-red-600">0</span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-6 rounded-xl shadow-2xl border border-gray-100 w-80 max-h-[80vh] overflow-y-auto transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-600">
            <FaUtensils />
          </div>
          <h3 className="font-bold text-lg text-gray-800">
            {cart.kitchenName}
          </h3>
        </div>
        <button 
          onClick={clearCart}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <FaTimes />
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {cart.items.map(item => (
          <div key={item.name} className="py-4 flex justify-between items-center group">
            <div className="flex-1">
              <h4 className="font-medium group-hover:text-red-600 transition-colors">{item.name}</h4>
              <p className="text-sm text-gray-500">₹{item.price} × {item.quantity}</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => removeFromCart(item.name)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 text-red-500 transition-colors"
              >
                <FaMinus size={12} />
              </button>
              <span className="font-medium w-5 text-center">{item.quantity}</span>
              <button 
                onClick={() => addToCart(item, { _id: cart.kitchenId, kitchenName: cart.kitchenName })}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-green-100 text-green-500 transition-colors"
              >
                <FaPlus size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-gray-700">Subtotal:</span>
          <span className="font-bold text-red-600">₹{cart.total.toFixed(2)}</span>
        </div>
        <button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;