'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowLeft,
  Gift,
  Truck,
  Shield
} from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { formatCurrency } from '@/lib/utils/currency';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 200 ? 0 : 19.99;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleQuantityChange = (id: string, size: string, color: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id, size, color);
    } else {
      updateQuantity(id, size, color, newQuantity);
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setPromoApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link href="/products">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Start Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={`${item.id}-${item.size}-${item.color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                          sizes="96px"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                              <span>Size: {item.size}</span>
                              <span>Color: {item.color}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {item.salePrice ? (
                                <>
                                  <span className="font-bold text-green-600">
                                    {formatCurrency(item.salePrice)}
                                  </span>
                                  <span className="text-sm line-through text-muted-foreground">
                                    {formatCurrency(item.price)}
                                  </span>
                                </>
                              ) : (
                                <span className="font-bold">
                                  {formatCurrency(item.price)}
                                </span>
                              )}
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id, item.size, item.color)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="font-bold">
                              {formatCurrency((item.salePrice || item.price) * item.quantity)}
                            </p>
                            {item.stock <= 5 && (
                              <p className="text-xs text-orange-600">
                                Only {item.stock} left in stock
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Promo Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="h-5 w-5" />
                <span>Promo Code</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                />
                <Button 
                  onClick={applyPromoCode}
                  disabled={promoApplied || !promoCode}
                  variant="outline"
                >
                  Apply
                </Button>
              </div>
              {promoApplied && (
                <div className="flex items-center space-x-2 text-green-600">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    WELCOME10 Applied
                  </Badge>
                  <span className="text-sm">10% discount</span>
                </div>
              )}
              {!promoApplied && (
                <p className="text-xs text-muted-foreground">
                  Try "WELCOME10" for 10% off your first order
                </p>
              )}
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="flex items-center space-x-1">
                  <Truck className="h-4 w-4" />
                  <span>Shipping</span>
                </span>
                <span>
                  {shipping === 0 ? (
                    <Badge variant="secondary">Free</Badge>
                  ) : (
                    formatCurrency(shipping)
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">
                  Add {formatCurrency(200 - subtotal)} more for free shipping
                </p>
              )}

              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>

              {/* Trust Badges */}
              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <span>Free returns within 30 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}