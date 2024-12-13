import React from 'react';
import { Package, CreditCard, MapPin } from 'lucide-react';

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
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
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Address
                </label>
                <textarea 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                  placeholder="123 Main St, Anytown, USA"
                  rows={4}
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center mb-6 text-gray-700">
              <CreditCard className="mr-3 w-6 h-6 text-green-500" />
              <h2 className="text-2xl font-semibold">Order Summary</h2>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center">
                  <img 
                    src="/images/products/woman-hand-with-clutch-bag.jpg" 
                    alt="Product" 
                    className="w-16 h-16 rounded-md mr-4 object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Minimalist Leather Wallet</p>
                    <p className="text-sm text-gray-500">Quantity: 1</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-800">$99.99</span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>$99.99</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>$5.99</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span>$8.00</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-xl text-gray-900">
                <span>Total</span>
                <span>$113.98</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-lg hover:opacity-90 transition duration-300 flex items-center justify-center space-x-2 font-semibold"
            >
              <CreditCard className="w-6 h-6" />
              <span>Place Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;