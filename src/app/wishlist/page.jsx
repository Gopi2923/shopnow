import React from 'react';
import Image from 'next/image';
import { Heart, Trash2, ShoppingCart, Star } from 'lucide-react';

const wishlistItems = [
  {
    id: '1',
    name: 'Elegant Modern Sofa',
    brand: 'HomeStyle',
    price: 1299.99,
    image: '/images/products/young-woman-wearing-jacket-walking-outside.jpg',
    rating: 4.5
  },
  {
    id: '2',
    name: 'Wireless Noise Cancelling Headphones',
    brand: 'SoundWave',
    price: 249.99,
    image: '/images/products/woman-hand-with-clutch-bag.jpg',
    rating: 4.7
  },
  {
    id: '3',
    name: 'Smart Watch Series X',
    brand: 'TechPro',
    price: 349.99,
    image: '/images/products/men-shoes.jpg',
    rating: 4.3
  }
];

const WishlistPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-4">
          <Heart className="w-10 h-10 text-red-500" />
          <h1 className="text-4xl font-bold text-gray-800">
            My Wishlist
            <span className="ml-4 text-lg text-gray-500">
              3 Items
            </span>
          </h1>
        </div>
        <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-100 transition">
          <Trash2 className="w-5 h-5" />
          <span>Clear Wishlist</span>
        </button>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlistItems.map((item) => (
          <div 
            key={item.id} 
            className="bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            <div className="relative">
              <Image 
                src={item.image} 
                alt={item.name}
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
              />
              <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition">
                <Trash2 className="w-6 h-6 text-red-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {item.name}
                  </h2>
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
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (Optional) */}
      {wishlistItems.length === 0 && (
        <div className="text-center py-16">
          <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <p className="text-xl text-gray-500">
            Your wishlist is empty
          </p>
          <p className="text-gray-400 mb-6">
            Explore our products and add some items you love
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;