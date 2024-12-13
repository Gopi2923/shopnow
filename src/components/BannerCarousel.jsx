import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

const bannerData = [
  {
    title: "Winter Collection 2024",
    description: "Discover the latest trends and styles",
    image: "/images/winter-banner.jpg", // Replace with your actual image path
    buttonText: "Shop Now",
    buttonColor: "bg-blue-600",
  },
  {
    title: "Summer Sale Extravaganza",
    description: "Up to 50% off on selected items",
    image: "/images/summer-sale-banner.jpg", // Replace with your actual image path
    buttonText: "Grab Deals",
    buttonColor: "bg-green-600",
  },
  {
    title: "New Arrivals",
    description: "Fresh styles just landed",
    image: "/images/new-arrivals-banner.jpg", // Replace with your actual image path
    buttonText: "Explore",
    buttonColor: "bg-purple-600",
  },
  {
    title: "Limited Edition Collection",
    description: "Exclusive designs you can't miss",
    image: "/images/limited-edition-banner.jpg", // Replace with your actual image path
    buttonText: "View Collection",
    buttonColor: "bg-red-600",
  }
];

const BannerCarousel = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev + 1) % bannerData.length);
    setProgress(0);
  }, []);

  const prevBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev - 1 + bannerData.length) % bannerData.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    // Timer for auto-advancing banners
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          nextBanner();
          return 0;
        }
        return prevProgress + 1;
      });
    }, 50); // Adjust speed of progression (50ms = 5 seconds to complete)

    return () => clearInterval(timer);
  }, [nextBanner]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {bannerData.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentBanner ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Next.js Image component for optimized image loading */}
          <Image 
            src={banner.image} 
            alt={banner.title}
            fill
            priority={index === currentBanner}
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white max-w-xl px-4">
              <h2 className="text-4xl font-bold mb-4">{banner.title}</h2>
              <p className="text-xl mb-6">{banner.description}</p>
              <button 
                className={`${banner.buttonColor} text-white px-6 py-3 rounded-full flex items-center mx-auto space-x-2 hover:opacity-90 transition`}
              >
                <ShoppingCart size={20} />
                <span>{banner.buttonText}</span>
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/30">
        <div 
          className="h-full bg-white transition-all duration-50 ease-linear" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevBanner}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition z-10"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        onClick={nextBanner}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition z-10"
      >
        <ChevronRight size={30} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentBanner(index);
              setProgress(0);
            }}
            className={`w-3 h-3 rounded-full ${
              index === currentBanner ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;