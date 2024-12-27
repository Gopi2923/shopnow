'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const prevCartRef = useRef(cartItems);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    const prevItems = prevCartRef.current;
    
    // Check what type of change occurred
    if (prevItems.length !== cartItems.length) {
      // Item added
      if (cartItems.length > prevItems.length) {
        toast.success('Item added to cart!');
      }
      // Item removed
      else if (cartItems.length < prevItems.length) {
        toast.success('Item removed from cart');
      }
      // Cart cleared
      else if (cartItems.length === 0 && prevItems.length > 0) {
        toast.success('Cart cleared');
      }
    } else {
      // Check for quantity or other updates
      const hasUpdates = cartItems.some((item, index) => {
        const prevItem = prevItems[index];
        return prevItem && (
          item.quantity !== prevItem.quantity ||
          item.selectedSize !== prevItem.selectedSize ||
          item.selectedColor !== prevItem.selectedColor
        );
      });
      
      if (hasUpdates) {
        toast.success('Cart updated successfully!');
      }
    }

    prevCartRef.current = cartItems;
  }, [cartItems]);

  const addToCart = (product, selectedSize, selectedColor, quantity) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => 
        item.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity = quantity;
        return newItems;
      }

      return [...prevItems, {
        ...product,
        selectedSize,
        selectedColor,
        quantity,
      }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== id)
    );
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
  };

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