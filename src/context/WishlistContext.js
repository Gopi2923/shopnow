'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    }
    return [];
  });

  // Use refs to track state changes
  const prevWishlistRef = useRef(wishlistItems);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }

    // Compare previous and current state to show toast only when actually changed
    const prevItems = prevWishlistRef.current;
    if (prevItems.length !== wishlistItems.length) {
      // Item added
      if (wishlistItems.length > prevItems.length) {
        const newItem = wishlistItems.find(
          item => !prevItems.some(prevItem => prevItem.id === item.id)
        );
        if (newItem) {
          toast.success('Added to wishlist!');
        }
      }
      // Item removed
      else if (wishlistItems.length < prevItems.length) {
        toast.success('Removed from wishlist');
      }
      // Wishlist cleared
      else if (wishlistItems.length === 0 && prevItems.length > 0) {
        toast.success('Wishlist cleared');
      }
    }

    prevWishlistRef.current = wishlistItems;
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        toast.error('Item already in wishlist');
        return prevItems;
      }

      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem('wishlist');
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}