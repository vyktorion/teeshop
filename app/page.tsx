'use client';

import { HeroSection } from '@/components/ui/hero-section';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Mock data for demonstration
const featuredProducts = [
  {
    _id: '1',
    name: 'Classic White Tee',
    description: 'Premium cotton t-shirt with a classic fit. Perfect for everyday wear.',
    price: 89.99,
    salePrice: 69.99,
    category: 'basic',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy'],
    images: ['https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg'],
    stock: { 'M-White': 10, 'L-White': 5, 'M-Black': 8 },
    featured: true,
    onSale: true,
    tags: ['basic', 'cotton'],
    sku: 'TEE-001',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    name: 'Vintage Graphic Tee',
    description: 'Retro-inspired design with soft cotton blend fabric.',
    price: 99.99,
    category: 'graphic',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gray', 'Black', 'White'],
    images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'],
    stock: { 'M-Gray': 15, 'L-Gray': 12, 'XL-Black': 6 },
    featured: true,
    onSale: false,
    tags: ['vintage', 'graphic'],
    sku: 'TEE-002',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '3',
    name: 'Premium Polo Tee',
    description: 'Elegant polo-style t-shirt made from premium materials.',
    price: 129.99,
    category: 'premium',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'White', 'Green'],
    images: ['https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg'],
    stock: { 'M-Navy': 8, 'L-Navy': 4, 'M-White': 10 },
    featured: true,
    onSale: false,
    tags: ['premium', 'polo'],
    sku: 'TEE-003',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '4',
    name: 'Eco-Friendly Tee',
    description: 'Sustainable t-shirt made from organic cotton and recycled materials.',
    price: 79.99,
    category: 'eco',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Natural', 'Green', 'Blue'],
    images: ['https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg'],
    stock: { 'M-Natural': 20, 'S-Green': 15, 'L-Blue': 8 },
    featured: true,
    onSale: false,
    tags: ['eco', 'organic'],
    sku: 'TEE-004',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const categories = [
  {
    name: 'Basic Tees',
    description: 'Essential everyday t-shirts',
    image: 'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg',
    href: '/products?category=basic',
    count: 25,
  },
  {
    name: 'Graphic Tees',
    description: 'Creative designs and prints',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    href: '/products?category=graphic',
    count: 48,
  },
  {
    name: 'Premium Collection',
    description: 'Luxury materials and fits',
    image: 'https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg',
    href: '/products?category=premium',
    count: 12,
  },
];

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free delivery on orders over 200 RON',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: '100% satisfaction guarantee or money back',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Customer support available anytime',
  },
];

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <AnimatedSection className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Categories Section */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collections designed for every style and occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Link href={category.href}>
                  <Card className="overflow-hidden border-0 shadow-lg">
                    <div className="relative h-48">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <div className="text-center">
                          <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                          <p className="text-sm text-gray-200 mb-3">{category.description}</p>
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                            {category.count} products
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Products Section */}
      <AnimatedSection className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
              <p className="text-lg text-muted-foreground">
                Hand-picked favorites from our latest collection
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/products" className="flex items-center space-x-2">
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product._id} 
                product={product as any} 
                index={index}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground">
              Thousands of satisfied customers love our t-shirts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria Ionescu',
                rating: 5,
                comment: 'Amazing quality! The fabric is so soft and the fit is perfect. Will definitely order again.',
              },
              {
                name: 'Alexandru Popescu',
                rating: 5,
                comment: 'Great customer service and fast shipping. The t-shirt looks exactly like in the photos.',
              },
              {
                name: 'Diana Marin',
                rating: 5,
                comment: 'Love the sustainable collection! High quality and environmentally conscious.',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.comment}"</p>
                    <p className="font-semibold">{testimonial.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Newsletter Section */}
      <AnimatedSection className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in Style</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for exclusive deals and new arrivals
          </p>
          <div className="max-w-md mx-auto flex space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-primary"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}