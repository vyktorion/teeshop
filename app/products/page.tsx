'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductSearch } from '@/components/products/ProductSearch';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// Mock data - în producție va veni din API
const mockProducts = [
  {
    _id: '1',
    name: 'Classic White Tee',
    description: 'Premium cotton t-shirt with a classic fit. Perfect for everyday wear with superior comfort.',
    price: 89.99,
    salePrice: 69.99,
    category: 'basic',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy'],
    images: ['https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg'],
    stock: { 'M-White': 10, 'L-White': 5, 'M-Black': 8 },
    featured: true,
    onSale: true,
    tags: ['basic', 'cotton', 'bestseller'],
    sku: 'TEE-001',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    name: 'Vintage Graphic Tee',
    description: 'Retro-inspired design with soft cotton blend fabric. Unique vintage graphics.',
    price: 99.99,
    category: 'graphic',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gray', 'Black', 'White'],
    images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'],
    stock: { 'M-Gray': 15, 'L-Gray': 12, 'XL-Black': 6 },
    featured: true,
    onSale: false,
    tags: ['vintage', 'graphic', 'trendy'],
    sku: 'TEE-002',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '3',
    name: 'Premium Polo Tee',
    description: 'Elegant polo-style t-shirt made from premium materials with refined details.',
    price: 129.99,
    category: 'premium',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'White', 'Green'],
    images: ['https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg'],
    stock: { 'M-Navy': 8, 'L-Navy': 4, 'M-White': 10 },
    featured: true,
    onSale: false,
    tags: ['premium', 'polo', 'elegant'],
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
    featured: false,
    onSale: false,
    tags: ['eco', 'organic', 'sustainable'],
    sku: 'TEE-004',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '5',
    name: 'Sport Performance Tee',
    description: 'High-performance athletic t-shirt with moisture-wicking technology.',
    price: 119.99,
    salePrice: 89.99,
    category: 'sport',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Red', 'Blue'],
    images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'],
    stock: { 'M-Black': 25, 'L-Navy': 18, 'XL-Red': 12 },
    featured: false,
    onSale: true,
    tags: ['sport', 'performance', 'athletic'],
    sku: 'TEE-005',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '6',
    name: 'Minimalist Design Tee',
    description: 'Clean, minimalist design perfect for modern style enthusiasts.',
    price: 94.99,
    category: 'design',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Gray'],
    images: ['https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg'],
    stock: { 'M-White': 14, 'L-Black': 9, 'S-Gray': 11 },
    featured: false,
    onSale: false,
    tags: ['minimalist', 'design', 'modern'],
    sku: 'TEE-006',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const categories = [
  { id: 'all', name: 'All Products', count: 6 },
  { id: 'basic', name: 'Basic Tees', count: 1 },
  { id: 'graphic', name: 'Graphic Tees', count: 1 },
  { id: 'premium', name: 'Premium', count: 1 },
  { id: 'eco', name: 'Eco-Friendly', count: 1 },
  { id: 'sport', name: 'Sport', count: 1 },
  { id: 'design', name: 'Design', count: 1 },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    priceRange: [0, 200] as [number, number],
    sizes: [] as string[],
    colors: [] as string[],
    onSale: false,
    inStock: true,
  });

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy]);

  const applyFilters = () => {
    let filtered = [...products];

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    filtered = filtered.filter(product => {
      const price = product.salePrice || product.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // Color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => filters.colors.includes(color))
      );
    }

    // On sale filter
    if (filters.onSale) {
      filtered = filtered.filter(product => product.onSale);
    }

    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product =>
        Object.values(product.stock).some(stock => stock > 0)
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        case 'price-high':
          return (b.salePrice || b.price) - (a.salePrice || a.price);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    const searchResults = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    setFilteredProducts(searchResults);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Our T-Shirt Collection</h1>
        <p className="text-muted-foreground">
          Discover our premium collection of t-shirts designed for comfort and style
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <ProductSearch onSearch={handleSearch} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-4">
              {/* Mobile Filters */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <ProductFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    categories={categories}
                  />
                </SheetContent>
              </Sheet>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} products
                </span>
                {filters.category !== 'all' && (
                  <Badge variant="secondary">
                    {categories.find(c => c.id === filters.category)?.name}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border rounded-md px-3 py-1 bg-background"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>

              {/* View Mode */}
              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {loading ? (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <Skeleton className="aspect-square mb-4" />
                    <Skeleton className="h-4 mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <AnimatePresence>
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard 
                      product={product as any} 
                      index={index}
                      viewMode={viewMode}
                    />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button onClick={() => {
                setFilters({
                  category: 'all',
                  priceRange: [0, 200],
                  sizes: [],
                  colors: [],
                  onSale: false,
                  inStock: true,
                });
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}