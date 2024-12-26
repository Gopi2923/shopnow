'use client';

import React, { useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { products, categories } from '@/data/products';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  // Add to cart handler
  const handleAddToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? {...item, quantity: (item.quantity || 1) + 1} 
          : item
      ));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <BannerCarousel /> */}
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg mb-12 p-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Winter Collection 2024</h1>
        <p className="text-xl mb-6">Discover the latest trends and styles</p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100">
          Shop Now
        </button>
      </section>

      {/* Category Filters */}
      <div className="flex justify-center mb-8 space-x-4">
        <button 
          onClick={() => setSelectedCategory(null)}
          className={`px-6 py-2 rounded-full ${
            selectedCategory === null 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full ${
              selectedCategory === category 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}