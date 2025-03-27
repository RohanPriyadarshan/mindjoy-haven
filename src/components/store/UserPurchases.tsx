
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { getUserPurchases } from '@/lib/supabase';
import { UserPurchase } from '@/types/database';

interface UserPurchasesProps {
  userId: string | null;
}

const UserPurchases = ({ userId }: UserPurchasesProps) => {
  const [purchases, setPurchases] = useState<UserPurchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!userId) return;
      
      setIsLoading(true);
      try {
        const purchasesData = await getUserPurchases(userId);
        setPurchases(purchasesData);
      } catch (error) {
        console.error('Error fetching purchases:', error);
        toast.error('Failed to load your purchases');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPurchases();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-secondary/20 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="glass dark:glass-dark rounded-xl p-8 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No purchases yet</h3>
        <p className="text-muted-foreground">
          You haven't purchased any items from the store yet.
          Earn points by tracking your mood and maintaining streaks!
        </p>
      </div>
    );
  }

  return (
    <div className="glass dark:glass-dark rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingBag className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Your Items</h3>
      </div>
      
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-3">
          {purchases.map(purchase => (
            <Card key={purchase.id} className="flex overflow-hidden bg-background/40">
              {purchase.item && (
                <div 
                  className="hidden md:block w-24 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${purchase.item.image_url})` }}
                ></div>
              )}
              
              <div className="flex-1">
                <CardHeader className="py-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">{purchase.item?.name || 'Unknown Item'}</CardTitle>
                    <Badge variant="outline">{purchase.item?.category || 'Unknown'}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-3 pt-0">
                  <p className="text-sm text-muted-foreground mb-2">
                    {purchase.item?.description || 'No description available'}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{format(new Date(purchase.purchased_at), 'MMM dd, yyyy')}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{format(new Date(purchase.purchased_at), 'h:mm a')}</span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserPurchases;
