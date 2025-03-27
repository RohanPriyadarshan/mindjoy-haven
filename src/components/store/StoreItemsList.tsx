
import React, { useState, useEffect } from 'react';
import { Gift, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { getStoreItems, purchaseItem, getUserPurchases } from '@/lib/supabase';
import { StoreItem } from '@/types/database';

interface StoreItemsListProps {
  userId: string | null;
  userPoints: number;
  onPurchase: () => void;
}

const StoreItemsList = ({ userId, userPoints, onPurchase }: StoreItemsListProps) => {
  const [items, setItems] = useState<StoreItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userPurchasedItemIds, setUserPurchasedItemIds] = useState<string[]>([]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        // Get store items
        const itemsData = await getStoreItems();
        
        if (itemsData && itemsData.length > 0) {
          setItems(itemsData);
        } else {
          // Fallback to hardcoded mock data if the API doesn't return data
          setItems([
            {
              id: '1',
              name: 'Premium Chat Access',
              description: 'Unlock unlimited AI chat sessions with advanced features',
              price: 50,
              category: 'feature',
              image_url: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
            },
            {
              id: '2',
              name: 'Dark Theme',
              description: 'Unlock a beautiful dark theme for the entire application',
              price: 25,
              category: 'theme',
              image_url: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
            },
            {
              id: '3',
              name: 'Mood Insights Pro',
              description: 'Get detailed analytics and insights about your mood patterns',
              price: 75,
              category: 'feature',
              image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
            },
            {
              id: '4',
              name: 'Achievement Badge: Early Adopter',
              description: 'A special badge to show you were among the first users',
              price: 10,
              category: 'badge',
              image_url: 'https://images.unsplash.com/photo-1591196128302-3f0c4e915daa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
            }
          ]);
        }
        
        // Get user's purchases if logged in
        if (userId) {
          try {
            const purchasesData = await getUserPurchases(userId);
            setUserPurchasedItemIds(purchasesData.map(p => p.item_id));
          } catch (error) {
            console.error('Error fetching user purchases:', error);
            setUserPurchasedItemIds([]);
          }
        }
      } catch (error) {
        console.error('Error fetching store data:', error);
        toast.error('Failed to load store items');
        
        // Set fallback items
        setItems([
          {
            id: '1',
            name: 'Premium Chat Access',
            description: 'Unlock unlimited AI chat sessions with advanced features',
            price: 50,
            category: 'feature',
            image_url: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
          },
          {
            id: '2',
            name: 'Dark Theme',
            description: 'Unlock a beautiful dark theme for the entire application',
            price: 25,
            category: 'theme',
            image_url: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchItems();
  }, [userId]);

  const handlePurchase = async (item: StoreItem) => {
    if (!userId) {
      toast.error('Please log in to make purchases');
      return;
    }
    
    if (userPoints < item.price) {
      toast.error('Not enough points for this purchase');
      return;
    }
    
    if (userPurchasedItemIds.includes(item.id)) {
      toast.info('You already own this item');
      return;
    }
    
    setIsPurchasing(true);
    
    try {
      await purchaseItem(userId, item.id, userPoints, item.price);
      
      // Update local state
      setUserPurchasedItemIds(prev => [...prev, item.id]);
      onPurchase();
      
      toast.success(`Successfully purchased ${item.name}!`);
    } catch (error) {
      console.error('Error making purchase:', error);
      toast.error('Failed to complete purchase');
    } finally {
      setIsPurchasing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="h-[300px] bg-secondary/20"></Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => {
        const isOwned = userPurchasedItemIds.includes(item.id);
        const canAfford = userPoints >= item.price;
        
        return (
          <Card key={item.id} className="overflow-hidden border">
            <div 
              className="h-40 bg-cover bg-center" 
              style={{ backgroundImage: `url(${item.image_url})` }}
            ></div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{item.name}</CardTitle>
                <Badge variant={isOwned ? "secondary" : "default"}>
                  {item.price} points
                </Badge>
              </div>
              <Badge variant="outline" className="w-fit">
                {item.category}
              </Badge>
            </CardHeader>
            
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
            
            <CardFooter>
              {isOwned ? (
                <Button variant="secondary" className="w-full" disabled>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Owned
                </Button>
              ) : (
                <Button 
                  variant={canAfford ? "default" : "destructive"} 
                  className="w-full" 
                  onClick={() => handlePurchase(item)}
                  disabled={!canAfford || isPurchasing}
                >
                  {canAfford ? (
                    <>
                      <Gift className="h-4 w-4 mr-2" />
                      Purchase
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Not enough points
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default StoreItemsList;
