'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const heroSlides = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "Fresh designs for the season",
    description: "Discover our latest t-shirt collection featuring vibrant colors and premium cotton comfort.",
    image: "https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg",
    cta: "Shop Now",
    href: "/products?category=summer",
  },
  {
    id: 2,
    title: "Premium Quality Tees",
    subtitle: "Comfort meets style",
    description: "Experience the perfect blend of comfort and style with our premium cotton t-shirts.",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
    cta: "Explore",
    href: "/products?featured=true",
  },
  {
    id: 3,
    title: "Limited Edition",
    subtitle: "Exclusive designs",
    description: "Get your hands on our limited edition designs before they're gone forever.",
    image: "https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg",
    cta: "Shop Limited",
    href: "/products?collection=limited",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl text-white">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <p className="text-lg mb-2 text-blue-200">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                    {heroSlides[currentSlide].title}
                  </h1>
                  <p className="text-xl mb-8 text-gray-200 leading-relaxed">
                    {heroSlides[currentSlide].description}
                  </p>
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link href={heroSlides[currentSlide].href}>
                      {heroSlides[currentSlide].cta}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm border-white/30"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm border-white/30"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}