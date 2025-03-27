
import React, { useState, useEffect } from 'react';
import { Gift, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

interface StoreItemsListProps {
  userId: string | null;
  userPoints: number;
  onPurchase: () => void;
}

const StoreItemsList = ({ userId, userPoints, onPurchase }: StoreItemsListProps) => {
  const [items, setItems] = useState<StoreItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userPurchases, setUserPurchases] = useState<string[]>([]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        // Get store items
        const { data: itemsData, error: itemsError } = await supabase
          .from('store_items')
          .select('*')
          .order('price', { ascending: true });
        
        if (itemsError) throw itemsError;
        setItems(itemsData || []);
        
        // Get user's purchases if logged in
        if (userId) {
          const { data: purchasesData, error: purchasesError } = await supabase
            .from('user_purchases')
            .select('item_id')
            .eq('user_id', userId);
          
          if (purchasesError) throw purchasesError;
          setUserPurchases((purchasesData || []).map(p => p.item_id));
        }
      } catch (error) {
        console.error('Error fetching store data:', error);
        toast.error('Failed to load store items');
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
    
    if (userPurchases.includes(item.id)) {
      toast.info('You already own this item');
      return;
    }
    
    setIsPurchasing(true);
    
    try {
      // 1. Insert purchase record
      const { error: purchaseError } = await supabase
        .from('user_purchases')
        .insert({
          user_id: userId,
          item_id: item.id
        });
      
      if (purchaseError) throw purchaseError;
      
      // 2. Deduct points from user_stats
      const { error: statsError } = await supabase
        .from('user_stats')
        .update({ points: userPoints - item.price })
        .eq('user_id', userId);
      
      if (statsError) throw statsError;
      
      // Update local state
      setUserPurchases(prev => [...prev, item.id]);
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
        const isOwned = userPurchases.includes(item.id);
        const canAfford = userPoints >= item.price;
        
        return (
          <Card key={item.id} className="overflow-hidden glass dark:glass-dark border-none">
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
