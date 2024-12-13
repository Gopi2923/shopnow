'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  Search, 
  Heart 
} from 'lucide-react';
import { CartSidebar } from './CartSidebar';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = 2; // You can replace this with actual cart item count logic

  const toggleCartSidebar = () => {
    setIsCartOpen(!isCartOpen);
  };

  const navItems = [
    { 
      label: 'Categories', 
      submenu: [
        { name: 'Clothing', href: '/categories/clothing' },
        { name: 'Accessories', href: '/categories/accessories' },
        { name: 'Shoes', href: '/categories/shoes' }
      ]
    },
    { label: 'New Arrivals', href: '/new-arrivals' },
    { label: 'Sale', href: '/sale', className: 'text-red-500' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          SHOP<span className="text-blue-600">NOW</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              {item.submenu ? (
                <div className="relative">
                  <button className="hover:text-blue-600">
                    {item.label}
                  </button>
                  {/* Dropdown for submenu */}
                  <div className="absolute hidden group-hover:block bg-white shadow-lg rounded mt-2 p-2 min-w-[200px]">
                    {item.submenu.map((subitem) => (
                      <Link 
                        key={subitem.name} 
                        href={subitem.href} 
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  href={item.href || '#'} 
                  className={`hover:text-blue-600 ${item.className || ''}`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Icons and Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center">
            <input 
              type="text" 
              placeholder="Search..." 
              className="border px-3 py-2 rounded-l-md"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
              <Search size={20} />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/wishlist" className="hover:text-blue-600">
              <Heart />
            </Link>
            <Link href="/login" className="hover:text-blue-600">
              <User />
            </Link>
            <div className="flex items-center">
        <button 
          onClick={toggleCartSidebar} 
          className="relative hover:text-blue-600"
        >
          <ShoppingCart />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cartItemCount}
          </span>
        </button>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
          </div>
        </div>
      </div>
    </nav>
  );
}