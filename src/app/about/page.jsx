'use client'

import React from 'react';
import Image from 'next/image';
import { ShoppingBag, Users, Globe, Trophy, Truck, Headphones } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About SHOPNOW</h1>
          <p className="text-xl max-w-2xl">
            Your trusted destination for premium fashion and lifestyle products since 2020
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              SHOPNOW began with a simple vision: to make quality fashion accessible to everyone. What started as a small online store has grown into a comprehensive e-commerce platform serving customers worldwide.
            </p>
            <p className="text-gray-600 mb-4">
              We believe that everyone deserves to look and feel their best without breaking the bank. Our curated collection combines style, quality, and affordability to bring you the latest fashion trends.
            </p>
            <p className="text-gray-600">
              Today, we're proud to serve millions of customers, offering everything from casual wear to luxury fashion items, all while maintaining our commitment to customer satisfaction and quality.
            </p>
          </div>
          <div className="relative h-[400px] object-cover rounded-lg shadow-xl"  style={{
       backgroundImage: 'url("https://images.unsplash.com/photo-1441984904996-e0b6ba687e04")',
       backgroundSize: 'cover',
       backgroundPosition: 'center'
     }}>
           
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-blue-600 mb-2">1M+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-600 mb-2">50K+</h3>
              <p className="text-gray-600">Products</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-600 mb-2">100+</h3>
              <p className="text-gray-600">Brands</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-600 mb-2">150+</h3>
              <p className="text-gray-600">Countries Served</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose SHOPNOW?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 border rounded-lg hover:shadow-lg transition duration-300">
            <ShoppingBag className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Quality Products</h3>
            <p className="text-gray-600">Carefully curated collection of premium products from trusted brands</p>
          </div>
          <div className="text-center p-6 border rounded-lg hover:shadow-lg transition duration-300">
            <Truck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
            <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
          </div>
          <div className="text-center p-6 border rounded-lg hover:shadow-lg transition duration-300">
            <Headphones className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
            <p className="text-gray-600">Dedicated customer support team ready to assist you</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'John Doe', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a' },
              { name: 'Jane Smith', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2' },
              { name: 'Mike Johnson', role: 'Technical Director', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}