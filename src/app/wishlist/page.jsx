'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Trash2, ShoppingCart, Star } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 'M', 'Black', 1); // Default values, you might want to add size/color selection
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-4">
          <Heart className="w-10 h-10 text-red-500" />
          <h1 className="text-4xl font-bold text-gray-800">
            My Wishlist
            <span className="ml-4 text-lg text-gray-500">
              {wishlistItems.length} Items
            </span>
          </h1>
        </div>
        {wishlistItems.length > 0 && (
          <button 
            onClick={clearWishlist}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-100 transition"
          >
            <Trash2 className="w-5 h-5" />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {/* Wishlist Grid */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative">
                <Link href={`/products/${item.id}`}>
                  <div className="relative h-64 w-full">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                </Link>
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition"
                >
                  <Trash2 className="w-6 h-6 text-red-500" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <Link href={`/products/${item.id}`}>
                      <h2 className="text-xl font-semibold text-gray-800 mb-1 hover:text-blue-600">
                        {item.name}
                      </h2>
                    </Link>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                  </div>
                  <div className="flex items-center text-yellow-500 space-x-1">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-medium">{item.rating}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <p className="text-xl text-gray-500">
            Your wishlist is empty
          </p>
          <p className="text-gray-400 mb-6">
            Explore our products and add some items you love
          </p>
          <Link href="/products">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;