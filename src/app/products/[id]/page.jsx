'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Star, ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  // Find the product by ID from the URL
  const product = products.find(p => p.id === Number(params.id));

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  if (!product) {
    return <div className="container mx-auto p-4">Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    // Implement add to cart logic
    console.log('Added to cart', {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation and Wishlist */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2" /> Back to Products
        </button>
        
        <button 
          onClick={() => setIsWishlist(!isWishlist)}
          className={`flex items-center ${
            isWishlist ? 'text-red-500' : 'text-gray-400'
          } hover:text-red-600`}
        >
          <Heart 
            fill={isWishlist ? 'currentColor' : 'transparent'}
            className="mr-2"
          />
          {isWishlist ? 'Wishlisted' : 'Add to Wishlist'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <div className="relative w-full h-96 mb-4">
            <Image 
              src={product.image} 
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-500 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  className={i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}
                />
              ))}
            </div>
            <span>({product.rating.toFixed(1)})</span>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-gray-900 mb-4">
            ${product.price.toFixed(2)}
          </p>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Select Size</h3>
            <div className="flex space-x-2">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Select Color</h3>
            <div className="flex space-x-2">
              {['Black', 'White', 'Gray'].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded ${
                    selectedColor === color 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center mb-4">
            <span className="mr-4">Quantity:</span>
            <div className="flex items-center border rounded">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border-r"
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity}
                readOnly
                className="w-16 text-center"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border-l"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            disabled={!selectedSize || !selectedColor}
            className={`w-full flex items-center justify-center py-3 rounded-lg ${
              !selectedSize || !selectedColor
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <ShoppingCart className="mr-2" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}