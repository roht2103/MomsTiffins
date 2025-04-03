import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    kitchenId: null,
    kitchenName: '',
    items: [],
    total: 0
  });

  const addToCart = (item, kitchen) => {
    setCart(prev => {
      // If adding from a different kitchen, reset cart
      if (prev.kitchenId && prev.kitchenId !== kitchen._id) {
        return {
          kitchenId: kitchen._id,
          kitchenName: kitchen.kitchenName,
          items: [{
            ...item,
            quantity: 1
          }],
          total: item.price
        };
      }

      // If same kitchen, add or update item
      const existingItem = prev.items.find(i => i.name === item.name);
      
      if (existingItem) {
        const updatedItems = prev.items.map(i => 
          i.name === item.name 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
        
        return {
          ...prev,
          items: updatedItems,
          total: prev.total + item.price
        };
      } else {
        return {
          ...prev,
          kitchenId: kitchen._id,
          kitchenName: kitchen.kitchenName,
          items: [...prev.items, { ...item, quantity: 1 }],
          total: prev.total + item.price
        };
      }
    });
  };

  const removeFromCart = (itemName) => {
    setCart(prev => {
      const itemToRemove = prev.items.find(i => i.name === itemName);
      if (!itemToRemove) return prev;

      // If quantity > 1, decrement
      if (itemToRemove.quantity > 1) {
        const updatedItems = prev.items.map(i => 
          i.name === itemName 
            ? { ...i, quantity: i.quantity - 1 } 
            : i
        );
        
        return {
          ...prev,
          items: updatedItems,
          total: prev.total - itemToRemove.price
        };
      } 
      // If quantity is 1, remove completely
      else {
        const updatedItems = prev.items.filter(i => i.name !== itemName);
        // If no items left, reset kitchen info
        if (updatedItems.length === 0) {
          return {
            kitchenId: null,
            kitchenName: '',
            items: [],
            total: 0
          };
        }
        return {
          ...prev,
          items: updatedItems,
          total: prev.total - itemToRemove.price
        };
      }
    });
  };

  const clearCart = () => {
    setCart({
      kitchenId: null,
      kitchenName: '',
      items: [],
      total: 0
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);