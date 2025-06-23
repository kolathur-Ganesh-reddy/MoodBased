// src/components/shop/ShopGrid.tsx
import React, { useState } from 'react';
import { ShopItem } from './ShopItem';
import { Mood, ShopItem as ShopItemType } from '@/types';
import { useMoodContext } from '@/contexts/MoodContext';
import { shopItems } from '@/lib/mood-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'name';

export const ShopGrid = () => {
  const { currentMood } = useMoodContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOption>('recommended');

  const categories = [
    'All',
    ...Array.from(new Set(shopItems.map((item) => item.category))),
  ];

  const filteredItems = shopItems
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || !selectedCategory ? true : item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by selected option
      switch (sortOrder) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'recommended':
        default:
          // If current mood exists, prioritize items that match the mood
          if (currentMood) {
            const aMoodMatch = a.moodTags.includes(currentMood);
            const bMoodMatch = b.moodTags.includes(currentMood);
            if (aMoodMatch && !bMoodMatch) return -1;
            if (!aMoodMatch && bMoodMatch) return 1;
          }
          return 0;
      }
    });

  const renderShopItems = (items: ShopItemType[]) => {
    if (items.length === 0) {
      return (
        <div className="col-span-full text-center py-12 text-muted-foreground">
          No items found. Try adjusting your filters.
        </div>
      );
    }

    return items.map((item) => (
      <ShopItem 
        key={item.id} 
        item={item} 
        matchesMood={currentMood ? item.moodTags.includes(currentMood) : false} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="relative flex-1">
          <Label htmlFor="search">Search Items</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name or description..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="w-full md:w-48">
          <Label htmlFor="category">Category</Label>
          <Select 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {categories.filter(c => c !== 'All').map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-48">
          <Label htmlFor="sort">Sort By</Label>
          <Select 
            value={sortOrder} 
            onValueChange={(value) => setSortOrder(value as SortOption)}
          >
            <SelectTrigger id="sort">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {renderShopItems(filteredItems)}
      </div>
    </div>
  );
};