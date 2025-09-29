'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils/currency';
import { X } from 'lucide-react';

interface FilterProps {
  filters: {
    category: string;
    priceRange: [number, number];
    sizes: string[];
    colors: string[];
    onSale: boolean;
    inStock: boolean;
  };
  onFiltersChange: (filters: any) => void;
  categories: Array<{ id: string; name: string; count: number }>;
}

const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const availableColors = [
  { name: 'White', value: 'White', hex: '#FFFFFF' },
  { name: 'Black', value: 'Black', hex: '#000000' },
  { name: 'Gray', value: 'Gray', hex: '#6B7280' },
  { name: 'Navy', value: 'Navy', hex: '#1E3A8A' },
  { name: 'Blue', value: 'Blue', hex: '#3B82F6' },
  { name: 'Red', value: 'Red', hex: '#EF4444' },
  { name: 'Green', value: 'Green', hex: '#10B981' },
  { name: 'Natural', value: 'Natural', hex: '#F5F5DC' },
];

export function ProductFilters({ filters, onFiltersChange, categories }: FilterProps) {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'sizes' | 'colors', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: 'all',
      priceRange: [0, 200] as [number, number],
      sizes: [],
      colors: [],
      onSale: false,
      inStock: true,
    });
  };

  const hasActiveFilters = 
    filters.category !== 'all' ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 200 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.onSale;

  return (
    <div className="space-y-6">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Active Filters</span>
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        </div>
      )}

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={filters.category === category.id}
                  onCheckedChange={() => updateFilter('category', category.id)}
                />
                <Label htmlFor={category.id} className="text-sm cursor-pointer">
                  {category.name}
                </Label>
              </div>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
            max={200}
            min={0}
            step={5}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatCurrency(filters.priceRange[0])}</span>
            <span>{formatCurrency(filters.priceRange[1])}</span>
          </div>
        </CardContent>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {availableSizes.map((size) => (
              <Button
                key={size}
                variant={filters.sizes.includes(size) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleArrayFilter('sizes', size)}
                className="h-8"
              >
                {size}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {availableColors.map((color) => (
              <button
                key={color.value}
                onClick={() => toggleArrayFilter('colors', color.value)}
                className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                  filters.colors.includes(color.value)
                    ? 'border-primary scale-110'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {filters.colors.includes(color.value) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full ${
                      color.value === 'White' ? 'bg-black' : 'bg-white'
                    }`} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Special Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Special Offers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="onSale"
              checked={filters.onSale}
              onCheckedChange={(checked) => updateFilter('onSale', checked)}
            />
            <Label htmlFor="onSale" className="text-sm cursor-pointer">
              On Sale
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={filters.inStock}
              onCheckedChange={(checked) => updateFilter('inStock', checked)}
            />
            <Label htmlFor="inStock" className="text-sm cursor-pointer">
              In Stock Only
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}