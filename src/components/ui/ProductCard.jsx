'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductCard({ product, onAddToCart }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistClick = (e) => {
    e.stopPropagation(); // Prevent navigating to product details
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
  
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative cursor-pointer">
        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistClick}
          className={`absolute top-4 right-4 z-10 ${
            isWishlisted ? 'text-red-500' : 'text-gray-300'
          } hover:text-red-500`}
        >
          <Heart fill={isWishlisted ? 'currentColor' : 'transparent'} />
        </button>
        <Link href={`/products/${product.id}`}>
        {/* Product Image */}
        <div className="relative w-full h-64">
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-semibold">{product.name}</h3>
            <div className="flex items-center">
              <Star className="text-yellow-500 mr-1" size={18} />
              <span>{product.rating}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-2">{product.description}</p>

          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigating to product details
                onAddToCart(product);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 flex items-center"
            >
              <ShoppingCart className="mr-2" size={18} />
              Add to Cart
            </button>
          </div>
        </div>
        </Link>
      </div>
   
  );
}