'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { useCartStore } from '@/lib/store/useCartStore';
import { formatPrice } from '@/lib/utils/currency';
import { motion } from 'framer-motion';
import { IProduct } from '@/lib/models/Product';

interface ProductCardProps {
  product: IProduct;
  index?: number;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, index = 0, viewMode = 'grid' }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCartStore();

  const pricing = formatPrice(product.price, product.salePrice);
  const isInStock = Object.values(product.stock).some((stock) => stock > 0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isInStock) return;

    // Find first available size/color combination
    const stockEntries = Object.entries(product.stock);
    const availableStock = stockEntries.find(([_, stock]) => stock > 0);
    
    if (availableStock) {
      const [sizeColor] = availableStock;
      const [size, color] = sizeColor.split('-');
      
     addItem({
  id: product._id.toString(),
  name: product.name,
  price: product.price,
  salePrice: product.salePrice,
  image: product.images[0],
  size: size,
  color: color,
  stock: availableStock[1],
});
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.01 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="flex">
            <div className="relative w-48 h-48 flex-shrink-0">
              <Link href={`/products/${product._id}`}>
                <Image
                  src={product.images[0] || '/placeholder-tshirt.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="192px"
                />
              </Link>
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col space-y-1">
                {product.featured && (
                  <Badge variant="default" className="text-xs">Featured</Badge>
                )}
                {product.onSale && pricing.discount && (
                  <Badge variant="destructive" className="text-xs">-{pricing.discount}%</Badge>
                )}
                {!isInStock && (
                  <Badge variant="secondary" className="text-xs">Out of Stock</Badge>
                )}
              </div>
            </div>
            
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <Link href={`/products/${product._id}`}>
                  <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                </Link>
                
                {/* Colors and Sizes */}
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Colors:</span>
                    <div className="flex space-x-1">
                      {product.colors.slice(0, 4).map((color) => (
                        <div
                          key={color}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        />
                      ))}
                      {product.colors.length > 4 && (
                        <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Sizes:</span>
                    <div className="flex space-x-1">
                      {product.sizes.slice(0, 4).map((size) => (
                        <Badge key={size} variant="outline" className="text-xs px-2 py-1">
                          {size}
                        </Badge>
                      ))}
                      {product.sizes.length > 4 && (
                        <span className="text-xs text-muted-foreground">+{product.sizes.length - 4}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {pricing.sale ? (
                    <>
                      <span className="text-2xl font-bold text-green-600">{pricing.sale}</span>
                      <span className="text-lg line-through text-muted-foreground">{pricing.original}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">{pricing.original}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    disabled={!isInStock}
                    className="flex items-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
        <CardHeader className="p-0 relative">
          <Link href={`/products/${product._id}`}>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.images[selectedImage] || '/placeholder-tshirt.jpg'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Overlay on hover */}
              <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
              
              {/* Action buttons */}
              <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-transform duration-300 ${isHovered ? 'translate-x-0' : 'translate-x-12'}`}>
                <Button size="icon" variant="secondary" className="h-8 w-8">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.featured && (
                  <Badge variant="default">Featured</Badge>
                )}
                {product.onSale && pricing.discount && (
                  <Badge variant="destructive">-{pricing.discount}%</Badge>
                )}
                {!isInStock && (
                  <Badge variant="secondary">Out of Stock</Badge>
                )}
              </div>

              {/* Image navigation dots */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedImage(i);
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === selectedImage ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </Link>
        </CardHeader>

        <CardContent className="p-4">
          <Link href={`/products/${product._id}`}>
            <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {product.description}
            </p>
          </Link>

          {/* Colors */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xs text-muted-foreground">Colors:</span>
            <div className="flex space-x-1">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>
              )}
            </div>
          </div>

          {/* Sizes */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xs text-muted-foreground">Sizes:</span>
            <div className="flex space-x-1">
              {product.sizes.map((size) => (
                <Badge key={size} variant="outline" className="text-xs px-2 py-1">
                  {size}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              {pricing.sale ? (
                <>
                  <span className="text-lg font-bold text-green-600">{pricing.sale}</span>
                  <span className="text-sm line-through text-muted-foreground">{pricing.original}</span>
                </>
              ) : (
                <span className="text-lg font-bold">{pricing.original}</span>
              )}
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!isInStock}
            size="sm"
            className="flex items-center space-x-1"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}