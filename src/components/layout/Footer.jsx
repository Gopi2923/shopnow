import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-0">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">SHOPNOW</h3>
          <p className="text-gray-600 mb-4">
            Your ultimate destination for fashion and lifestyle.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-500 hover:text-blue-600">
              <Facebook />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-blue-600">
              <Twitter />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-blue-600">
              <Instagram />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link></li>
            <li><Link href="/products" className="text-gray-600 hover:text-blue-600">Products</Link></li>
            <li><Link href="/categories" className="text-gray-600 hover:text-blue-600">Categories</Link></li>
            <li><Link href="/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2">
            <li><Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
            <li><Link href="/shipping" className="text-gray-600 hover:text-blue-600">Shipping</Link></li>
            <li><Link href="/returns" className="text-gray-600 hover:text-blue-600">Returns</Link></li>
            <li><Link href="/faq" className="text-gray-600 hover:text-blue-600">FAQ</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <p className="text-gray-600 mb-4">
            Subscribe to get special offers and updates.
          </p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow mr-1 px-3 py-2 border rounded-l-md"
            />
            <button className="bg-blue-500 text-white px-2 py-2 rounded-r-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-4 mt-8 text-center text-gray-500 border-t pt-4">
        © 2024 SHOPNOW. All Rights Reserved.
      </div>
    </footer>
  );
}