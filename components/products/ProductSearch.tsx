'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductSearchProps {
  onSearch: (query: string) => void;
}

// Mock suggestions - în producție vor veni din API
const mockSuggestions = [
  { type: 'product', text: 'Classic White Tee', category: 'basic' },
  { type: 'product', text: 'Vintage Graphic Tee', category: 'graphic' },
  { type: 'product', text: 'Premium Polo Tee', category: 'premium' },
  { type: 'category', text: 'Basic Tees', category: 'basic' },
  { type: 'category', text: 'Graphic Tees', category: 'graphic' },
  { type: 'category', text: 'Premium Collection', category: 'premium' },
  { type: 'tag', text: 'cotton', category: 'material' },
  { type: 'tag', text: 'vintage', category: 'style' },
  { type: 'tag', text: 'eco-friendly', category: 'sustainability' },
];

const popularSearches = [
  'white t-shirt',
  'graphic tee',
  'premium cotton',
  'vintage style',
  'eco friendly',
  'sport tee',
];

export function ProductSearch({ onSearch }: ProductSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof mockSuggestions>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'product':
        return '👕';
      case 'category':
        return '📁';
      case 'tag':
        return '🏷️';
      default:
        return '🔍';
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for t-shirts, styles, colors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="pl-10 pr-10 h-12 text-base"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 z-50 mt-2"
          >
            <Card className="shadow-lg border">
              <CardContent className="p-0">
                {query.trim() ? (
                  suggestions.length > 0 ? (
                    <div className="py-2">
                      <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Suggestions
                      </div>
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(suggestion.text)}
                          className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center space-x-3"
                        >
                          <span className="text-lg">{getSuggestionIcon(suggestion.type)}</span>
                          <div className="flex-1">
                            <div className="font-medium">{suggestion.text}</div>
                            <div className="text-xs text-muted-foreground capitalize">
                              {suggestion.type} • {suggestion.category}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {suggestion.type}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No suggestions found for "{query}"</p>
                      <p className="text-xs mt-1">Try searching for products, categories, or styles</p>
                    </div>
                  )
                ) : (
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Popular Searches
                    </div>
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center space-x-3"
                      >
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <span>{search}</span>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}