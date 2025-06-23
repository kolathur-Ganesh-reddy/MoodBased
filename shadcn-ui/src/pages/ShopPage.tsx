// src/pages/ShopPage.tsx
import React from 'react';
import { Layout } from '@/components/Layout';
import { ShopGrid } from '@/components/shop/ShopGrid';
import { useMoodContext } from '@/contexts/MoodContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const ShopPage = () => {
  const { currentMood } = useMoodContext();
  
  return (
    <Layout>
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold">MoodShop</h1>
          <p className="text-muted-foreground">
            Discover products tailored to enhance your current mood or address specific emotional needs
          </p>
        </div>
        
        {currentMood ? (
          <Alert className="mb-8">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Personalized Recommendations</AlertTitle>
            <AlertDescription>
              Products highlighted with "Perfect for your mood" are specifically recommended for your <span className="font-medium capitalize">{currentMood}</span> mood.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="mb-8">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>No mood selected</AlertTitle>
            <AlertDescription>
              Select a mood from the home page to see personalized product recommendations.
            </AlertDescription>
          </Alert>
        )}
        
        <ShopGrid />
        
        <div className="mt-8 p-4 text-xs text-center text-muted-foreground border-t pt-6">
          <p>
            Note: This is a demonstration shop. No actual products are for sale.
            All prices and product details are fictional.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;