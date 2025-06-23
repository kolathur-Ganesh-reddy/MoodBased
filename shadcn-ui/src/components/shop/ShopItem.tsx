// src/components/shop/ShopItem.tsx
import React from 'react';
import { ShopItem as ShopItemType } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface ShopItemProps {
  item: ShopItemType;
  matchesMood: boolean;
}

export const ShopItem: React.FC<ShopItemProps> = ({ item, matchesMood }) => {
  const handleAddToCart = () => {
    toast.success(`Added ${item.name} to cart`);
  };

  const handleAddToWishlist = () => {
    toast.success(`Added ${item.name} to wishlist`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow flex flex-col">
        <div className="aspect-square relative overflow-hidden bg-muted">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          {matchesMood && (
            <Badge className="absolute top-2 right-2 bg-primary hover:bg-primary">
              Perfect for your mood
            </Badge>
          )}
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{item.name}</CardTitle>
            <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
          </div>
          <Badge variant="outline" className="w-fit capitalize">
            {item.category}
          </Badge>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleAddToWishlist}
          >
            <Heart className="h-4 w-4 mr-1" />
            Wishlist
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};