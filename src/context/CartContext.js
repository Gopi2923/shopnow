'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialize state from localStorage if available, else empty array
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

    // Update localStorage whenever cart changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(cartItems));
        }
      }, [cartItems]);

  const addToCart = (product, selectedSize, selectedColor, quantity) => {
    setCartItems(prevItems => {
      // Check if item already exists with same properties
      const existingItemIndex = prevItems.findIndex(item => 
        item.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity = quantity;
        toast.success('Cart updated successfully!');
        return newItems;
      }

      // Add new item if it doesn't exist
      return [...prevItems, {
        ...product,
        selectedSize,
        selectedColor,
        quantity,
      }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== id);
      toast.success('Item removed from cart');
      return newItems;
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      toast.error('Quantity cannot be less than 1');
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    toast.success('Quantity updated');
  };

  // Clear cart function
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  }