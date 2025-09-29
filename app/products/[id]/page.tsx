'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  ShoppingCart, 
  Share2, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus
} from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { formatPrice } from '@/lib/utils/currency';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/products/ProductCard';

// Mock data - în producție va veni din API
const mockProduct = {
  _id: '1',
  name: 'Classic White Premium T-Shirt',
  description: 'Experience ultimate comfort with our premium cotton t-shirt. Crafted from 100% organic cotton with a modern fit that flatters every body type. This versatile piece is perfect for casual outings, layering, or as your go-to everyday essential.',
  price: 89.99,
  salePrice: 69.99,
  category: 'basic',
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: ['White', 'Black', 'Navy', 'Gray'],
  images: [
    'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg',
    'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    'https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg',
    'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg',
  ],
  stock: { 
    'XS-White': 5, 'S-White': 12, 'M-White': 18, 'L-White': 15, 'XL-White': 8, 'XXL-White': 3,
    'XS-Black': 8, 'S-Black': 15, 'M-Black': 20, 'L-Black': 12, 'XL-Black': 6, 'XXL-Black': 4,
    'XS-Navy': 6, 'S-Navy': 10, 'M-Navy': 14, 'L-Navy': 11, 'XL-Navy': 7, 'XXL-Navy': 2,
    'XS-Gray': 4, 'S-Gray': 9, 'M-Gray': 16, 'L-Gray': 13, 'XL-Gray': 5, 'XXL-Gray': 3,
  },
  featured: true,
  onSale: true,
  tags: ['basic', 'cotton', 'bestseller', 'organic'],
  sku: 'TEE-001',
  rating: 4.8,
  reviewCount: 127,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const relatedProducts = [
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
];

export default function ProductPage() {
  const params = useParams();
  const [product] = useState(mockProduct);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCartStore();

  const pricing = formatPrice(product.price, product.salePrice);
  const selectedStock = selectedSize && selectedColor 
    ? product.stock[`${selectedSize}-${selectedColor}`] || 0 
    : 0;

  useEffect(() => {
    if (product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
    if (product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
  }, [product, selectedSize, selectedColor]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor || selectedStock === 0) return;

    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      stock: selectedStock,
    });
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const getColorHex = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      'White': '#FFFFFF',
      'Black': '#000000',
      'Navy': '#1E3A8A',
      'Gray': '#6B7280',
      'Red': '#EF4444',
      'Blue': '#3B82F6',
      'Green': '#10B981',
    };
    return colorMap[colorName] || '#6B7280';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground">Products</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              {product.featured && (
                <Badge variant="default">Featured</Badge>
              )}
              {product.onSale && pricing.discount && (
                <Badge variant="destructive">-{pricing.discount}%</Badge>
              )}
            </div>
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent hover:border-muted-foreground'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <Badge variant="outline">SKU: {product.sku}</Badge>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            {pricing.sale ? (
              <>
                <span className="text-3xl font-bold text-green-600">{pricing.sale}</span>
                <span className="text-xl line-through text-muted-foreground">{pricing.original}</span>
              </>
            ) : (
              <span className="text-3xl font-bold">{pricing.original}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold">Color: {selectedColor}</h3>
            <div className="flex space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color
                      ? 'border-primary scale-110'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: getColorHex(color) }}
                  title={color}
                >
                  {selectedColor === color && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-3 h-3 rounded-full ${
                        color === 'White' ? 'bg-black' : 'bg-white'
                      }`} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Size: {selectedSize}</h3>
              <Link href="/size-guide" className="text-sm text-primary hover:underline">
                Size Guide
              </Link>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => {
                const sizeStock = selectedColor ? product.stock[`${size}-${selectedColor}`] || 0 : 0;
                const isAvailable = sizeStock > 0;
                
                return (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    disabled={!isAvailable}
                    className={`h-12 ${!isAvailable ? 'opacity-50' : ''}`}
                  >
                    {size}
                  </Button>
                );
              })}
            </div>
            {selectedSize && selectedColor && (
              <p className="text-sm text-muted-foreground">
                {selectedStock > 0 ? `${selectedStock} in stock` : 'Out of stock'}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-3">
            <h3 className="font-semibold">Quantity</h3>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(selectedStock, quantity + 1))}
                disabled={quantity >= selectedStock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor || selectedStock === 0}
              className="flex-1 h-12"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`h-12 ${isWishlisted ? 'text-red-500 border-red-500' : ''}`}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="outline" size="lg" className="h-12">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground">Orders over 200 RON</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Quality Guarantee</p>
                <p className="text-xs text-muted-foreground">100% satisfaction</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="details" className="mb-16">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="care">Care Instructions</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Product Features</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 100% organic cotton construction</li>
                    <li>• Pre-shrunk for consistent fit</li>
                    <li>• Reinforced shoulder seams</li>
                    <li>• Tag-free comfort</li>
                    <li>• Machine washable</li>
                    <li>• Available in multiple colors</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Specifications</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Material:</dt>
                      <dd>100% Organic Cotton</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Weight:</dt>
                      <dd>180 GSM</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Fit:</dt>
                      <dd>Regular Fit</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Origin:</dt>
                      <dd>Made in Romania</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="care" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Care Instructions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Washing</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Machine wash cold (30°C max)</li>
                      <li>• Use mild detergent</li>
                      <li>• Wash with similar colors</li>
                      <li>• Turn inside out before washing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Drying & Ironing</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Tumble dry low heat</li>
                      <li>• Remove promptly to prevent wrinkles</li>
                      <li>• Iron on medium heat if needed</li>
                      <li>• Do not bleach or dry clean</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Reviews Coming Soon</h3>
                <p className="text-muted-foreground">
                  Customer reviews will be displayed here once the review system is implemented.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((relatedProduct, index) => (
            <ProductCard 
              key={relatedProduct._id} 
              product={relatedProduct as any} 
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}