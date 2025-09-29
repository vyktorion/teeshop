import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">TeeShop</h3>
            <p className="text-sm text-muted-foreground">
              Your destination for premium quality t-shirts. Style, comfort, and quality in every piece.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/products" className="block text-sm text-muted-foreground hover:text-foreground">
                All Products
              </Link>
              <Link href="/categories" className="block text-sm text-muted-foreground hover:text-foreground">
                Categories
              </Link>
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-foreground">
                About Us
              </Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <div className="space-y-2">
              <Link href="/shipping" className="block text-sm text-muted-foreground hover:text-foreground">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-sm text-muted-foreground hover:text-foreground">
                Returns & Exchanges
              </Link>
              <Link href="/size-guide" className="block text-sm text-muted-foreground hover:text-foreground">
                Size Guide
              </Link>
              <Link href="/faq" className="block text-sm text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@teeshop.ro</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+40 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Bucharest, Romania</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Subscribe to our newsletter</p>
              <div className="flex space-x-2">
                <Input placeholder="Your email" className="flex-1" />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 TeeShop. All rights reserved. Made with ❤️ in Romania.
          </p>
        </div>
      </div>
    </footer>
  );
}