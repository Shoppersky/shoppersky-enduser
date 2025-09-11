'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Discover Your",
      subtitle: "Perfect Style",
      description: "Shop the latest trends in fashion, electronics, and home decor. Quality products at unbeatable prices with free shipping worldwide.",
      image: "https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=800",
      bgGradient: "from-purple-600 to-blue-600",
      buttonColor: "bg-yellow-400 hover:bg-yellow-300 text-black"
    },
    {
      id: 2,
      title: "Tech Revolution",
      subtitle: "Starts Here",
      description: "Explore cutting-edge electronics and gadgets that will transform your daily life. Innovation meets affordability in our tech collection.",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800",
      bgGradient: "from-blue-600 to-indigo-600",
      buttonColor: "bg-orange-400 hover:bg-orange-300 text-black"
    },
    {
      id: 3,
      title: "Home Sweet",
      subtitle: "Home",
      description: "Transform your living space with our curated collection of home decor, furniture, and garden essentials. Create your dream home today.",
      image: "https://images.pexels.com/photos/10827382/pexels-photo-10827382.jpeg?_gl=1*q05lpa*_ga*MTY5MTMxMzU4OS4xNzU3NTA1NTYy*_ga_8JE65Q40S6*czE3NTc1MDU1NjEkbzEkZzEkdDE3NTc1MDU2ODgkajEkbDAkaDA.",
      bgGradient: "from-green-600 to-teal-600",
      buttonColor: "bg-pink-400 hover:bg-pink-300 text-black"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className={`relative bg-gradient-to-r ${currentSlideData.bgGradient} text-white overflow-hidden`}>
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10  bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10  bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="relative container mx-auto px-4 md:py-20 py-10 flex flex-col lg:flex-row items-center md:min-h-[600px]">
        <div className="lg:w-1/2 mb-10 lg:mb-0 md:block hidden">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            {currentSlideData.title}
            <span className="block text-yellow-300">{currentSlideData.subtitle}</span>
          </h1>
          <p className="text-xl mb-8 text-gray-200 max-w-lg animate-fade-in-delay">
            {currentSlideData.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
            {/* <button className={`${currentSlideData.buttonColor} px-8 py-4 rounded-full font-semibold transition duration-300 flex items-center justify-center group`}>
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition duration-300 flex items-center justify-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              View Collection
            </button> */}
          </div>
        </div>
        <div className="lg:w-1/2">
          <img 
            src={currentSlideData.image}
            alt="Hero Image" 
            className="rounded-2xl shadow-2xl max-w-full h-auto animate-slide-in"
            key={currentSlide}
          />
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;