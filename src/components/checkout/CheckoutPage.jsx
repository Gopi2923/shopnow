'use client'

import React, { useState } from 'react';
import { Package, CreditCard, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [formData, setFromData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => 
    acc + (item.price * item.quantity), 0);
  
  // Calculate shipping and tax
  const shipping = 5.99;
  const taxRate = 0.08; // 8% tax rate
  const tax = subtotal * taxRate;
  
  // Calculate total
  const total = subtotal + shipping + tax;

  // Handle input changes
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFromData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  //validate form 
  const validateForm = () => {
    const { fullName, email, phone, address } = formData;
    if(!fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if(!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email');
      return false;
    }
    if(!phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    if(!address.trim()) {
      toast.error('Plese enter your shipping address')
      return false;
    }
  }

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm()) return;
    if(cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    
    try{
      const order = {
        customerInfo: formData,
        items: cartItems,
        pricing: {
          subtotal,
          shipping,
          tax,
          total
        },
        orderData: new Date().toISOString()
      }

      await new Promise(resolve => setTimeout(resolve, 1500));

      clearCart();

      toast.success('Order placed successfully!');

      router.push('/order-success')
    } catch(error) {
      toast.error('Failed to place order. Please try again.')
    } finally {
      setIsSubmitting(false);
    }


  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-3xl font-extrabold text-white flex items-center">
            <Package className="mr-4 w-10 h-10" />
            Checkout
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Shipping Information */}
          <div>
            <div className="flex items-center mb-6 text-gray-700">
              <MapPin className="mr-3 w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-semibold">Shipping Details</h2>
            </div>
            
            {/* <form className="space-y-6" onSubmit={handleSubmit}> */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input 
                  type="text" 
                  name='fullName'
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name='email'
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input 
                    type="tel"
                    name='phone' 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                    value={formData.phone}
                    placeholder="+91 1234567890"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Address
                </label>
                <textarea 
                  name='address'
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                  placeholder="123 Main St, Anytown, USA"
                  rows={4}
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
           
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center mb-6 text-gray-700">
              <CreditCard className="mr-3 w-6 h-6 text-green-500" />
              <h2 className="text-2xl font-semibold">Order Summary</h2>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} 
                     className="flex justify-between items-center border-b pb-4">
                  <div className="flex items-center">
                    <div className="relative w-16 h-16 mr-4">
                      <Image 
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Size: {item.selectedSize}, Color: {item.selectedColor}
                      </p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-xl text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              type='submit'
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-lg hover:opacity-90 transition duration-300 flex items-center justify-center space-x-2 font-semibold"
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ): (
                <>
              <CreditCard className="w-6 h-6" />
              <span>Place Order</span>
              </>
              )}
            </button>
            
          </div>
        </div>
        </form>
    </div>
  );
};

export default CheckoutPage;