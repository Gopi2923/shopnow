'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import Link from 'next/link';

// Sample cart items (you'll replace this with actual cart state)
const initialCartItems = [
  {
    id: 1,
    name: 'Vintage Denim Jacket',
    price: 129.99,
    quantity: 1,
    image: '/images/products/young-woman-wearing-jacket-walking-outside.jpg'
  },
  {
    id: 2,
    name: 'Leather Sneakers',
    price: 199.50,
    quantity: 2,
    image: '/images/products/men-shoes.jpg'
  }
];

export function CartSidebar({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Calculate total
  const total = cartItems.reduce((acc, item) => 
    acc + (item.price * item.quantity), 0);

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    ));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button 
                onClick={onClose} 
                className="text-gray-600 hover:text-black"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center border-b pb-4"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 mr-4 bg-gray-100 flex items-center justify-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="max-w-full max-h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      
                      {/* Quantity Control */}
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 px-2 rounded"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 px-2 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Cart Summary */}
            {cartItems.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between mb-4">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
            <Link href='/checkout' onClick={onClose}>
                <button 
                  className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
                >
                  Proceed to Checkout
                </button>
            </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

